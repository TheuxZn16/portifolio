import { useEffect, useRef, createContext } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Technologies from './components/Technologies';
import TechIntroduction from './components/TechIntroduction';
import ProjectsStream from './components/ProjectsStream';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';

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
				smoothTouch: 0.2,
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
		<div>
			<ToastContainer
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				style={{
					zIndex: 999,
				}}
			/>
			<SmootherContext.Provider value={smootherRef}>
				<div id="smooth-wrapper" className="relative w-full bg-[#0a0a0a]">
					<Header />
					<div id="smooth-content" className="w-full">
						<Hero />
						<About />
						<TechIntroduction />
						<Technologies />
						<ProjectsStream />
						<ContactForm />
						<Footer />
					</div>
				</div>
			</SmootherContext.Provider>
		</div>
	);
}
