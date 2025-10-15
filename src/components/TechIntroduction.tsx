import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useEffect, useRef } from 'react';
import { FaArrowDown } from 'react-icons/fa';

function TechIntroduction() {
	const h1Ref = useRef<HTMLHeadingElement>(null);
	const h2Ref = useRef<HTMLHeadingElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const hasAnimatedRef = useRef(false);

	useEffect(() => {
		gsap.registerPlugin(TextPlugin);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimatedRef.current) {
						hasAnimatedRef.current = true;

						if (h2Ref.current && arrowRef.current) {
							gsap.fromTo(
								arrowRef.current,
								{ y: 0 },
								{
									y: 40,
									duration: 0.5,
									ease: 'power1.inOut',
									repeat: -1,
									yoyo: true,
									overwrite: 'auto',
								},
							);

							const tl = gsap.timeline();

							tl.from(h2Ref.current, {
								text: '',
								duration: (h2Ref.current.textContent?.length || 0) * 0.03,
								ease: 'none',
							});

							tl.then(() => {
								if (h1Ref.current) {
									gsap.to(h1Ref.current, {
										filter: 'drop-shadow(0 0 10px #a067ef)',
										duration: 1.5,
										ease: 'power3.inOut',
										repeat: -1,
										yoyo: true,
									});
								}
							});

							observer.unobserve(entry.target);
						}
					}
				});
			},
			{ threshold: 0.5 },
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			className="flex justify-center items-center h-[130vh] overflow-visible"
		>
			<div className="bg-[#5c299b] absolute -z-10 h-80 w-[90%] md:w-[70%] blur-[150px] opacity-90 animate-pulse"></div>
			<div className="drop-shadow-[0_0_30px_#a067ef]">
				<h1
					ref={h1Ref}
					className="md:text-8xl text-5xl text-center mb-10 md:mb-16 font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-[#7e3ff2] to-[#00ffff] drop-shadow-[0_0_30px_#a067ef] leading-loose"
				>
					Tecnologias
				</h1>
				<h2
					ref={h2Ref}
					className="text-white md:text-3xl text-xl text-center mb-10 drop-shadow-[0_0_5px_#a067ef]"
				>
					Abaixo estará listado algumas das ferramentas e linguagens que utilizo
					em meus projetos.
				</h2>
				<div className="flex justify-center mt-24 relative">
					<div
						ref={arrowRef}
						className="w-10 h-10 rounded-full bg-transparent border-2 border-[#6a6767] flex items-center justify-center shadow-md"
					>
						<FaArrowDown className="text-[#6a6767]" />
					</div>
				</div>
			</div>
		</section>
	);
}

export default TechIntroduction;
