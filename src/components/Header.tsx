import { FaRegUser } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { RiMailSendLine } from 'react-icons/ri';
import { GoProject } from 'react-icons/go';
import { useEffect, useState } from 'react';

function Header() {
	const [isVisible, setIsVisible] = useState(false);
	const [showLogo, setShowLogo] = useState(false);
	const [showSobre, setShowSobre] = useState(false);
	const [showTecnologias, setShowTecnologias] = useState(false);
	const [showProjetos, setShowProjetos] = useState(false);
	const [showContato, setShowContato] = useState(false);

	useEffect(() => {
		const headerTimer = setTimeout(() => {
			setIsVisible(true);
		}, 1500);

		const logoTimer = setTimeout(() => {
			setShowLogo(true);
		}, 2500);

		const sobreTimer = setTimeout(() => {
			setShowSobre(true);
		}, 2800);

		const tecnologiasTimer = setTimeout(() => {
			setShowTecnologias(true);
		}, 3100);

		const projetosTimer = setTimeout(() => {
			setShowProjetos(true);
		}, 3400);

		const contatoTimer = setTimeout(() => {
			setShowContato(true);
		}, 3700);

		return () => {
			clearTimeout(headerTimer);
			clearTimeout(logoTimer);
			clearTimeout(sobreTimer);
			clearTimeout(tecnologiasTimer);
			clearTimeout(projetosTimer);
			clearTimeout(contatoTimer);
		};
	}, []);

	return (
		<header
			className={`z-10 bg-zinc-600 backdrop-blur-sm fixed left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out ${
				isVisible
					? 'w-4/5 top-12 h-28 py-6 lg:px-28 md:px-16 px-8 rounded-sm -translate-x-1/2'
					: 'w-8 h-8 top-[4.5rem] rounded-full -translate-x-1/2'
			} flex items-center justify-between`}
			style={{
				clipPath: isVisible
					? 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 57.5% 100%, 54% calc(100% - 10px), 46% calc(100% - 10px), 42.5% 100%, 0 100%, 0 30px)'
					: 'circle(50% at 50% 50%)',
				borderRadius: isVisible ? '0' : '50%',
			}}
		>
			<div
				className={`flex justify-center items-center transition-all duration-700 ease-out ${
					showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
				}`}
			>
				<a href="$">
					<img
						src="/images/Logo1.png"
						alt="Logo TheusDev"
						className="size-32"
					/>
				</a>
			</div>
			<div className="items-center hidden md:flex gap-2 min-[860px]:gap-4">
				<a
					href="$"
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
					href="$"
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
					href="$"
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
					href="$"
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
		</header>
	);
}

export default Header;
