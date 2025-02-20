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
			console.log('Отправляю PUT-запрос:', id, updatedWord);

			const response = await fetch(
				`http://itgirlschool.justmakeit.ru/api/words/${id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updatedWord),
				}
			);

			const responseData = await response.json();
			console.log('Ответ сервера:', response.status, responseData);

			if (!response.ok)
				throw new Error(`Ошибка обновления слова: ${responseData.message}`);

			// Обновляем локальный список слов, не запрашивая заново с сервера
			setWords((prevWords) =>
				prevWords.map((word) =>
					word.id === id ? { ...word, ...updatedWord } : word
				)
			);
		} catch (error) {
			console.error(error);
			setError(error.message);
		}
	};

	const deleteWord = async (id) => {
		try {
			console.log('Отправляю DELETE-запрос:', id);
			const response = await fetch(
				`http://itgirlschool.justmakeit.ru/api/words/${id}`,
				{
					method: 'DELETE',
				}
			);

			const responseText = await response.text();
			console.log('Ответ сервера:', response.status, responseText);

			if (!response.ok)
				throw new Error(`Ошибка удаления слова: ${responseText}`);

			// Удаляем слово из локального списка
			setWords((prevWords) => prevWords.filter((word) => word.id !== id));
		} catch (error) {
			console.error(error);
			setError(error.message);
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
