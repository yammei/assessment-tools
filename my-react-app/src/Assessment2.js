import React, { useState } from 'react';
import { SocialSelfCareScale, scores } from './Question2';
import axios from 'axios';

const Assessment2 = (props) => {
  const [isScoresSent, setIsScoresSent] = useState(false);

  const handleSendScores = async (scores) => {
    try {
      // Retrieve user ID from local storage
      const userId = localStorage.getItem('userId');

      // Check if userId is available
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      // API endpoint for sending scores
      const apiUrl = `http://localhost:4000/api/score2/${userId}`;

      // Send scores along with user ID
      const response = await axios.post(apiUrl, { assessmentName: 'socialselfcare', scoreDistribution: scores});

      console.log('Scores sent successfully:', response.data);
      setIsScoresSent(true);

      window.location.href = '/MainPage';
    } catch (error) {
      console.error('Error sending scores:', error);
    }
  };

    return (
        <div className='Assessment-Container'>
          <SocialSelfCareScale index={0} title="Spend time with people who I like"> </SocialSelfCareScale>
          <SocialSelfCareScale index={1} title="Contact friends and family who are far away"> </SocialSelfCareScale>
          <SocialSelfCareScale index={2} title="Have stimulating conversations"> </SocialSelfCareScale>
          <SocialSelfCareScale index={3} title="Meet new people"> </SocialSelfCareScale>
          <SocialSelfCareScale index={4} title="Spend time alone with my love ones"> </SocialSelfCareScale>
          <SocialSelfCareScale index={5} title="Ask others for help, when needed"> </SocialSelfCareScale>
          <SocialSelfCareScale index={6} title="Do enjoyable activities with other people"> </SocialSelfCareScale>
          <SocialSelfCareScale index={7} title="Have intimate time with love ones"> </SocialSelfCareScale>
          <SocialSelfCareScale index={8} title="Keep in touch with old friends"> </SocialSelfCareScale>
          <SocialSelfCareScale index={9} title="In your opinion, what would you rate your social self-care"> </SocialSelfCareScale>
          <button className='Assessment-Submit' onClick={() => handleSendScores(scores)}>Submit</button>
      </div>
  );
};

export default Assessment2;
