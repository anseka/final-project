import React, { useState, useEffect } from 'react';
import WordCarousel from '../WordCarousel/WordCarousel';

const GamePage = () => {
	const [words, setWords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('http://itgirlschool.justmakeit.ru/api/words')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Ошибка загрузки данных');
				}
				return response.json();
			})
			.then((data) => {
				setWords(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <p>Загрузка...</p>;

	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div>
			<h1>Карточки для изучения слов</h1>
			<WordCarousel words={words} />
		</div>
	);
};

export default GamePage;
