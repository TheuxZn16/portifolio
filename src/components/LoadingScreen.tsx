import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

type LoadingScreenProps = {
	isLoaded: boolean;
};

export function LoadingScreen({ isLoaded }: LoadingScreenProps) {
	const { progress } = useProgress();
	const [show, setShow] = useState(true);
	const [startOpenAnimation, setStartOpenAnimation] = useState(false);

	useEffect(() => {
		if (isLoaded) {
			const timeout = setTimeout(() => setStartOpenAnimation(true), 300);

			const timeoutHide = setTimeout(() => setShow(false), 1500);
			return () => {
				clearTimeout(timeout);
				clearTimeout(timeoutHide);
			};
		}
	}, [isLoaded]);

	const openVariants = {
		closed: {
			clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
			transition: { duration: 0 },
		},
		open: {
			clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
			transition: {
				duration: 1.2,
				ease: cubicBezier(0.77, 0, 0.175, 1),
			},
		},
	};

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className="fixed inset-0 z-50 bg-[#252424] flex flex-col items-center justify-center"
					initial="closed"
					animate={startOpenAnimation ? 'open' : 'closed'}
					variants={openVariants}
					style={{ transformOrigin: 'top right' }}
					exit={{ opacity: 0, transition: { duration: 0.3 } }}
				>
					{!startOpenAnimation && (
						<>
							<div className="w-2/3 max-w-md h-3 rounded-full bg-gray-800 overflow-hidden mb-6">
								<motion.div
									className="h-full rounded-full"
									style={{
										background:
											'linear-gradient(90deg, #8200ff, #2566ff, #00ffff)',
										backgroundSize: '200% 100%',
									}}
									animate={{
										width: `${progress}%`,
										backgroundPosition: ['0% 50%', '100% 50%'],
									}}
									transition={{
										width: { duration: 0.3, ease: 'easeOut' },
										backgroundPosition: {
											repeat: Infinity,
											duration: 2,
											ease: 'linear',
										},
									}}
								/>
							</div>
							<p className="text-gray-300 text-sm tracking-wide select-none">
								Carregando {Math.floor(progress)}%
							</p>
						</>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
