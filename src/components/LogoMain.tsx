import { useEffect, useState } from 'react';

type LogoScrollProps = {
	url?: string;
};

export default function LogoScroll({
	url = '/images/Logo2.svg',
}: LogoScrollProps) {
	const [scroll, setScroll] = useState<number>(0);
	const [activeClassSection, setActiveClassSection] = useState<string>('fixed');
	const [activeClassDiv, setActiveClassDiv] = useState<string>('');
	const [widthImage, setWidthImage] = useState<number>(75);
	const [opacityImage, setOpacityImage] = useState<number>(1); // opacidade entre 0 e 1

	useEffect(() => {
		const handleScroll = () => {
			setScroll(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const maxScroll = window.innerHeight;
		const minWidth = 40;
		const maxWidth = 75;
		const minOpacity = 0.1; // equivalente a 10%
		const maxOpacity = 1; // equivalente a 100%

		if (scroll < maxScroll) {
			setActiveClassSection('fixed');
			setActiveClassDiv('');

			const scrollRatio = scroll / maxScroll;

			const newWidth = maxWidth - (maxWidth - minWidth) * scrollRatio;
			const newOpacity = maxOpacity - (maxOpacity - minOpacity) * scrollRatio;

			setWidthImage(newWidth);
			setOpacityImage(newOpacity);
		} else {
			setActiveClassSection('');
			setActiveClassDiv('hidden');
			setWidthImage(minWidth);
			setOpacityImage(minOpacity);
		}
	}, [scroll]);

	return (
		<>
			<section
				className={`h-screen flex justify-center items-center w-full top-0 left-0 ${activeClassSection}`}
			>
				<img
					src={url}
					alt="Logo"
					style={{ width: `${widthImage}%`, opacity: opacityImage }}
					className="transition-all duration-100"
				/>
			</section>
			<div className={`${activeClassDiv} h-[200vh]`}></div>
		</>
	);
}
