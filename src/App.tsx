import Header from './components/Header';
import LogoScroll from './components/LogoMain';

function App() {
	return (
		<div className="bg-[#0a0a0a]">
			<Header />
			<div className="h-[100vh]"></div>
			<LogoScroll url="/images/Logo2.svg" />

			<div className="h-screen"></div>
			<div className="h-screen"></div>
			<div className="h-screen"></div>
			<div className="h-screen"></div>
			<div className="h-screen"></div>
			<div className="h-screen"></div>
			<div className="h-screen"></div>
		</div>
	);
}

export default App;
