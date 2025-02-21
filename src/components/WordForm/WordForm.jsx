import React, { useState } from 'react';
import './WordForm.css';

const WordForm = ({ onAdd }) => {
	const [newEnglish, setNewEnglish] = useState('');
	const [newRussian, setNewRussian] = useState('');

	const handleAdd = () => {
		if (newEnglish.trim() && newRussian.trim()) {
			onAdd({ english: newEnglish, russian: newRussian });
			setNewEnglish('');
			setNewRussian('');
		}
	};

	return (
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
				className={!newEnglish.trim() || !newRussian.trim() ? 'disabled' : ''}>
				Добавить слово
			</button>
		</div>
	);
};

export default WordForm;
