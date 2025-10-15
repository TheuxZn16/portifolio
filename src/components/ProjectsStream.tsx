import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsStream() {
	const containerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				titleRef.current,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 1.2,
					delay: 0.5,
					ease: 'power3.out',
				},
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	const projects = [
		{
			title: 'Neon Dashboard',
			description:
				'Interface futurista para visualização de dados em tempo real. Desenvolvido com React, TypeScript e GSAP.',
			techs: ['React', 'TypeScript', 'GSAP', 'Tailwind'],
			github: 'https://github.com/exemplo/neon-dashboard',
		},
		{
			title: 'Aether AI',
			description:
				'Assistente de IA com interface conversacional e resposta de voz. Um projeto que une design, voz e machine learning.',
			techs: ['Node.js', 'React', 'OpenAI API', 'Express'],
			github: 'https://github.com/exemplo/aether-ai',
		},
		{
			title: 'Quantum Lab',
			description:
				'Simulação 3D interativa feita com Three.js e React Three Fiber, explorando física e shaders em tempo real.',
			techs: ['Three.js', 'React Three Fiber', 'TypeScript'],
			github: 'https://github.com/exemplo/quantum-lab',
		},
		{
			title: 'Nova Sheet',
			description:
				'Aplicação web integrada ao Google Sheets para controle automatizado de dados e cálculos instantâneos.',
			techs: ['React', 'Google API', 'Node.js', 'PostgreSQL'],
			github: 'https://github.com/exemplo/nova-sheet',
		},
	];

	useEffect(() => {
		if (!containerRef.current) return;
		const sections = gsap.utils.toArray<HTMLDivElement>('.project-block');

		sections.forEach((section) => {
			gsap.fromTo(
				section,
				{ opacity: 0, y: 100 },
				{
					opacity: 1,
					y: 0,
					scrollTrigger: {
						trigger: section,
						start: 'top 80%',
						end: 'top 30%',
						scrub: true,
					},
					duration: 1.2,
					ease: 'power2.out',
				},
			);
		});
	}, []);

	return (
		<section
			ref={containerRef}
			id="projects"
			className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0014] to-[#1a0026] overflow-hidden px-6 py-32 flex flex-col items-center justify-center"
		>
			{/* Fundo animado */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute w-[900px] h-[900px] bg-purple-600/20 blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full" />
				<div className="absolute w-[500px] h-[500px] bg-purple-400/10 blur-[100px] bottom-0 right-0 animate-[pulse_5s_infinite]" />
			</div>

			{/* Título principal */}
			<h2
				ref={titleRef}
				className="text-4xl md:text-6xl font-orbitron font-bold text-purple-400 mb-24 text-center tracking-widest"
			>
				<TypeAnimation
					sequence={['// PROJETOS ATIVOS //', 2000]}
					speed={60}
					cursor={false}
				/>
			</h2>

			{/* Timeline futurista */}
			<div className="relative w-full max-w-3xl flex flex-col gap-32">
				{projects.map((project, i) => (
					<AnimatePresence key={i}>
						<motion.div
							className="project-block relative w-full flex flex-col items-start border-l-2 border-purple-500/40 pl-8"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.6 }}
							transition={{ duration: 1 }}
						>
							{/* Nó da linha */}
							<div className="absolute -left-[9px] top-2 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]" />

							{/* Título animado */}
							<motion.h3
								className="text-2xl md:text-3xl font-bold font-orbitron text-purple-300 mb-3"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
							>
								<TypeAnimation
									sequence={[project.title, 1500]}
									speed={45}
									cursor={false}
								/>
							</motion.h3>

							{/* Descrição */}
							<motion.p
								className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed mb-4"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
							>
								{project.description}
							</motion.p>

							{/* Tecnologias */}
							<motion.div
								className="flex flex-wrap gap-2 mb-6"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 0.8 }}
							>
								{project.techs.map((tech, t) => (
									<span
										key={t}
										className="text-xs md:text-sm font-mono bg-purple-500/10 border border-purple-400/30 text-purple-300 px-3 py-1 rounded-full hover:bg-purple-500/20 transition"
									>
										{tech}
									</span>
								))}
							</motion.div>

							{/* Botão GitHub */}
							<motion.a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 1 }}
								className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-400/40 text-purple-300 hover:text-white font-bold py-2 px-5 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all"
							>
								<FaGithub className="text-lg" />
								Ver no GitHub
							</motion.a>
						</motion.div>
					</AnimatePresence>
				))}
			</div>
		</section>
	);
}
