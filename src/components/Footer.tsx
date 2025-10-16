import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

type FooterLinkProps = {
	href: string;
	icon: React.ReactNode;
	label: string;
};

function FooterLink({ href, icon, label }: FooterLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex flex-col items-center justify-center text-purple-300 hover:text-white transition-all"
		>
			<div
				className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-purple-500/40
				bg-purple-600/10 hover:bg-purple-600/20 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
			>
				{icon}
			</div>
			<span className="mt-2 font-mono text-xs tracking-widest">{label}</span>
		</a>
	);
}

export default function Footer() {
	return (
		<footer className="relative w-full bg-gradient-to-b from-[#0a0014] to-[#000000] py-16 flex flex-col items-center justify-center text-center overflow-hidden">
			<div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden">
				<div className="relative w-full h-full bg-purple-600/20">
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-electricLine" />
				</div>
			</div>

			<div className="absolute inset-0 -z-10">
				<div className="absolute w-[700px] h-[700px] bg-purple-600/10 blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full" />
			</div>

			<p className="text-gray-300 text-base md:text-lg font-light mb-10 px-4 max-w-xl leading-relaxed">
				“O futuro é construído linha por linha — transforme ideias em código e
				inovação em realidade.”
			</p>

			<div className="flex gap-10 sm:gap-16 justify-center items-center">
				<FooterLink
					href="https://github.com/exemplo"
					icon={<FaGithub className="text-2xl sm:text-3xl" />}
					label="GitHub"
				/>
				<FooterLink
					href="https://linkedin.com/in/exemplo"
					icon={<FaLinkedin className="text-2xl sm:text-3xl" />}
					label="LinkedIn"
				/>
				<FooterLink
					href="mailto:matheusestevam421@gmail.com"
					icon={<FaEnvelope className="text-2xl sm:text-3xl" />}
					label="E-mail"
				/>
			</div>

			<p className="text-gray-500 text-xs mt-12 tracking-wider">
				© {new Date().getFullYear()} — Desenvolvido com 💜 e café 🍵
			</p>
		</footer>
	);
}
