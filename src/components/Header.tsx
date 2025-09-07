import { FaRegUser } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { RiMailSendLine } from 'react-icons/ri';
import { GoProject } from 'react-icons/go';
import { HiMenu, HiX } from 'react-icons/hi';
import { useEffect, useState, useCallback, useRef } from 'react';

function Header() {
	const [isVisible, setIsVisible] = useState(false);
	const [showLogo, setShowLogo] = useState(false);
	const [showSobre, setShowSobre] = useState(false);
	const [showTecnologias, setShowTecnologias] = useState(false);
	const [showProjetos, setShowProjetos] = useState(false);
	const [showContato, setShowContato] = useState(false);
	const [showHamburger, setShowHamburger] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const timersRef = useRef<NodeJS.Timeout[]>([]);

	const clearAllTimers = useCallback(() => {
		timersRef.current.forEach((timer) => {
			clearTimeout(timer);
		});
		timersRef.current = [];
	}, []);

	const onTop = useCallback(() => {
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
				setTimeout(() => setShowHamburger(true), 1200),
			];
			timersRef.current = timers;
		} else {
			const timers = [
				setTimeout(() => setShowLogo(false), 250),
				setTimeout(() => setShowSobre(false), 350),
				setTimeout(() => setShowTecnologias(false), 450),
				setTimeout(() => setShowProjetos(false), 550),
				setTimeout(() => setShowContato(false), 650),
				setTimeout(() => setShowHamburger(false), 250),
				setTimeout(() => setIsVisible(false), 850),
			];
			timersRef.current = timers;
		}
	}, [clearAllTimers]);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		const handleScroll = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				if (window.scrollY === 0) {
					setIsClicked(false);
					onTop();
				} else {
					setIsClicked(false);
					setIsHovered(false);
					setIsVisible(false);
					setShowLogo(false);
					setShowSobre(false);
					setShowTecnologias(false);
					setShowProjetos(false);
					setShowContato(false);
					setShowHamburger(false);
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
			onTop();
		}
	}, [onTop]);

	const isOpen = isVisible || isHovered || isClicked;

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<>
			<div
				onMouseEnter={() => {
					if (!isVisible && !isClicked) {
						setIsHovered(true);
						setShowLogo(true);
						setShowSobre(true);
						setShowTecnologias(true);
						setShowProjetos(true);
						setShowContato(true);
						setShowHamburger(true);
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
						setShowHamburger(false);
					}
				}}
				onClick={() => {
					if (isClicked) {
						setIsClicked(false);
						setShowLogo(false);
						setShowSobre(false);
						setShowTecnologias(false);
						setShowProjetos(false);
						setShowContato(false);
						setShowHamburger(false);
					} else {
						setIsClicked(true);
						setShowLogo(true);
						setShowSobre(true);
						setShowTecnologias(true);
						setShowProjetos(true);
						setShowContato(true);
						setShowHamburger(true);
					}
				}}
				className={`z-10 bg-[#1a1a1a] fixed left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out ${
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
							showSobre
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-4'
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

				<button
					type="button"
					onClick={toggleMobileMenu}
					className={`md:hidden flex items-center justify-center w-8 h-8 text-cyan-primary hover:text-purple-primary 
	transition-all duration-500 ease-out
	${showHamburger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
	`}
				>
					{isMobileMenuOpen ? (
						<HiX className="text-9xl" />
					) : (
						<HiMenu className="text-9xl" />
					)}
				</button>
			</div>

			{isMobileMenuOpen && (
				<div
					className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50 border-none"
					onClick={toggleMobileMenu}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							toggleMobileMenu();
						}
					}}
				>
					<div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] rounded-lg p-6 min-w-[280px]">
						<div className="flex flex-col gap-6">
							<button
								type="button"
								onClick={() => {
									toggleMobileMenu();
									document
										.getElementById('sobre')
										?.scrollIntoView({ behavior: 'smooth' });
								}}
								className="flex items-center gap-4 text-cyan-primary hover:text-purple-primary transition-colors duration-300 bg-transparent border-none text-left"
							>
								<FaRegUser className="text-3xl" />
								<p className="font-orbiton font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Sobre
								</p>
							</button>
							<button
								type="button"
								onClick={() => {
									toggleMobileMenu();
									document
										.getElementById('tecnologias')
										?.scrollIntoView({ behavior: 'smooth' });
								}}
								className="flex items-center gap-4 text-cyan-primary hover:text-purple-primary transition-colors duration-300 bg-transparent border-none text-left"
							>
								<FiCpu className="text-3xl" />
								<p className="font-orbiton font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Tecnologias
								</p>
							</button>
							<button
								type="button"
								onClick={() => {
									toggleMobileMenu();
									document
										.getElementById('projetos')
										?.scrollIntoView({ behavior: 'smooth' });
								}}
								className="flex items-center gap-4 text-cyan-primary hover:text-purple-primary transition-colors duration-300 bg-transparent border-none text-left"
							>
								<GoProject className="text-3xl" />
								<p className="font-orbiton font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Projetos
								</p>
							</button>
							<button
								type="button"
								onClick={() => {
									toggleMobileMenu();
									document
										.getElementById('contato')
										?.scrollIntoView({ behavior: 'smooth' });
								}}
								className="flex items-center gap-4 text-cyan-primary hover:text-purple-primary transition-colors duration-300 bg-transparent border-none text-left"
							>
								<RiMailSendLine className="text-3xl" />
								<p className="font-orbiton font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Contato
								</p>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Header;
