import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import {
	OrbitControls,
	Environment,
	useGLTF,
	ContactShadows,
	Loader,
	Center,
	shaderMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

// === MATERIAL CUSTOMIZADO ===
const GradientMaterial = shaderMaterial(
	{
		time: 0,
		modelMinX: 0,
		modelWidth: 1,
	},
	// Vertex Shader
	`
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	// Fragment Shader
	`
    uniform float time;
    uniform float modelMinX;
    uniform float modelWidth;
    varying vec3 vWorldPosition;

    void main() {
      // Calcula a posição horizontal normalizada baseada na posição mundial
      float worldX = vWorldPosition.x;
      float normalizedX = (worldX - modelMinX) / modelWidth;
      
      // Adiciona deslocamento contínuo (animação da esquerda para direita)
      float shift = fract(normalizedX - time * 0.5);

      vec3 color1 = vec3(0.82, 0.21, 1.0); // #d036ff
      vec3 color2 = vec3(0.25, 0.41, 1.0); // #3f69ff
      vec3 color3 = vec3(0.0, 1.0, 1.0);   // #00ffff

      vec3 finalColor;
      if (shift < 0.33) {
        finalColor = mix(color1, color2, shift * 3.0);
      } else if (shift < 0.66) {
        finalColor = mix(color2, color3, (shift - 0.33) * 3.0);
      } else {
        finalColor = mix(color3, color1, (shift - 0.66) * 3.0);
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
);

extend({ GradientMaterial });

function Model({ url }: { url: string }) {
	const { scene } = useGLTF(url);
	const matRef = useRef<THREE.ShaderMaterial>(null);

	// Calcular as dimensões do modelo no mundo
	const modelDimensions = useMemo(() => {
		const box = new THREE.Box3().setFromObject(scene);
		const minX = box.min.x;
		const maxX = box.max.x;
		const width = maxX - minX;
		return { minX, maxX, width };
	}, [scene]);

	// Criar material uma única vez
	if (!matRef.current) {
		const material = new GradientMaterial({
			side: THREE.DoubleSide,
		});
		matRef.current = material;
	}

	// Atualizar uniforms do material quando dimensões mudam
	useMemo(() => {
		if (matRef.current) {
			matRef.current.uniforms.modelMinX.value = modelDimensions.minX;
			matRef.current.uniforms.modelWidth.value = modelDimensions.width;
		}
	}, [modelDimensions]);

	// Aplica o material em todos os meshes
	useMemo(() => {
		scene.traverse((child: any) => {
			if (child.isMesh) {
				child.material = matRef.current!;
				child.geometry.computeVertexNormals();
			}
		});
	}, [scene]);

	// Atualiza o tempo do material em cada frame
	useFrame((state) => {
		if (matRef.current) {
			matRef.current.uniforms.time.value = state.clock.getElapsedTime();
		}
	});

	return <primitive object={scene} scale={1} />;
}

export default function GLBViewer({ url = '/images/Logo3D.glb' }) {
	return (
		<div className="w-full h-screen">
			<Canvas shadows camera={{ position: [0, 0, 8], fov: 80 }}>
				<hemisphereLight intensity={0.25} groundColor={'#222'} />
				<directionalLight
					position={[5, 5, 5]}
					intensity={1.2}
					castShadow
					shadow-mapSize-width={2048}
					shadow-mapSize-height={2048}
				/>

				<Suspense fallback={null}>
					<Center>
						<Model url={url} />
					</Center>
					<Environment preset="city" />
					<ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
				</Suspense>

				<OrbitControls makeDefault enableDamping dampingFactor={0.1} />
			</Canvas>
			<Loader />
		</div>
	);
}

useGLTF.preload('/images/Logo3D.glb');
