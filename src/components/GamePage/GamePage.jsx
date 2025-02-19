import React, { useState, useEffect } from 'react';
import WordCarousel from '../WordCarousel/WordCarousel';

const GamePage = () => {
	const [words, setWords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [learnedWords, setLearnedWords] = useState(new Set());

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

	const handleLearnedWord = (wordId) => {
		setLearnedWords((prev) => new Set(prev).add(wordId));
	};

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div>
			<h1>Карточки для изучения слов</h1>
			<p>Изучено слов: {learnedWords.size}</p>
			<WordCarousel
				words={words}
				onLearnedWord={handleLearnedWord}
				learnedWords={learnedWords}
			/>
		</div>
	);
};

export default GamePage;
