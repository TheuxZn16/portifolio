import { useEffect, useRef, useId, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function About() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardsContainerRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLDivElement>(null);
	const uniqueId = useId();

	const texts = useMemo(
		() => [
			{
				id: 'sobre-mim',
				title: 'Sobre mim',
				content:
					'Sou um desenvolvedor apaixonado por transformar ideias em experiências digitais imersivas e cheias de energia futurista.',
			},
			{
				id: 'minha-missao',
				title: 'Minha missão',
				content:
					'Busco unir design, animação e tecnologia para criar interfaces que causem impacto e emoção em quem interage com elas.',
			},
			{
				id: 'tecnologias',
				title: 'Tecnologias',
				content:
					'Trabalho com React, TypeScript, GSAP e Three.js, criando experiências fluidas e dinâmicas com foco em performance e estética.',
			},
			{
				id: 'filosofia',
				title: 'Filosofia',
				content:
					'Acredito que código é arte — cada projeto é uma forma de expressão, um universo digital em constante evolução.',
			},
		],
		[],
	);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top top',
					end: `+=${window.innerHeight * texts.length}`,
					pin: true,
					scrub: true,
					markers: false,
					anticipatePin: 1,
				},
			});

			const cards = gsap.utils.toArray<HTMLDivElement>('.about-card');

			cards.forEach((card, i) => {
				gsap.set(card, {
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					opacity: 0,
					scale: 0.95,
					rotateY: -15,
				});

				tl.to(card, {
					opacity: 1,
					scale: 1,
					rotateY: 0,
					duration: 0.6,
					ease: 'power3.out',
					onStart: () => {
						const titleAnimated = card.querySelector('.card-title-animated');
						const contentAnimated = card.querySelector(
							'.card-content-animated',
						);
						if (titleAnimated && contentAnimated) {
							gsap.to(titleAnimated, {
								text: texts[i].title,
								duration: 0.5,
								ease: 'none',
							});
							gsap.to(contentAnimated, {
								text: texts[i].content,
								duration: 2,
								ease: 'none',
							});
						}
					},
				}).to(
					card,
					{
						opacity: 0,
						scale: 0.95,
						rotateY: 15,
						duration: 0.6,
						ease: 'power3.inOut',
					},
					'+=1.8',
				);
			});
		}, sectionRef);

		return () => ctx.revert();
	}, [texts]);

	return (
		<section
			ref={sectionRef}
			id={uniqueId}
			className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#050013] via-[#090021] to-[#050013] text-white"
		>
			<div className="relative z-10 w-full h-full flex md:flex-row flex-col justify-center items-center gap-6 md:gap-14">
				{/* FOTO */}
				<div
					ref={imgRef}
					className="relative flex-shrink-0 w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden shadow-[0_0_40px_#7e3ff2] border-4 border-[#00ffff] bg-[#080016]"
				>
					<img
						src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&w=500"
						alt="Foto do desenvolvedor"
						className="object-cover w-full h-full"
					/>
					<div className="absolute inset-0 bg-gradient-to-tr from-[#7e3ff2]/40 to-transparent" />
				</div>

				{/* CARDS */}
				<div ref={cardsContainerRef} className="relative w-3/5 h-96">
					{texts.map((item) => (
						<div
							key={item.id}
							className="about-card bg-gradient-to-br from-[#12002c] flex flex-col justify-center to-[#1a0040] rounded-2xl shadow-[0_0_40px_#7e3ff2] border border-[#00ffff]/30 p-8 md:p-10 "
						>
							<h2 className="card-title text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#7e3ff2] to-[#00ffff] drop-shadow-[0_0_15px_#00ffff] min-h-[3rem]">
								<span className="sr-only">{item.title}</span>
								<span
									className="card-title-animated"
									aria-hidden="true"
									style={{ minHeight: '3rem' }}
								/>
							</h2>
							<p className="card-content text-lg md:text-xl text-[#d1d0e5] leading-relaxed">
								<span className="sr-only">{item.content}</span>
								<span className="card-content-animated" aria-hidden="true" />
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
