import React, { useState, useEffect } from 'react';
import './WordList.css';

const WordList = () => {
	const [words, setWords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editWordId, setEditWordId] = useState(null);
	const [editEnglish, setEditEnglish] = useState('');
	const [editRussian, setEditRussian] = useState('');
	const [originalWord, setOriginalWord] = useState(null);
	const [hasErrors, setHasErrors] = useState(false);
	const [newEnglish, setNewEnglish] = useState('');
	const [newRussian, setNewRussian] = useState('');

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

	const handleEdit = (word) => {
		setEditWordId(word.id);
		setEditEnglish(word.english);
		setEditRussian(word.russian);
		setOriginalWord(word);
		setHasErrors(false);
	};

	const handleSave = (id) => {
		if (!editEnglish.trim() || !editRussian.trim()) {
			setHasErrors(true);
			return;
		}
		console.log('Сохранено:', {
			id,
			english: editEnglish,
			russian: editRussian,
		});
		setWords(
			words.map((word) =>
				word.id === id
					? { ...word, english: editEnglish, russian: editRussian }
					: word
			)
		);
		setEditWordId(null);
		setHasErrors(false);
	};

	const handleCancel = () => {
		setEditWordId(null);
		setEditEnglish(originalWord.english);
		setEditRussian(originalWord.russian);
		setHasErrors(false);
	};

	const handleDelete = (id) => {
		setWords((prevWords) => {
			const updatedWords = prevWords.filter((word) => word.id !== id);
			return updatedWords;
		});
	};

	const handleAdd = () => {
		if (!newEnglish.trim() || !newRussian.trim()) return;
		const newWord = {
			id: Date.now(),
			english: newEnglish,
			russian: newRussian,
		};
		setWords([...words, newWord]);
		setNewEnglish('');
		setNewRussian('');
	};

	if (loading) return <p>Загрузка...</p>;
	if (error || words.length === 0)
		return <p className='no-words-message'>Доступных слов нет.</p>;

	return (
		<div>
			<div className='add-word-form'>
				<input
					type='text'
					placeholder='Новое слово'
					value={newEnglish}
					onChange={(e) => setNewEnglish(e.target.value)}
					className={!newEnglish.trim() ? 'error' : ''}
				/>
				<input
					type='text'
					placeholder='Перевод'
					value={newRussian}
					onChange={(e) => setNewRussian(e.target.value)}
					className={!newRussian.trim() ? 'error' : ''}
				/>
				<button
					onClick={handleAdd}
					disabled={!newEnglish.trim() || !newRussian.trim()}
					className={
						!newEnglish.trim() || !newRussian.trim() ? 'disabled' : ''
					}>
					Добавить слово
				</button>
			</div>
			{words.length === 0 ? (
				<p className='no-words-message'>Доступных слов нет.</p>
			) : (
				<table className='word-table'>
					<thead>
						<tr>
							<th>Слово</th>
							<th>Перевод</th>
							<th>Действие</th>
						</tr>
					</thead>
					<tbody>
						{words.map((word) => (
							<tr key={word.id}>
								<td>
									{editWordId === word.id ? (
										<input
											type='text'
											value={editEnglish}
											onChange={(e) => setEditEnglish(e.target.value)}
											className={
												hasErrors && !editEnglish.trim() ? 'error' : ''
											}
										/>
									) : (
										word.english
									)}
								</td>
								<td>
									{editWordId === word.id ? (
										<input
											type='text'
											value={editRussian}
											onChange={(e) => setEditRussian(e.target.value)}
											className={
												hasErrors && !editRussian.trim() ? 'error' : ''
											}
										/>
									) : (
										word.russian
									)}
								</td>
								<td>
									{editWordId === word.id ? (
										<>
											<button
												className={
													!editEnglish.trim() || !editRussian.trim()
														? 'disabled'
														: ''
												}
												onClick={() => handleSave(word.id)}
												disabled={!editEnglish.trim() || !editRussian.trim()}>
												Сохранить
											</button>
											<button className='cancel-btn' onClick={handleCancel}>
												Отмена
											</button>
										</>
									) : (
										<>
											<button
												className='edit-btn'
												onClick={() => handleEdit(word)}>
												Редактировать
											</button>
											<button
												className='delete-btn'
												onClick={() => handleDelete(word.id)}>
												Удалить
											</button>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{hasErrors && (
				<p className='error-message'>Ошибка: заполните все поля!</p>
			)}
		</div>
	);
};

export default WordList;
