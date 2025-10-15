import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useEffect, useRef } from 'react';

function TechIntroduction() {
	const h1Ref = useRef<HTMLHeadingElement>(null);
	const h2Ref = useRef<HTMLHeadingElement>(null);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		gsap.registerPlugin(TextPlugin);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && h1Ref.current && h2Ref.current) {
						const tl = gsap.timeline();

						tl.from(h2Ref.current, {
							text: '',
							duration: (h2Ref.current.textContent?.length || 0) * 0.03,
							ease: 'none',
						});

						tl.then(() => {
							gsap.to(h1Ref.current, {
								filter: 'drop-shadow(0 0 10px #a067ef)',
								duration: 1.5,
								ease: 'power3.inOut',
								repeat: -1,
								yoyo: true,
							});
						});

						observer.unobserve(entry.target);
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
			className="flex justify-center items-center h-[130vh]"
		>
			<div className="p-10">
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
			</div>
		</section>
	);
}

export default TechIntroduction;
