import { FaRegUser } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { RiMailSendLine } from 'react-icons/ri';
import { GoProject } from 'react-icons/go';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState, useEffect } from 'react';

function Header() {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const [openMenu, setOpenMenu] = useState(false);
	const [openHeader, setOpenHeader] = useState(false);
	const [onTop, setOnTop] = useState(false);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		const handleScroll = () => setOnTop(window.scrollY < 5);
		window.addEventListener('scroll', handleScroll);

		handleResize();
		handleScroll();

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (onTop) {
			setOpenHeader(true);
		} else {
			setOpenHeader(false);
		}
	}, [onTop]);

	useEffect(() => {
		if (openHeader) {
			const timer = setTimeout(() => setShowContent(true), 700);
			return () => clearTimeout(timer);
		} else {
			setShowContent(false);
		}
	}, [openHeader]);

	return (
		<>
			{onTop ? (
				<header
					className="fixed bg-[#1a1a1a] flex items-center justify-between left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out w-4/5 top-12 h-24 py-6 lg:px-28 md:px-16 px-12 rounded-sm cursor-default"
					style={{
						clipPath:
							'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 57.5% 100%, 54% calc(100% - 10px), 46% calc(100% - 10px), 42.5% 100%, 0 100%, 0 30px)',
						borderRadius: '0',
					}}
				>
					<div
						className={`transition-all duration-1000 ${showContent ? 'block' : 'hidden'}`}
					>
						<a href="$">
							<img
								src="/images/Logo1.png"
								alt="Logo TheusDev"
								className="w-32"
							/>
						</a>
					</div>

					{windowWidth < 760 ? (
						<button
							type="button"
							className="cursor-pointer"
							onClick={() => setOpenMenu(!openMenu)}
						>
							<HiMenu className="text-4xl text-cyan-primary" />
						</button>
					) : (
						<nav
							className={`transition-all duration-[1000ms] ${showContent ? 'flex items-center justify-center gap-3' : 'hidden'}`}
						>
							<a
								href="#sobre"
								className="transition-all duration-500 ease-out opacity-100 translate-y-0"
							>
								<div className="flex flex-col justify-center items-center gap-1">
									<FaRegUser className="text-3xl text-cyan-primary" />
									<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
										Sobre
									</p>
								</div>
							</a>
							<a
								href="#tecnologias"
								className="transition-all duration-500 ease-out opacity-100 translate-y-0"
							>
								<div className="flex flex-col justify-center items-center gap-1">
									<FiCpu className="text-3xl text-cyan-primary" />
									<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
										Tecnologias
									</p>
								</div>
							</a>
							<a
								href="#projetos"
								className="transition-all duration-500 ease-out opacity-100 translate-y-0"
							>
								<div className="flex flex-col justify-center items-center gap-1">
									<GoProject className="text-3xl text-cyan-primary" />
									<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
										Projetos
									</p>
								</div>
							</a>
							<a
								href="#contato"
								className="transition-all duration-500 ease-out opacity-100 translate-y-0"
							>
								<div className="flex flex-col justify-center items-center gap-1">
									<RiMailSendLine className="text-3xl text-cyan-primary" />
									<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
										Contato
									</p>
								</div>
							</a>
						</nav>
					)}
				</header>
			) : (
				<header
					className={`z-10 bg-[#1a1a1a] fixed left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out ${
						showContent
							? 'w-4/5 top-12 h-24 py-6 lg:px-28 md:px-16 px-12 cursor-default'
							: 'w-8 h-8 top-[4.5rem] rounded-full -translate-x-1/2 cursor-pointer'
					} flex items-center justify-between`}
					style={{
						clipPath: showContent
							? 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 57.5% 100%, 54% calc(100% - 10px), 46% calc(100% - 10px), 42.5% 100%, 0 100%, 0 30px)'
							: 'circle(50% at 50% 50%)',
						borderRadius: showContent ? '0' : '50%',
					}}
				>
					<div
						className={`transition-all duration-1000 ${showContent ? 'block' : 'hidden'}`}
					>
						<a href="$">
							<img
								src="/images/Logo1.png"
								alt="Logo TheusDev"
								className="w-32"
							/>
						</a>
					</div>

					{windowWidth < 760 ? (
						<button
							type="button"
							className="cursor-pointer"
							onClick={() => setOpenMenu(!openMenu)}
						>
							<HiMenu className="text-4xl text-cyan-primary" />
						</button>
					) : (
						<nav
							className={`transition-all duration-1000 ${showContent ? 'flex items-center justify-center gap-3' : 'hidden'}`}
						>
							<a
								href="#sobre"
								className="transition-all duration-500 ease-out opacity-100 translate-y-0"
							>
								<div className="flex flex-col justify-center items-center gap-1">
									<FaRegUser className="text-3xl text-cyan-primary" />
									<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
										Sobre
									</p>
								</div>
							</a>
							<a
								href="#tecnologias"
								className="transition-all duration-500 ease-out opacity-100 translate-y-0"
							>
								<div className="flex flex-col justify-center items-center gap-1">
									<FiCpu className="text-3xl text-cyan-primary" />
									<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
										Tecnologias
									</p>
								</div>
							</a>
							<a
								href="#projetos"
								className="transition-all duration-500 ease-out opacity-100 translate-y-0"
							>
								<div className="flex flex-col justify-center items-center gap-1">
									<GoProject className="text-3xl text-cyan-primary" />
									<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
										Projetos
									</p>
								</div>
							</a>
							<a
								href="#contato"
								className="transition-all duration-500 ease-out opacity-100 translate-y-0"
							>
								<div className="flex flex-col justify-center items-center gap-1">
									<RiMailSendLine className="text-3xl text-cyan-primary" />
									<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
										Contato
									</p>
								</div>
							</a>
						</nav>
					)}
				</header>
			)}

			{openMenu && (
				<div className="fixed inset-0 z-20 flex justify-center items-center">
					<div
						className="absolute inset-0 bg-black opacity-35"
						onClick={() => setOpenMenu(false)}
					></div>

					<div className="relative bg-[#1a1a1a] w-2/3 h-2/3 rounded-3xl flex flex-col">
						<button
							type="button"
							className="absolute top-4 right-4 p-1 cursor-pointer"
							onClick={() => setOpenMenu(false)}
						>
							<HiX className="text-cyan-primary text-xl" />
						</button>

						<nav className="flex flex-1 flex-col gap-4 items-center justify-center">
							<a
								href="#sobre"
								className="flex flex-col justify-center items-center gap-1 text-cyan-primary"
								onClick={() => setOpenMenu(false)}
							>
								<FaRegUser className="text-3xl" />
								<p className="font-orbiton font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Sobre
								</p>
							</a>
							<a
								href="#tecnologias"
								className="flex flex-col justify-center items-center gap-1 text-cyan-primary"
								onClick={() => setOpenMenu(false)}
							>
								<FiCpu className="text-3xl" />
								<p className="font-orbiton font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Tecnologias
								</p>
							</a>
							<a
								href="#projetos"
								className="flex flex-col justify-center items-center gap-1 text-cyan-primary"
								onClick={() => setOpenMenu(false)}
							>
								<GoProject className="text-3xl" />
								<p className="font-orbiton font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
									Projetos
								</p>
							</a>
							<a
								href="#contato"
								className="flex flex-col justify-center items-center gap-1 text-cyan-primary"
								onClick={() => setOpenMenu(false)}
							>
								<RiMailSendLine className="text-3xl" />
								<p className="font-orbiton font-bold text-lg bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
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
