// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import HomePage from './components/HomePage/HomePage';
// import GamePage from './components/GamePage/GamePage';
// // import WordList from './components/WordList/WordList';

// function App() {
// 	return (
// 		<Router>
// 			<Navbar />
// 			<div style={{ marginTop: '60px' }}>
// 				{' '}
// 				{/* Чтобы меню не перекрывало контент */}
// 				<Routes>
// 					<Route path='/' element={<HomePage />} />
// 					<Route path='/game' element={<GamePage />} />
// 				</Routes>
// 			</div>
// 		</Router>
// 	);
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import GamePage from './components/GamePage/GamePage';
import WordProvider from './components/WordContext/WordContext';

function App() {
	return (
		<WordProvider>
			{' '}
			{/* Оборачиваем приложение в контекст */}
			<Router>
				<Navbar />
				<div style={{ marginTop: '60px' }}>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/game' element={<GamePage />} />
					</Routes>
				</div>
			</Router>
		</WordProvider>
	);
}

export default App;
