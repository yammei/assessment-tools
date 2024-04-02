import React, { useEffect, useState } from 'react';

import Navigation from './Navigation';
import Assessment from './Assessment';
import Assessment2 from './Assessment2';
import PopOutWindow from './PopOutWindow';
import ManageAssessments from './ManageAssessments/ManageAssessments';
import History from './History';
import Scores from './Scores';

const MainPage = () => {
  const [showAssessment, setShowAssessment] = useState(true);
  const [showPopOutWindow, setShowPopOutWindow] = useState(false);
  const [windowColor, setWindowColor] = useState('rgb(20,20,20)');
  const [displayComponentIndex, setDisplayComponentIndex] = useState(-1);
  const [displayMiscMenuContainer, setDisplayMiscMenuContainer ] = useState({
    display: 'none',
  });
  // Suggestions for Assessment#1
  const popOutWindowTexts = [
    "Assessment 1: Sample suggestion for prompt #1.",
    "Assessment 1: Sample suggestion for prompt #2.",
    "Assessment 1: Sample suggestion for prompt #3.",
    "Assessment 1: Sample suggestion for prompt #4.",
    "Assessment 1: Sample suggestion for prompt #5.",
    "Assessment 1: Sample suggestion for prompt #6.",
    "Assessment 1: Sample suggestion for prompt #7.",
    "Assessment 1: Sample suggestion for prompt #8.",
    "Assessment 1: Sample suggestion for prompt #9.",
    "Assessment 1: Sample suggestion for prompt #10.",
  ];
  // Suggestions for Assessment#2
  const popOutWindowTexts2 = [
    "Assessment 2: Sample suggestion for prompt #1.",
    "Assessment 2: Sample suggestion for prompt #2.",
    "Assessment 2: Sample suggestion for prompt #3.",
    "Assessment 2: Sample suggestion for prompt #4.",
    "Assessment 2: Sample suggestion for prompt #5.",
    "Assessment 2: Sample suggestion for prompt #6.",
    "Assessment 2: Sample suggestion for prompt #7.",
    "Assessment 2: Sample suggestion for prompt #8.",
    "Assessment 2: Sample suggestion for prompt #9.",
    "Assessment 2: Sample suggestion for prompt #10.",
  ];
  var [finalPopOutWindowTexts, setFinalPopOutWindowTexts] = useState([]);


  const switchAssessment = (assessmentClicked) => {
    if (assessmentClicked === 1) {
      setShowAssessment(true);
    }
    if (assessmentClicked === 2) {
      setShowAssessment(false);
    }
  };

  const handleScoresUpdate = (scores, showSuggestions) => {
    if (showSuggestions) {
      const threshold = 2; // Minimum number to suggest tips.
      const newPopOutWindowTexts = popOutWindowTexts.map((text, i) => scores[i] > threshold ? '' : text);
      setFinalPopOutWindowTexts(newPopOutWindowTexts.filter(entry => entry !== ''));
      setWindowColor('rgb(0, 132, 255)');
    }
  };

  const handleScoresUpdate2 = (scores, showSuggestions) => {
    if (showSuggestions) {
      const threshold = 1; // Minimum number to suggest tips.
      const newPopOutWindowTexts = popOutWindowTexts2.map((text, i) => scores[i] > threshold ? '' : text);
      setFinalPopOutWindowTexts(newPopOutWindowTexts.filter(entry => entry !== ''));
      setWindowColor('rgb(52, 26, 170)');
    }
  };

  useEffect(() => {
    setShowPopOutWindow(finalPopOutWindowTexts.length > 0);
    console.log(finalPopOutWindowTexts);
  }, [finalPopOutWindowTexts]);

  const closePopOutWindow = () => {
    setShowPopOutWindow(false);
  };

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
        { displayComponentIndex === 0 && <p>Account Settings</p> }
        { displayComponentIndex === 1 && <Scores/> }
        { displayComponentIndex === 2 && <ManageAssessments/> }
      </div>
      { displayComponentIndex !== -1 && <div className='MiscPage-Background-Dim' onClick={() => handleBackgroundDimClick(-1)}/>}

      {showPopOutWindow ?
      <PopOutWindow title={'Tips & Suggestions'} texts={finalPopOutWindowTexts} windowColor={windowColor} display={'block'} close={closePopOutWindow}/>
      :
      <PopOutWindow title={'Tips & Suggestions'} texts={finalPopOutWindowTexts} display={'none'} close={closePopOutWindow}/>
      }

      <div className='Assessment'>
        <div className='Assessment-Titles'>
          <p className='Assessment-Title' id='Assessment-Title-1' onClick={() => switchAssessment(1)}>Happiness</p>
          <p className='Assessment-Title' id='Assessment-Title-2' onClick={() => switchAssessment(2)}>Social Self-Care</p>
        </div>
        {showAssessment ? <Assessment onScoresUpdate={handleScoresUpdate}/> : <Assessment2 onScoresUpdate={handleScoresUpdate2}/>}
      </div>

      <img src='/imgs/PsychologyWallpaper.jpg' className="MainPage-Background" draggable='false' alt="background"/>

    </div>
  );
};

export default MainPage;
