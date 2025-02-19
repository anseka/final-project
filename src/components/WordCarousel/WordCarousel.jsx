import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WordCard from '../WordCard/WordCard';
import './WordCarousel.css';

const WordCarousel = ({
	words,
	initialIndex = 0,
	onLearnedWord,
	learnedWords,
}) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const [animationState, setAnimationState] = useState('show');

	const handleNext = () => {
		setAnimationState('hide');
		setTimeout(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex < words.length - 1 ? prevIndex + 1 : 0
			);
			setAnimationState('show');
		}, 500);
	};

	const handlePrevious = () => {
		setAnimationState('hide');
		setTimeout(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex > 0 ? prevIndex - 1 : words.length - 1
			);
			setAnimationState('show');
		}, 500);
	};

	if (words.length === 0) {
		return <p>Нет доступных слов.</p>;
	}

	return (
		<div className='word-carousel'>
			<div className='card-container'>
				<div className={`card ${animationState}`}>
					<WordCard
						wordId={words[currentIndex].id}
						english={words[currentIndex].english}
						russian={words[currentIndex].russian}
						transcription={words[currentIndex].transcription || 'N/A'}
						onLearnedWord={onLearnedWord}
						learnedWords={learnedWords}
					/>
				</div>
				<div className='navigation-buttons'>
					<button onClick={handlePrevious} className='nav-btn'>
						&#129044;
					</button>
					<button onClick={handleNext} className='nav-btn'>
						&#129046;
					</button>
				</div>
			</div>
		</div>
	);
};

WordCarousel.propTypes = {
	words: PropTypes.array.isRequired,
	initialIndex: PropTypes.number,
	onLearnedWord: PropTypes.func.isRequired,
	learnedWords: PropTypes.instanceOf(Set).isRequired,
};

export default WordCarousel;
