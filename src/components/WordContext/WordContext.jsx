import React, { createContext, useState, useEffect } from 'react';

export const WordContext = createContext();

const WordProvider = ({ children }) => {
	const [words, setWords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchWords = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				'http://itgirlschool.justmakeit.ru/api/words'
			);
			if (!response.ok) throw new Error('Ошибка загрузки данных');
			const data = await response.json();
			setWords(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWords();
	}, []);

	const addWord = async (newWord) => {
		try {
			const response = await fetch(
				'http://itgirlschool.justmakeit.ru/api/words/add',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newWord),
				}
			);
			const savedWord = await response.json();
			setWords((prevWords) => [...prevWords, savedWord]);
		} catch {
			setError('Ошибка при добавлении слова');
		}
	};

	const updateWord = async (id, updatedWord) => {
		try {
			await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedWord),
			});
			setWords((prevWords) =>
				prevWords.map((word) => (word.id === id ? updatedWord : word))
			);
		} catch {
			setError('Ошибка при обновлении слова');
		}
	};

	const deleteWord = async (id) => {
		try {
			await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`, {
				method: 'DELETE',
			});
			setWords((prevWords) => prevWords.filter((word) => word.id !== id));
		} catch {
			setError('Ошибка при удалении слова');
		}
	};

	return (
		<WordContext.Provider
			value={{
				words,
				loading,
				error,
				addWord,
				updateWord,
				deleteWord,
				fetchWords,
			}}>
			{children}
		</WordContext.Provider>
	);
};

export default WordProvider;
