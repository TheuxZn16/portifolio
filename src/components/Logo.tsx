import { useEffect, useState } from 'react';
import { Scene } from './Scene';
import { LoadingScreen } from './LoadingScreen';

type LogoProps = {
	url?: string;
};

export default function Logo({ url = '/images/Logo3D.glb' }: LogoProps) {
	const [hide, setHide] = useState(false);
	const [scale, setScale] = useState(1);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			const progress = window.scrollY / window.innerHeight;
			setHide(progress > 2);
		};
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		const onResize = () => {
			const width = window.innerWidth;
			if (width < 640) setScale(0.5);
			else if (width < 1024) setScale(0.75);
			else setScale(1);
		};
		onResize();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	if (hide) return null;

	return (
		<>
			<LoadingScreen isLoaded={loaded} />

			<Scene url={url} scale={scale} onLoaded={() => setLoaded(true)} />
		</>
	);
}
