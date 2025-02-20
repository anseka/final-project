import React, { useState, useEffect, useRef } from 'react';
import './WordCard.css';

const WordCard = ({
	english,
	russian,
	transcription,
	onLearnedWord,
	wordId,
	learnedWords = new Set(),
}) => {
	const [showTranslation, setShowTranslation] = useState(false);
	const buttonRef = useRef(null);

	useEffect(() => {
		setShowTranslation(false);
		setTimeout(() => {
			if (buttonRef.current) {
				buttonRef.current.focus();
			}
		}, 100);
	}, [wordId]);

	const handleToggleTranslation = () => {
		setShowTranslation((prev) => !prev);
		if (onLearnedWord && !learnedWords.has(wordId)) {
			onLearnedWord(wordId);
		}
	};

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
				ref={buttonRef}
				className='toggle-translation'
				onClick={handleToggleTranslation}>
				{showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
			</button>
		</div>
	);
};

export default WordCard;
