import { FaRegUser } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { RiMailSendLine } from 'react-icons/ri';
import { GoProject } from 'react-icons/go';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState, useEffect, useCallback, useContext } from 'react';
import { SmootherContext } from '../App';

function Header() {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const [openMenu, setOpenMenu] = useState(false);
	const [openHeader, setOpenHeader] = useState(false);
	const [isManuallyOpened, setIsManuallyOpened] = useState(false);
	const [, setHasInitialOpened] = useState(false);
	const [initialDelayActive, setInitialDelayActive] = useState(true);
	const [onTop, setOnTop] = useState(false);
	const [showContent, setShowContent] = useState(false);
	const smootherRef = useContext(SmootherContext);

	const handleScrollTo = (id: string) => {
		const el = document.getElementById(id);
		if (el && smootherRef?.current) {
			smootherRef.current.scrollTo(el, true, 'top top');
		} else if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const closeHeader = useCallback(() => {
		if (window.scrollY >= 5) {
			setOpenHeader((prev) => {
				if (prev) {
					setIsManuallyOpened(false);
					return false;
				}
				return prev;
			});
		}
	}, []);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		const handleScroll = () => {
			setOnTop(window.scrollY < 5);
			closeHeader();
		};
		window.addEventListener('scroll', handleScroll);

		handleResize();

		if (!initialDelayActive) {
			handleScroll();
		}

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [closeHeader, initialDelayActive]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setInitialDelayActive(false);
			setHasInitialOpened(true);
			setOnTop(window.scrollY < 5);
		}, 800);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (initialDelayActive) return;
		if (onTop) {
			setIsManuallyOpened(false);
			setOpenHeader(true);
		} else {
			if (!isManuallyOpened) setOpenHeader(false);
		}
	}, [onTop, isManuallyOpened, initialDelayActive]);

	useEffect(() => {
		if (openHeader) {
			const timer = setTimeout(() => setShowContent(true), 1000);
			return () => clearTimeout(timer);
		} else {
			setShowContent(false);
		}
	}, [openHeader]);

	const renderAsFull = onTop || openHeader;
	const showFloatingEvents = !onTop;

	return (
		<>
			<header
				className={`z-50 bg-[#1a1a1a] fixed left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out flex items-center justify-around md:justify-between ${
					initialDelayActive
						? 'w-8 h-8 top-[4.5rem] rounded-full cursor-pointer'
						: renderAsFull
							? 'w-[90%] max-w-[1200px] top-8 md:top-10 h-24 py-6 lg:px-28 md:px-16 px-4 rounded-sm cursor-default'
							: 'w-8 h-8 top-[4.5rem] rounded-full cursor-pointer'
				}`}
				style={{
					clipPath: initialDelayActive
						? 'circle(50% at 50% 50%)'
						: renderAsFull
							? 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 57.5% 100%, 54% calc(100% - 10px), 46% calc(100% - 10px), 42.5% 100%, 0 100%, 0 30px)'
							: 'circle(50% at 50% 50%)',
					borderRadius: initialDelayActive ? '50%' : renderAsFull ? '0' : '50%',
				}}
				onClick={
					showFloatingEvents
						? () => {
								setOpenHeader((prev) => !prev);
								setIsManuallyOpened((prev) => !prev);
							}
						: undefined
				}
				onMouseEnter={
					showFloatingEvents
						? () => {
								if (!openHeader) setOpenHeader(true);
							}
						: undefined
				}
				onMouseLeave={
					showFloatingEvents
						? () => {
								if (!isManuallyOpened) setOpenHeader(false);
							}
						: undefined
				}
			>
				<div
					className={`${showContent ? 'block animate-slideDown delay-[200ms]' : 'hidden'}`}
				>
					<a onClick={() => handleScrollTo('hero')}>
						<img
							src="/images/Logo1.png"
							alt="Logo TheusDev"
							className="md:w-32 w-26 cursor-pointer"
						/>
					</a>
				</div>

				{windowWidth < 760 ? (
					<button
						type="button"
						className={`cursor-pointer ${showContent ? 'animate-slideUp delay-[100ms]' : 'hidden'}`}
						onClick={() => setOpenMenu(!openMenu)}
					>
						<HiMenu className="text-4xl text-cyan-primary" />
					</button>
				) : (
					<nav
						className={`${showContent ? 'flex items-center justify-center gap-3' : 'hidden'}`}
					>
						<a
							onClick={() => handleScrollTo('about-me')}
							className="animate-slideUp delay-[300ms] cursor-pointer"
						>
							<div className="flex flex-col justify-center items-center gap-1">
								<FaRegUser className="text-3xl text-cyan-primary" />
								<p className="font-orbitron font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Sobre
								</p>
							</div>
						</a>
						<a
							onClick={() => handleScrollTo('technologies')}
							className="animate-slideDown delay-[500ms] cursor-pointer"
						>
							<div className="flex flex-col justify-center items-center gap-1">
								<FiCpu className="text-3xl text-cyan-primary" />
								<p className="font-orbitron font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Tecnologias
								</p>
							</div>
						</a>
						<a
							onClick={() => handleScrollTo('projects')}
							className="animate-slideUp delay-[700ms] cursor-pointer"
						>
							<div className="flex flex-col justify-center items-center gap-1">
								<GoProject className="text-3xl text-cyan-primary" />
								<p className="font-orbitron font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Projetos
								</p>
							</div>
						</a>
						<a
							onClick={() => handleScrollTo('contact')}
							className="animate-slideDown delay-[900ms] cursor-pointer"
						>
							<div className="flex flex-col justify-center items-center gap-1">
								<RiMailSendLine className="text-3xl text-cyan-primary" />
								<p className="font-orbitron font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Contato
								</p>
							</div>
						</a>
					</nav>
				)}
			</header>

			{openMenu && (
				<div className="fixed inset-0 z-50 flex justify-center items-center">
					<div
						className="absolute inset-0 bg-black/40 backdrop-blur-sm"
						onClick={() => setOpenMenu(false)}
					></div>

					<div className="relative bg-[#1a1a1a] w-[85%] max-w-[400px] h-[70%] rounded-3xl flex flex-col justify-center items-center shadow-[0_0_30px_rgba(168,85,247,0.3)]">
						<button
							type="button"
							className="absolute top-4 right-4 p-1 cursor-pointer"
							onClick={() => setOpenMenu(false)}
						>
							<HiX className="text-cyan-primary text-2xl" />
						</button>

						<nav className="flex flex-col gap-6 items-center justify-center">
							<a
								className="flex flex-col cursor-pointer justify-center items-center gap-1 text-cyan-primary"
								onClick={() => {
									handleScrollTo('about-me');
									setOpenMenu(false);
								}}
							>
								<FaRegUser className="text-3xl" />
								<p className="font-orbitron font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Sobre
								</p>
							</a>
							<a
								className="flex flex-col cursor-pointer justify-center items-center gap-1 text-cyan-primary"
								onClick={() => {
									handleScrollTo('technologies');
									setOpenMenu(false);
								}}
							>
								<FiCpu className="text-3xl" />
								<p className="font-orbitron font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Tecnologias
								</p>
							</a>
							<a
								className="flex flex-col cursor-pointer justify-center items-center gap-1 text-cyan-primary"
								onClick={() => {
									handleScrollTo('projects');
									setOpenMenu(false);
								}}
							>
								<GoProject className="text-3xl" />
								<p className="font-orbitron font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Projetos
								</p>
							</a>
							<a
								className="flex flex-col cursor-pointer justify-center items-center gap-1 text-cyan-primary"
								onClick={() => {
									handleScrollTo('contact');
									setOpenMenu(false);
								}}
							>
								<RiMailSendLine className="text-3xl" />
								<p className="font-orbitron font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Contato
								</p>
							</a>
						</nav>
					</div>
				</div>
			)}
		</>
	);
}

export default Header;
