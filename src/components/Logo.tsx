import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
	OrbitControls,
	Environment,
	useGLTF,
	Html,
	ContactShadows,
	Loader,
	Center,
} from '@react-three/drei';

function Model({ url, ...props }: { url: string; props?: any }) {
	// Drei's GLTF hook: caches & parses the model efficiently
	const { scene } = useGLTF(url);
	return <primitive object={scene} {...props} />;
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

				<Suspense>
					<Center>
						<Model url={url} props={{ scale: 0.0001 }} />
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
