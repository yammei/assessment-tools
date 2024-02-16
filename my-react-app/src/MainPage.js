import React, { useState } from 'react';
import Scores from './Scores';
import Logout from './Logout';
import Assessment from './Assessment';
import Assessment2 from './Assessment2';

const MainPage = () => {
  const [showAssessment, setShowAssessment] = useState(true);

  const switchAssessment = (assessmentClicked) => {
    if (assessmentClicked === 1) {
      setShowAssessment(true);
    }
    if (assessmentClicked === 2) {
      setShowAssessment(false);
    }
  };

  return (
    <div className='MainPage'>

      <div className='MainPage-Navigation-Bar'>
        <img src='/imgs/MindMenderBlack.png' className="MainPage-Navigation-Logo" draggable='false' alt="logo"/>
        <Scores/>
        <Logout/>
      </div>
      <div className='MainPage-Navigation-Bar-Push'></div>

      <div className='Assessment'>
        <div className='Assessment-Titles'>
          <p className='Assessment-Title' id='Assessment-Title-1' onClick={() => switchAssessment(1)}>Happiness Assessment</p>
          <p className='Assessment-Title' id='Assessment-Title-2' onClick={() => switchAssessment(2)}>Social Self-Care</p>
        </div>
        {showAssessment ? <Assessment/> : <Assessment2/>}
      </div>

      <img src='/imgs/PsychologyWallpaper.jpg' className="MainPage-Background" draggable='false' alt="background"/>

    </div>
  );
};

export default MainPage;
