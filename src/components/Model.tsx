import { useGLTF } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GradientMaterial } from '../hooks/GradientMaterial';

type ModelProps = {
	url: string;
	scale: number;
};

export function Model({ url, scale }: ModelProps) {
	const { scene } = useGLTF(url);
	const matRef = useRef<THREE.ShaderMaterial>(null);
	const groupRef = useRef<THREE.Group>(null);
	const mouse = useRef({ x: 0, y: 0 });

	const modelDimensions = useMemo(() => {
		const box = new THREE.Box3().setFromObject(scene);
		return { minX: box.min.x, maxX: box.max.x, width: box.max.x - box.min.x };
	}, [scene]);

	if (!matRef.current) {
		matRef.current = new GradientMaterial({ side: THREE.DoubleSide });
	}

	useMemo(() => {
		if (matRef.current) {
			matRef.current.uniforms.modelMinX.value = modelDimensions.minX;
			matRef.current.uniforms.modelWidth.value = modelDimensions.width;
		}
	}, [modelDimensions]);

	useMemo(() => {
		scene.traverse((child: any) => {
			if (child.isMesh) {
				child.material = matRef.current!;
				child.geometry.computeVertexNormals();
			}
		});
	}, [scene]);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	useFrame((state) => {
		if (matRef.current) {
			matRef.current.uniforms.time.value = state.clock.getElapsedTime();
		}
		if (groupRef.current) {
			const targetX = mouse.current.x * 0.5;
			const targetY = -mouse.current.y * 0.5;
			groupRef.current.rotation.y = THREE.MathUtils.lerp(
				groupRef.current.rotation.y,
				targetX,
				0.05,
			);
			groupRef.current.rotation.x = THREE.MathUtils.lerp(
				groupRef.current.rotation.x,
				targetY,
				0.05,
			);
		}
	});

	// Opacidade ao scroll
	const [scrollY, setScrollY] = useState(0);
	useEffect(() => {
		const onScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const progress = Math.min(scrollY / window.innerHeight / 2, 1);
	const adjustedScale = scale * (1 - progress * 0.5);
	const opacity = 1 - progress;

	return (
		<group ref={groupRef} scale={adjustedScale}>
			<primitive object={scene} />
			<meshStandardMaterial transparent opacity={opacity} />
		</group>
	);
}

useGLTF.preload('/images/Logo3D.glb');
