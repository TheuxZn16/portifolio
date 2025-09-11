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

		if (scroll < maxScroll) {
			setActiveClassSection('fixed');
			setActiveClassDiv('');

			const scrollRatio = scroll / maxScroll;

			const newWidth = maxWidth - (maxWidth - minWidth) * scrollRatio;

			setWidthImage(newWidth);
		} else {
			setActiveClassSection('');
			setActiveClassDiv('hidden');
			setWidthImage(minWidth);
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
					style={{ width: `${widthImage}%` }}
					className="transition-all duration-100"
				/>
			</section>
			<div className={`${activeClassDiv} h-[200vh]`}></div>
		</>
	);
}
