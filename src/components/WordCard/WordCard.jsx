import React from 'react';
import './WordCard.css';

const WordCard = ({ word, translation }) => {
	return (
		<div className='word-card'>
			<p>
				<strong>{word}</strong> - {translation}
			</p>
		</div>
	);
};

export default WordCard;
