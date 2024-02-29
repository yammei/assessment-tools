import React, { useState } from 'react';
let scores=[0,0,0,0,0,0,0,0,0,0];
const SocialSelfCareScale = (props) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
    scores[props.index]=rating;
    console.log(scores);

  };


  return (
    <div className='Question-Container'>
      <p className='Question-Text'>{props.title}</p>
      <div className='Rating-Container'>
        <p className='Question-Rating-Key'>Disagree</p>
      {[1, 2, 3].map((rating) => (
        <button
          className='Question-Rating-Button'
          id='Question-Rating-Button-2'
          key={rating}
          onClick={() => handleRatingClick(rating)}
          disabled={selectedRating !== null && selectedRating !== rating}
          style={{
            color: selectedRating === rating ? 'rgba(235,235,235,1)' : 'rgba(20,20,20,.5)',
            fontWeight: selectedRating === rating ? 'bold' : 'normal',
            border: selectedRating === rating ? '4px solid rgb(52, 26, 170)' : '',
            backgroundColor: selectedRating === rating ? 'rgb(52, 26, 170)' : 'rgba(200,200,200, 0)'          }}
        >
            {rating}
          </button>
        ))}
        <p className='Question-Rating-Key'>Agree</p>
      </div>
    </div>
  );
};
export { SocialSelfCareScale, scores };
