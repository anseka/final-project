import React from 'react';
import WordList from '../WordList/WordList';
import './HomePage.css';
const HomePage = () => {
	return (
		<div>
			<h1 className='word-table-title'>Таблица слов</h1>
			<WordList />
		</div>
	);
};

export default HomePage;
