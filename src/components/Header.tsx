import { FaRegUser } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { RiMailSendLine } from 'react-icons/ri';
import { GoProject } from 'react-icons/go';
import { useEffect, useState, useCallback, useRef } from 'react';

function Header() {
	const [isVisible, setIsVisible] = useState(false);
	const [showLogo, setShowLogo] = useState(false);
	const [showSobre, setShowSobre] = useState(false);
	const [showTecnologias, setShowTecnologias] = useState(false);
	const [showProjetos, setShowProjetos] = useState(false);
	const [showContato, setShowContato] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	const timersRef = useRef<number[]>([]);

	const clearAllTimers = useCallback(() => {
		timersRef.current.forEach((timer) => {
			clearTimeout(timer);
		});
		timersRef.current = [];
	}, []);

	const onTop = useCallback(
		(clicked: boolean) => {
			const top = window.scrollY === 0;

			clearAllTimers();

			if (top) {
				setIsClicked(false);
				const timers = [
					setTimeout(() => setIsVisible(true), 800),
					setTimeout(() => setShowLogo(true), 1200),
					setTimeout(() => setShowSobre(true), 1400),
					setTimeout(() => setShowTecnologias(true), 1600),
					setTimeout(() => setShowProjetos(true), 1800),
					setTimeout(() => setShowContato(true), 2000),
				];
				timersRef.current = timers;
			} else {
				const timers = [
					setTimeout(() => setShowLogo(false), 250),
					setTimeout(() => setShowSobre(false), 350),
					setTimeout(() => setShowTecnologias(false), 450),
					setTimeout(() => setShowProjetos(false), 550),
					setTimeout(() => setShowContato(false), 650),
					setTimeout(() => setIsVisible(false), 750),
				];
				timersRef.current = timers;
			}
		},
		[clearAllTimers],
	);

	useEffect(() => {
		let timeoutId: number;
		const handleScroll = () => {
			clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				if (window.scrollY === 0) {
					setIsClicked(false);
					onTop(true);
				} else {
					setIsClicked(false);
					setIsHovered(false);
					setIsVisible(false);
					setShowLogo(false);
					setShowSobre(false);
					setShowTecnologias(false);
					setShowProjetos(false);
					setShowContato(false);
					clearAllTimers();
				}
			}, 100);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(timeoutId);
			clearAllTimers();
		};
	}, [onTop, clearAllTimers]);

	useEffect(() => {
		if (window.scrollY === 0) {
			onTop(false);
		}
	}, [onTop]);

	const isOpen = isVisible || isHovered || isClicked;

	return (
		<button
			type="button"
			onMouseEnter={() => {
				if (!isVisible && !isClicked) {
					setIsHovered(true);
					setShowLogo(true);
					setShowSobre(true);
					setShowTecnologias(true);
					setShowProjetos(true);
					setShowContato(true);
				}
			}}
			onMouseLeave={() => {
				if (!isVisible && !isClicked) {
					setIsHovered(false);
					setShowLogo(false);
					setShowSobre(false);
					setShowTecnologias(false);
					setShowProjetos(false);
					setShowContato(false);
				}
			}}
			onClick={() => {
				if (!isVisible) {
					if (isClicked) {
						setIsClicked(false);
						setShowLogo(false);
						setShowSobre(false);
						setShowTecnologias(false);
						setShowProjetos(false);
						setShowContato(false);
					} else {
						setIsClicked(true);
						setShowLogo(true);
						setShowSobre(true);
						setShowTecnologias(true);
						setShowProjetos(true);
						setShowContato(true);
					}
				}
			}}
			className={`z-10 bg-zinc-600 backdrop-blur-sm fixed left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out ${
				isOpen
					? 'w-4/5 top-12 h-28 py-6 lg:px-28 md:px-16 px-8 rounded-sm -translate-x-1/2 cursor-default'
					: 'w-8 h-8 top-[4.5rem] rounded-full -translate-x-1/2 cursor-pointer'
			} flex items-center justify-between`}
			style={{
				clipPath: isOpen
					? 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 57.5% 100%, 54% calc(100% - 10px), 46% calc(100% - 10px), 42.5% 100%, 0 100%, 0 30px)'
					: 'circle(50% at 50% 50%)',
				borderRadius: isOpen ? '0' : '50%',
			}}
		>
			<div
				className={`flex justify-center items-center transition-all duration-700 ease-out ${
					showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
				}`}
			>
				<a href="#home">
					<img
						src="/images/Logo1.png"
						alt="Logo TheusDev"
						className="size-32"
					/>
				</a>
			</div>
			<div className="items-center hidden md:flex gap-2 min-[860px]:gap-4">
				<a
					href="#sobre"
					className={`transition-all duration-500 ease-out ${
						showSobre ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
					}`}
				>
					<div className="flex flex-col justify-center items-center gap-1">
						<FaRegUser className="text-4xl text-cyan-primary" />
						<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
							Sobre
						</p>
					</div>
				</a>
				<a
					href="#tecnologias"
					className={`transition-all duration-500 ease-out ${
						showTecnologias
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-4'
					}`}
				>
					<div className="flex flex-col justify-center items-center gap-1">
						<FiCpu className="text-4xl text-cyan-primary" />
						<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
							Tecnologias
						</p>
					</div>
				</a>
				<a
					href="#projetos"
					className={`transition-all duration-500 ease-out ${
						showProjetos
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-4'
					}`}
				>
					<div className="flex flex-col justify-center items-center gap-1">
						<GoProject className="text-4xl text-cyan-primary" />
						<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
							Projetos
						</p>
					</div>
				</a>
				<a
					href="#contato"
					className={`transition-all duration-500 ease-out ${
						showContato
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-4'
					}`}
				>
					<div className="flex flex-col justify-center items-center gap-1">
						<RiMailSendLine className="text-4xl text-cyan-primary" />
						<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
							Contato
						</p>
					</div>
				</a>
			</div>
		</button>
	);
}

export default Header;
