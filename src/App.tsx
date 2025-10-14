import { useEffect, useRef, createContext } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

export const SmootherContext = createContext<any>(null);

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
	const smootherRef = useRef<any>(null);

	useEffect(() => {
		if (!smootherRef.current) {
			smootherRef.current = ScrollSmoother.create({
				wrapper: '#smooth-wrapper',
				content: '#smooth-content',
				smooth: 1.2,
				smoothTouch: 0.1,
				normalizeScroll: true,
				effects: true,
			});
		}

		ScrollTrigger.refresh();

		return () => {
			smootherRef.current?.kill();
			smootherRef.current = null;
		};
	}, []);

	return (
		<SmootherContext.Provider value={smootherRef}>
			<div id="smooth-wrapper" className="relative w-full bg-[#0a0a0a]">
				<Header />
				<div id="smooth-content" className="w-full">
					<Hero />
					<About />
					<div className="h-screen bg-[#12002c]" />
					<div className="h-screen bg-[#0a0014]" />
				</div>
			</div>
		</SmootherContext.Provider>
	);
}
