import React, { useContext, useState, useEffect } from 'react';
import { WordContext } from '../WordContext/WordContext';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './WordList.css';

const WordList = () => {
	const { words, loading, error, addWord, updateWord, deleteWord } =
		useContext(WordContext);
	const [showLoading, setShowLoading] = useState(true);
	const [editWordId, setEditWordId] = useState(null);
	const [editEnglish, setEditEnglish] = useState('');
	const [editRussian, setEditRussian] = useState('');
	const [newEnglish, setNewEnglish] = useState('');
	const [newRussian, setNewRussian] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

	useEffect(() => {
		if (!loading) {
			const timer = setTimeout(() => {
				setShowLoading(false);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [loading]);

	if (showLoading) return <LoadingSpinner />;
	if (error) return <ErrorMessage message={error} />;

	const handleEdit = (word) => {
		setEditWordId(word.id);
		setEditEnglish(word.english);
		setEditRussian(word.russian);
		setHasErrors(false);
	};

	const handleSave = (id) => {
		if (!editEnglish.trim() || !editRussian.trim()) {
			setHasErrors(true);
			return;
		}
		updateWord(id, { id, english: editEnglish, russian: editRussian });
		setEditWordId(null);
		setHasErrors(false);
	};

	const handleAdd = () => {
		if (!newEnglish.trim() || !newRussian.trim()) return;
		addWord({ id: Date.now(), english: newEnglish, russian: newRussian });
		setNewEnglish('');
		setNewRussian('');
	};

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
											<button
												className='cancel-btn'
												onClick={() => {
													setEditWordId(null);
													setHasErrors(false);
												}}>
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
												onClick={() => {
													if (window.confirm('Вы уверены?')) {
														deleteWord(word.id);
													}
												}}>
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
