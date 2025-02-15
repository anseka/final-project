import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WordList from './components/WordList/WordList';
import './App.css';

const App = () => {
	return (
		<div className='app'>
			<Header />
			<main>
				<WordList />
			</main>
			<Footer />
		</div>
	);
};

export default App;
