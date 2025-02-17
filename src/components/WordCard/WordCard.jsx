import React, { useState } from 'react';
import './WordCard.css';

const WordCard = ({ english, russian, transcription }) => {
	const [showTranslation, setShowTranslation] = useState(false);

	return (
		<div className='word-card'>
			<h2>{english}</h2>
			<p className='transcription'>[{transcription}]</p>
			<div
				className={`translation-container ${
					showTranslation ? 'show-translation' : ''
				}`}>
				<p className='translation'>{russian}</p>
			</div>
			<button
				className='toggle-translation'
				onClick={() => setShowTranslation(!showTranslation)}>
				{showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
			</button>
		</div>
	);
};

export default WordCard;
