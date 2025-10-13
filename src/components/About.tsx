import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function About() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardsContainerRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLDivElement>(null);

	const texts = useMemo(
		() => [
			{
				id: 'sobre-mim',
				title: 'Sobre Mim',
				content:
					'Olá, me chamo Matheus e sou apaixonado por programação e tecnologia. Minha jornada começou há dois anos, quando participei da equipe de robótica da minha antiga escola. Lá, descobri o quanto eu amava estar por trás da lógica dos robôs — programar, testar e ver a criação ganhar vida. Desde então, venho estudando e me aperfeiçoando continuamente, transformando curiosidade em propósito.',
			},
			{
				id: 'minha-trajetoria',
				title: 'Minha Trajetória',
				content:
					'Após aquela experiência marcante, investi em cursos, projetos pessoais e estudos constantes. Hoje curso Engenharia de Software na Universidade de Brasília (UnB), onde estou no segundo semestre, focado em construir uma base sólida para criar soluções que unem desempenho e inovação.',
			},
			{
				id: 'habilidades-tecnologias',
				title: 'Habilidades e Tecnologias',
				content:
					'Ao longo dessa jornada, desenvolvi proficiência em TypeScript, React, Node.js, PostgreSQL, HTML, CSS, AWS e Docker. Atualmente, estou me aventurando pelo universo do Java, explorando novas possibilidades de backend e arquitetura de sistemas. Busco sempre unir tecnologia e criatividade para entregar experiências que causem impacto real.',
			},
			{
				id: 'valores-proposito',
				title: 'Valores e Propósito',
				content:
					'Sou movido por comprometimento, atenção aos detalhes e a paixão por surpreender através do que crio. Cada linha de código é uma oportunidade de inspirar, facilitar e transformar realidades — e é por isso que coloco alma em cada projeto.',
			},
			{
				id: 'missao',
				title: 'Missão',
				content:
					'Vivemos em uma era em que a presença digital é vital. Como disse Bill Gates: “Se o seu negócio não estiver na internet, seu negócio irá ficar sem negócio.” Meu propósito é ajudar pessoas e empresas a construírem experiências digitais únicas, que não apenas existam na web, mas conectem, encantem e gerem resultados reais.',
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
								duration: 0.3,
								ease: 'none',
							});
							gsap.to(contentAnimated, {
								text: texts[i].content,
								duration: 1.2,
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
			id="about-me"
			className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#050013] via-[#090021] to-[#050013] text-white"
		>
			<div className="relative z-10 w-full h-full flex lg:flex-row flex-col justify-center items-center gap-6 md:gap-14">
				<div
					ref={imgRef}
					className="relative flex-shrink-0 w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden shadow-[0_0_40px_#7e3ff2] border-4 border-[#00ffff] bg-[#080016]"
				>
					<img
						src="/images/FotoMatheus.jpeg"
						alt="Foto do desenvolvedor"
						className="object-cover w-full h-full"
					/>
					<div className="absolute inset-0 bg-gradient-to-tr from-[#7e3ff2]/40 to-transparent" />
				</div>

				<div
					ref={cardsContainerRef}
					className="relative w-11/12 md:w-3/5 h-3/5 md:h-1/2"
				>
					{texts.map((item) => (
						<div
							key={item.id}
							className="about-card bg-gradient-to-br from-[#12002c] flex flex-col justify-center to-[#1a0040] rounded-2xl shadow-[0_0_40px_#7e3ff2] border border-[#00ffff]/30 p-6 md:p-10 overflow-hidden"
						>
							<h2 className="card-title text-2xl md:text-5xl font-bold mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7e3ff2] to-[#00ffff] drop-shadow-[0_0_15px_#00ffff]">
								<span className="sr-only">{item.title}</span>
								<span
									className="card-title-animated"
									aria-hidden="true"
									style={{ minHeight: '4rem', lineHeight: 1.2 }}
								/>
							</h2>
							<p className="card-content text-sm md:text-xl text-[#d1d0e5] leading-relaxed overflow-hidden">
								<span className="sr-only">{item.content}</span>
								<span
									className="card-content-animated block max-h-full"
									aria-hidden="true"
								/>
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
