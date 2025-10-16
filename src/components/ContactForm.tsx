import { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		if (!sectionRef.current) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				titleRef.current,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 1.2,
					delay: 0.4,
					ease: 'power3.out',
				},
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="contact"
			className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0014] to-[#1a0026] flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
		>
			<div className="absolute inset-0 -z-10">
				<div className="absolute w-[900px] h-[900px] bg-purple-600/20 blur-[180px] top-1/3 left-1/2 -translate-x-1/2 animate-pulse rounded-full" />
				<div className="absolute w-[500px] h-[500px] bg-purple-400/10 blur-[120px] bottom-0 right-0 animate-[pulse_6s_infinite]" />
			</div>

			<h2
				ref={titleRef}
				className="text-2xl md:text-6xl font-orbitron font-bold text-purple-400 mb-8 text-center tracking-widest"
			>
				<TypeAnimation
					sequence={[' VAMOS CONSTRUIR ALGO EXTRAORDINÁRIO ', 2000]}
					speed={60}
					cursor={false}
				/>
			</h2>

			<motion.p
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="text-gray-300 text-lg md:text-2xl text-center max-w-2xl mb-16 leading-relaxed"
			>
				Tem uma ideia ou quer transformar seu projeto em realidade? Me envie uma
				mensagem e vamos criar algo único.
			</motion.p>

			<motion.form
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				onSubmit={(e) => e.preventDefault()}
				className="w-full max-w-2xl bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] p-8 flex flex-col gap-6"
			>
				<FormField label="Seu Nome">
					<input
						type="text"
						name="name"
						required
						placeholder="Digite seu nome completo"
						className="w-full bg-transparent border border-purple-400/30 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
					/>
				</FormField>

				<FormField label="E-mail">
					<input
						type="email"
						name="email"
						required
						placeholder="exemplo@email.com"
						className="w-full bg-transparent border border-purple-400/30 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
					/>
				</FormField>

				<FormField label="Assunto do Projeto">
					<input
						type="text"
						name="subject"
						placeholder="Ex: Criação de site futurista, app interativo..."
						className="w-full bg-transparent border border-purple-400/30 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
					/>
				</FormField>

				<FormField label="Mensagem">
					<textarea
						name="message"
						rows={5}
						required
						placeholder="Descreva sua ideia, projeto ou dúvida..."
						className="w-full bg-transparent border border-purple-400/30 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition resize-none"
					/>
				</FormField>

				<motion.button
					whileHover={{
						scale: 1.05,
						boxShadow: '0 0 25px rgba(168,85,247,0.6)',
					}}
					whileTap={{ scale: 0.98 }}
					type="submit"
					className="self-center mt-4 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-purple-300 hover:text-white font-bold px-8 py-3 rounded-full transition-all"
				>
					ENVIAR TRANSMISSÃO 🚀
				</motion.button>
			</motion.form>
		</section>
	);
}

function FormField({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<label className="flex flex-col gap-2 text-gray-300 text-sm font-mono tracking-widest">
			<span className="text-purple-400">{label}</span>
			{children}
		</label>
	);
}
