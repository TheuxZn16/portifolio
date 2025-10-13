import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';
import Logo from '/images/Logo2.svg';

export default function Hero() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setIsVisible(true), 300);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-black via-[#0a0014] to-[#1a0026]">
			<div className="absolute inset-0 -z-10">
				<div className="absolute w-[700px] h-[700px] bg-purple-600/20 blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse" />
			</div>

			<motion.img
				src={Logo}
				alt="Logo"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 1.2, ease: 'easeOut' }}
				className="w-80 sm:w-80 md:w-96 mb-6 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
			/>

			<motion.h1
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
				className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
			>
				Bem-vindo ao{' '}
				<span className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
					Futuro
				</span>
			</motion.h1>

			{isVisible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 1 }}
					className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-4"
				>
					<TypeAnimation
						sequence={[
							'Tecnologia que transforma ideias em realidade.',
							2000,
							'Design, inovação e performance em um só lugar.',
							2000,
							'Explore. Conecte-se. Evolua conosco.',
							2000,
						]}
						wrapper="span"
						cursor={true}
						repeat={Infinity}
						speed={50}
					/>
				</motion.div>
			)}

			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, delay: 1.5 }}
				className="mt-10 px-8 py-3 bg-purple-600 text-white font-semibold rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:bg-purple-700 transition-all duration-300"
			>
				Vamos lá!
			</motion.button>
		</section>
	);
}
