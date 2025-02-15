// src/components/WordList.js
import React, { useState } from 'react';
import './WordList.css';

const WordList = () => {
	const [words, setWords] = useState([
		{ id: 1, word: 'Hello', translation: 'Привет', isEditing: false },
		{ id: 2, word: 'World', translation: 'Мир', isEditing: false },
	]);

	const toggleEdit = (id) => {
		setWords(
			words.map((word) =>
				word.id === id ? { ...word, isEditing: !word.isEditing } : word
			)
		);
	};

	return (
		<table className='word-table'>
			<thead>
				<tr>
					<th>Word</th>
					<th>Translation</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{words.map((item) => (
					<tr key={item.id}>
						<td>
							{item.isEditing ? <input defaultValue={item.word} /> : item.word}
						</td>
						<td>
							{item.isEditing ? (
								<input defaultValue={item.translation} />
							) : (
								item.translation
							)}
						</td>
						<td>
							<button onClick={() => toggleEdit(item.id)}>
								{item.isEditing ? 'Save' : 'Edit'}
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default WordList;
