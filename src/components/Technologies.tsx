import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Technologies() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const techs = useMemo(
		() => [
			{
				id: 'typescript',
				name: 'TypeScript',
				description:
					'Linguagem que adiciona tipagem estática ao JavaScript, trazendo segurança e produtividade no desenvolvimento de aplicações complexas.',
				icon: '/icons/typescript.svg',
				link: 'https://www.typescriptlang.org/',
			},
			{
				id: 'react',
				name: 'React',
				description:
					'Biblioteca JavaScript focada em construir interfaces modernas, reativas e componentizadas com performance e escalabilidade.',
				icon: '/icons/react.svg',
				link: 'https://reactjs.org/',
			},
			{
				id: 'html',
				name: 'HTML5',
				description:
					'Estrutura essencial de qualquer página web — a base sobre a qual construo interfaces organizadas e acessíveis.',
				icon: '/icons/html.svg',
				link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
			},
			{
				id: 'css',
				name: 'CSS3',
				description:
					'Tecnologia que dá vida ao visual das páginas, permitindo criar experiências fluidas, responsivas e com personalidade.',
				icon: '/icons/css.svg',
				link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
			},
			{
				id: 'aws',
				name: 'AWS',
				description:
					'Plataforma de computação em nuvem que utilizo para hospedar, escalar e automatizar aplicações com segurança e eficiência.',
				icon: '/icons/aws.svg',
				link: 'https://aws.amazon.com/',
			},
		],
		[],
	);

	useEffect(() => {
		if (!sectionRef.current) return;

		setActiveIndex(0);

		const ctx = gsap.context(() => {
			const trigger = ScrollTrigger.create({
				trigger: sectionRef.current,
				start: 'top top',
				end: `+=${techs.length * 100}%`,
				scrub: true,
				pin: true,
				onUpdate: (self) => {
					const index = Math.max(
						0,
						Math.min(
							techs.length - 1,
							Math.round(self.progress * (techs.length - 1)),
						),
					);
					setActiveIndex(index);
				},
				onEnter: () => setActiveIndex(0),
				onEnterBack: () => setActiveIndex(0),
				onLeaveBack: () => setActiveIndex(0),
			});

			return () => trigger.kill();
		}, sectionRef);

		return () => ctx.revert();
	}, [techs.length]);

	return (
		<section
			id="technologies"
			ref={sectionRef}
			className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0014] to-[#1a0026]"
		>
			<div className="absolute inset-0 -z-10">
				<div className="absolute w-[700px] h-[700px] bg-purple-600/20 blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse" />
			</div>

			<motion.div
				key={techs[activeIndex].id}
				layout
				initial={{ opacity: 0, y: 60, scale: 0.9 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: -60, scale: 0.9 }}
				transition={{ duration: 0.8, ease: 'easeInOut', type: 'tween' }}
				className="w-[90%] max-w-[600px] bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] p-8 flex flex-col items-center text-center"
			>
				<img
					src={techs[activeIndex].icon}
					alt={techs[activeIndex].name}
					className="w-20 h-20 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
				/>
				<h2 className="text-3xl md:text-4xl font-orbitron font-bold text-purple-400 mb-4">
					{techs[activeIndex].name}
				</h2>
				<p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
					<TypeAnimation
						key={techs[activeIndex].id}
						sequence={[techs[activeIndex].description, 1500]}
						speed={80}
						wrapper="span"
						cursor={false}
					/>
				</p>
				<a
					href={techs[activeIndex].link}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
				>
					Saiba Mais
				</a>
			</motion.div>

			<div className="absolute bottom-24 flex gap-3">
				{techs.map((_, i) => (
					<div
						key={i}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							i === activeIndex ? 'bg-purple-400 scale-125' : 'bg-gray-600'
						}`}
					></div>
				))}
			</div>
		</section>
	);
}
