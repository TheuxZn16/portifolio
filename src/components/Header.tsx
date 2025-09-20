import { FaRegUser } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { RiMailSendLine } from 'react-icons/ri';
import { GoProject } from 'react-icons/go';
import { HiMenu, HiX } from 'react-icons/hi';

function Header() {
	return (
		<header
			className="fixed bg-[#1a1a1a] flex items-center justify-between left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out w-4/5 top-12 h-24 py-6 lg:px-28 md:px-16 px-8 rounded-sm cursor-default"
			style={{
				clipPath:
					'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 57.5% 100%, 54% calc(100% - 10px), 46% calc(100% - 10px), 42.5% 100%, 0 100%, 0 30px)',
				borderRadius: '0',
			}}
		>
			<div>
				<a href="$">
					<img src="/images/Logo1.png" alt="Logo TheusDev" className="w-32" />
				</a>
			</div>
			<nav className="flex items-center justify-center gap-3">
				<a
					href="#sobre"
					className={`transition-all duration-500 ease-out opacity-100 translate-y-0`}
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
					className={`transition-all duration-500 ease-out opacity-100 translate-y-0`}
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
					className={`transition-all duration-500 ease-out opacity-100 translate-y-0`}
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
					className={`transition-all duration-500 ease-outopacity-100 translate-y-0`}
				>
					<div className="flex flex-col justify-center items-center gap-1">
						<RiMailSendLine className="text-3xl text-cyan-primary" />
						<p className="font-orbiton font-bold text-sm bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
							Contato
						</p>
					</div>
				</a>
			</nav>
		</header>
	);
}

export default Header;
