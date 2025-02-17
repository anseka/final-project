import React, { useState, useEffect } from 'react';
import './WordList.css';

const WordList = () => {
	const [words, setWords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [newEnglish, setNewEnglish] = useState('');
	const [newRussian, setNewRussian] = useState('');
	const [editWordId, setEditWordId] = useState(null);
	const [editEnglish, setEditEnglish] = useState('');
	const [editRussian, setEditRussian] = useState('');

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

	const handleDelete = (id) => {
		setWords(words.filter((word) => word.id !== id));
	};

	const handleAdd = () => {
		if (!newEnglish || !newRussian) return;
		const newWord = {
			id: Date.now(), // Временный ID
			english: newEnglish,
			russian: newRussian,
		};
		setWords([...words, newWord]);
		setNewEnglish('');
		setNewRussian('');
	};

	const handleEdit = (word) => {
		setEditWordId(word.id);
		setEditEnglish(word.english);
		setEditRussian(word.russian);
	};

	const handleSave = (id) => {
		setWords(
			words.map((word) =>
				word.id === id
					? { ...word, english: editEnglish, russian: editRussian }
					: word
			)
		);
		setEditWordId(null);
	};

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div>
			<div className='add-word-form'>
				<input
					type='text'
					placeholder='Слово на английском'
					value={newEnglish}
					onChange={(e) => setNewEnglish(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Перевод'
					value={newRussian}
					onChange={(e) => setNewRussian(e.target.value)}
				/>
				<button onClick={handleAdd}>Добавить</button>
			</div>
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
									/>
								) : (
									word.russian
								)}
							</td>
							<td>
								{editWordId === word.id ? (
									<button
										className='save-btn'
										onClick={() => handleSave(word.id)}>
										Сохранить
									</button>
								) : (
									<button className='edit-btn' onClick={() => handleEdit(word)}>
										Редактировать
									</button>
								)}
								<button
									className='delete-btn'
									onClick={() => handleDelete(word.id)}>
									Удалить
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WordList;
