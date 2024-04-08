import React, { useEffect, useState } from 'react';

import Navigation from './Navigation';
import Assessment1 from './Assessments/AssessmentTemplates/Assessment1';
import Assessment2 from './Assessments/AssessmentTemplates/Assessment2';
import PopOutWindow from './PopOutWindow';
import ManageAssessments from './ManageAssessments/ManageAssessments';
import Assessments from './Assessments/AssessmentsPage';
import AssessmentSelection from './Assessments/AssessmentSelection';
import History from './History';
import Scores from './Scores';

const MainPage = () => {
  const [displayComponentIndex, setDisplayComponentIndex] = useState(-1);         // Switch between menu components
  const [displayMiscMenuContainer, setDisplayMiscMenuContainer ] = useState({
    display: 'none',
  });

  const handleDisplayComponentIndex = (index) => {
    if (index !== -1) {
      setDisplayComponentIndex(index);
      setDisplayMiscMenuContainer({display: 'block'})
      // console.log(`Now displaying component index (global) ${displayComponentIndex}`);
    } else {
      console.log(`Index below range for handleDisplayComponentIndex()`);
    }
  };

  const handleBackgroundDimClick = () => {
    setDisplayComponentIndex(-1);
    setDisplayMiscMenuContainer({display: 'none'})
  };

  return (
    <div className='MainPage'>

      <Navigation displayComponentIndexFunction={handleDisplayComponentIndex}/>

      <div className='MainPage-Navigation-Bar-Push'></div>

      <div className='MiscPage-Container MiscPage' style={displayMiscMenuContainer}>
        { displayComponentIndex === 0 && <p>Account Settings ( Component In Development 🔧 )</p> }
        { displayComponentIndex === 1 && <Scores/> }
        { displayComponentIndex === 2 && <ManageAssessments/> }
      </div>
      { displayComponentIndex !== -1 && <div className='MiscPage-Background-Dim' onClick={() => handleBackgroundDimClick(-1)}/>}

      <div className='Assessment'>
        <Assessments/>
      </div>

      {/* <img src='/imgs/PsychologyWallpaper.jpg' className="MainPage-Background" draggable='false' alt="background"/> */}
      <div className="MainPage-Background"></div>

    </div>
  );
};

export default MainPage;
