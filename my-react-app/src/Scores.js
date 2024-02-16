import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scores = ({ userId, isLoggedIn }) => {
  const [scores, setScores] = useState([]);
  const [scores2, setScores2] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    console.log('Stored UserId:', storedUserId);
    setUsername(storedUsername);

    const fetchScores = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/getscore/${storedUserId}`);
        const response2 = await axios.get(`http://localhost:4000/api/getscore2/${storedUserId}`);
        console.log('Response from getScore API:', response.data);
        console.log('Response from getScore2 API:', response2.data);
        setScores([response.data.score]);
        setScores2([response2.data.score]);  // Check the structure of response2.data
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    if (storedUserId) {
      fetchScores();
    }
  }, []);

  return (
    <div className='Scores-Container'>

      <p className='Scores-User'>{`${username}'s Scores`}</p>

      {scores.map((score, index) => (
        <p key={index}>Happiness: <b>{score}</b><span className='Scores-Fraction-Text'> of 50</span></p>
      ))}

      {scores2.map((score, index) => (
        <p key={index}>Social Self Care: <b>{score}</b><span className='Scores-Fraction-Text'> of 30</span></p>
      ))}

    </div>
  );
};

export default Scores;
