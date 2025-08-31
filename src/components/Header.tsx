import { FaRegUser } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { RiMailSendLine } from 'react-icons/ri';
import { GoProject } from 'react-icons/go';
function Header() {
	return (
		<header
			className="w-4/5 z-10 h-28 bg-zinc-600 backdrop-blur-sm fixed top-12 left-[50%] rounded-sm transform-[translate(-50%)] flex items-center justify-between py-6 lg:px-28 md:px-16 px-8"
			style={{
				clipPath:
					'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 57.5% 100%, 54% calc(100% - 10px), 46% calc(100% - 10px), 42.5% 100%, 0 100%, 0 30px)',
			}}
		>
			<div className="flex justify-center items-center">
				<a href="$">
					<img
						src="/images/Logo1.png"
						alt="Logo TheusDev"
						className="size-32"
					/>
				</a>
			</div>
			<div className="items-center hidden md:flex gap-2 min-[860px]:gap-4 bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
				<a href="$">
					<div className="flex flex-col justify-center items-center gap-1">
						<FaRegUser className="text-4xl text-cyan-primary" />
						<p className="font-orbiton font-bold text-sm">Sobre</p>
					</div>
				</a>
				<a href="$">
					<div className="flex flex-col justify-center items-center gap-1">
						<FiCpu className="text-4xl text-cyan-primary" />
						<p className="font-orbiton font-bold text-sm">Tecnologias</p>
					</div>
				</a>
				<a href="$">
					<div className="flex flex-col justify-center items-center gap-1">
						<GoProject className="text-4xl text-cyan-primary" />
						<p className="font-orbiton font-bold text-sm">Projetos</p>
					</div>
				</a>
				<a href="$">
					<div className="flex flex-col justify-center items-center gap-1">
						<RiMailSendLine className="text-4xl text-cyan-primary" />
						<p className="font-orbiton font-bold text-sm">Contato</p>
					</div>
				</a>
			</div>
		</header>
	);
}

export default Header;
