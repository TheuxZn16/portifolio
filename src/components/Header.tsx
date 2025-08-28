import { FaRegUser } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { RiMailSendLine } from 'react-icons/ri';
import { GoProject } from 'react-icons/go';
function Header() {
	return (
		<header className="w-screen z-10 h-28 bg-transparent backdrop-blur-sm  fixed top-0 left-0 flex items-center justify-center p-6">
			<div className="flex items-center gap-4 bg-gradient-to-br from-purple-primary to-cyan-primary text-transparent bg-clip-text">
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
