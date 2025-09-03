import Header from './components/Header';
import GLBViewer from './components/Logo';

function App() {
	return (
		<div className="bg-[#0a0a0a]">
			<Header />
			<GLBViewer url="/images/Logo3D.glb" />
		</div>
	);
}

export default App;
