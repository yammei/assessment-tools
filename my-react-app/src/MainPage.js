import React, { useEffect, useState, memo } from 'react';

import Navigation from './Navigation';
import ManageAssessments from './ManageAssessments/ManageAssessments';
import Assessments from './Assessments/AssessmentsPage';
import Scores from './Scores';

const MainPage = memo((props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [invertValue, setInvertValue] = useState('0%');
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

  const toggleDarkMode = () => {
    console.log(`toggleDarkMode Reached`);
    setDarkMode(!darkMode);
    if (invertValue === '0%') {
      for (let i = 0; i <= 100; i += 5) {
        setTimeout(() => {
          setInvertValue(`${i}%`);
        }, 1000);
      }    
    }
    if (invertValue === '100%') {
      for (let i = 100; i >= 0; i -= 5) {
        setTimeout(() => {
          setInvertValue(`${i}%`);
        }, 1000);
      }
    }
  };
  
  return (
      <div className={`MainPage ${darkMode ? "dark-mode" : "light-mode"}`}>

        <Navigation displayComponentIndexFunction={handleDisplayComponentIndex} darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>

        <div className='MainPage-Navigation-Bar-Push'></div>

        <div className='MiscPage-Container MiscPage' style={displayMiscMenuContainer}>
          { displayComponentIndex === 0 && <p>Account Settings ( Component In Development 🔧 )</p> }
          { displayComponentIndex === 1 && <Scores/> }
          { displayComponentIndex === 2 && <ManageAssessments/> }
        </div>
        { displayComponentIndex !== -1 && <div className='MiscPage-Background-Dim' onClick={() => handleBackgroundDimClick()}/>}

        <div className='Assessment'>
          <Assessments/>
        </div>

        {/* <img src='/imgs/PsychologyWallpaper.jpg' className="MainPage-Background" draggable='false' alt="background"/> */}
        <div className="MainPage-Background"></div>

      </div>
  );
});

export default memo(MainPage);
