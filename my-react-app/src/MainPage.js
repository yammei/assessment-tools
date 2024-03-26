import React, { useEffect, useState } from 'react';
import Scores from './Scores';
import Logout from './Logout';
import Assessment from './Assessment';
import Assessment2 from './Assessment2';
import History from './History';
import PopOutWindow from './PopOutWindow';

const MainPage = () => {
  const [showAssessment, setShowAssessment] = useState(true);
  const [showPopOutWindow, setShowPopOutWindow] = useState(false);
  const [windowColor, setWindowColor] = useState('rgb(20,20,20)');
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

  return (
    <div className='MainPage'>

      <div className='MainPage-Navigation-Bar'>
        <img src='/imgs/MindMender.png' className="MainPage-Navigation-Logo" draggable='false' alt="logo"/>
        <Scores/>
        <History/>
        <Logout/>
      </div>
      <div className='MainPage-Navigation-Bar-Background'/>


      <div className='MainPage-Navigation-Bar-Push'></div>

      {showPopOutWindow ?
      <PopOutWindow title={'Tips & Suggestions'} texts={finalPopOutWindowTexts} windowColor={windowColor} display={'block'} close={closePopOutWindow}/>
      :
      <PopOutWindow title={'Tips & Suggestions'} texts={finalPopOutWindowTexts} display={'none'} close={closePopOutWindow}/>
      }

      <div className='Assessment'>
        <div className='Assessment-Titles'>
          <p className='Assessment-Title' id='Assessment-Title-1' onClick={() => switchAssessment(1)}>Happiness Assessment</p>
          <p className='Assessment-Title' id='Assessment-Title-2' onClick={() => switchAssessment(2)}>Social Self-Care</p>
        </div>
        {showAssessment ? <Assessment onScoresUpdate={handleScoresUpdate}/> : <Assessment2 onScoresUpdate={handleScoresUpdate2}/>}
      </div>

      <img src='/imgs/PsychologyWallpaper.jpg' className="MainPage-Background" draggable='false' alt="background"/>

    </div>
  );
};

export default MainPage;
