import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import {
	Environment,
	ContactShadows,
	Center,
	OrbitControls,
	Loader,
} from '@react-three/drei';
import { Model } from './Model';

type SceneProps = {
	url: string;
	scale: number;
};

export function Scene({ url, scale }: SceneProps) {
	return (
		<div className="w-full h-screen fixed top-0 left-0 pointer-events-none">
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
						<Model url={url} scale={scale} />
					</Center>
					<Environment preset="city" />
					<ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
				</Suspense>

				<OrbitControls
					makeDefault
					enableDamping
					enableZoom={false}
					enableRotate={false}
					dampingFactor={0.1}
				/>
			</Canvas>
			<Loader />
		</div>
	);
}
