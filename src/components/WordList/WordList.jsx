import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { wordStore } from '../../store/WordStore';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import WordForm from '../WordForm/WordForm';
import './WordList.css';

const WordList = observer(() => {
	const [showLoading, setShowLoading] = useState(true);
	const [editWordId, setEditWordId] = useState(null);
	const [editEnglish, setEditEnglish] = useState('');
	const [editRussian, setEditRussian] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

	useEffect(() => {
		wordStore.fetchWords();

		const timer = setTimeout(() => {
			setShowLoading(false);
		}, 1000); // Задержка 1 секунда
		return () => clearTimeout(timer);
	}, []);

	if (wordStore.loading || showLoading) return <LoadingSpinner />;

	if (wordStore.error) return <ErrorMessage message={wordStore.error} />;

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
		wordStore.updateWord(id, {
			id,
			english: editEnglish,
			russian: editRussian,
		});
		setEditWordId(null);
		setHasErrors(false);
	};

	const handleAddWord = (newWord) => {
		wordStore.addWord({ id: Date.now(), ...newWord });
	};

	const handleDelete = (id) => {
		const isConfirmed = window.confirm(
			'Вы уверены, что хотите удалить это слово?'
		);
		if (isConfirmed) {
			wordStore.deleteWord(id);
		}
	};

	return (
		<div>
			<WordForm onAdd={handleAddWord} />
			{wordStore.words.length === 0 ? (
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
						{wordStore.words.map((word) => (
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
												className='save-btn'
												onClick={() => handleSave(word.id)}
												disabled={!editEnglish.trim() || !editRussian.trim()}>
												Сохранить
											</button>
											<button
												className='cancel-btn'
												onClick={() => setEditWordId(null)}>
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
});

export default WordList;
