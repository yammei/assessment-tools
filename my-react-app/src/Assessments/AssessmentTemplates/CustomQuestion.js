import React, { useState } from 'react';

let scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const CustomScale = (props) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
    scores[props.index] = rating;
    scrollToPosition();
  };

  const scrollToPosition = () => {
    const scrollOffset = 125;

    window.scrollTo({
      top: window.scrollY + scrollOffset,
      behavior: 'smooth',
    });
  };

  const ratingScale = Array.from({ length: props.ratingNum }, (_, index) => index + 1);

  return (
    <div className='Question-Container'>
      <p className='Question-Text'>{props.title}</p>
      <div className='Rating-Container'>
        <p className='Question-Rating-Key'>Disagree</p>
        {ratingScale.map((rating) => (
          <button
            className='Question-Rating-Button'
            key={rating}
            onClick={() => handleRatingClick(rating)}
            disabled={selectedRating !== null && selectedRating !== rating}
            style={{
              color: selectedRating === rating ? 'rgba(235,235,235,1)' : 'rgba(20,20,20,.5)',
              fontWeight: selectedRating === rating ? 'bold' : 'normal',
              border: selectedRating === rating ? '4px solid rgb(0, 132, 255)' : '',
              backgroundColor: selectedRating === rating ? 'rgb(0, 132, 255)' : 'rgba(200,200,200, 0)'
            }}
          >
            {rating}
          </button>
        ))}
        <p className='Question-Rating-Key'>Agree</p>
      </div>
    </div>
  );
};

export { CustomScale, scores };
