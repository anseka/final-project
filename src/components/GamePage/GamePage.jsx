import React, { useState, useEffect } from 'react';
import WordCarousel from '../WordCarousel/WordCarousel';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const GamePage = () => {
	const [words, setWords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [learnedWords, setLearnedWords] = useState(new Set());
	const [showLoading, setShowLoading] = useState(true);

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

	useEffect(() => {
		if (!loading) {
			const timer = setTimeout(() => {
				setShowLoading(false);
			}, 1000); // задержка для показа анимации загрузки
			return () => clearTimeout(timer);
		}
	}, [loading]);

	if (showLoading) return <LoadingSpinner />;
	if (error) return <ErrorMessage message={error} />;

	const handleLearnedWord = (wordId) => {
		setLearnedWords((prev) => new Set(prev).add(wordId));
	};

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
