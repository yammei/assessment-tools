import React, { useState } from 'react';
import { HappinessScale, scores } from './Question';
import axios from 'axios';

const Assessment = (props) => {

  const updateGlobalScore = props.onScoresUpdate;
  const [isScoresSent, setIsScoresSent] = useState(false);

  const handleSendScores = async (scores) => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      const apiUrl = `http://localhost:4000/api/scores/${userId}`;
      const response = await axios.post(apiUrl, { assessmentName: 'happiness', scoreDistribution: scores});

      updateGlobalScore(scores);
      setIsScoresSent(true);
      scrollToPosition();
      // window.location.href = '/MainPage';
    } catch (error) {
      console.error('Error sending scores:', error);
    }
  };

  const scrollToPosition = () => {
    const scrollToTop = 0;

    window.scrollTo({
      top: scrollToTop,
      behavior: 'smooth',
    });
  };

  return (
      <div className='Assessment-Container'>
        <HappinessScale index={0} title="I've felt happy."> </HappinessScale>
        <HappinessScale index={1} title="I've been able to cope well with the problems that brought me to this app."> </HappinessScale>
        <HappinessScale index={2} title="I've felt good about myself."> </HappinessScale>
        <HappinessScale index={3} title="I've felt relaxed."> </HappinessScale>
        <HappinessScale index={4} title="I've been sleeping well."> </HappinessScale>
        <HappinessScale index={5} title="I've been satisfied with my relationships."> </HappinessScale>
        <HappinessScale index={6} title="I've had healthy habits (ex: diet, exercise, hygiene)"> </HappinessScale>
        <HappinessScale index={7} title="I've been able to focus."> </HappinessScale>
        <HappinessScale index={8} title="I've made good decisions."> </HappinessScale>
        <HappinessScale index={9} title="I've been able to fulfill my obligations (ex: work, school, etc.)"> </HappinessScale>
        <button className='Assessment-Submit' onClick={() => handleSendScores(scores)}>Submit</button>
      </div>
  );
};

export default Assessment;
