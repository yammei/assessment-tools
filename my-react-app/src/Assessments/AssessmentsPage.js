import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Assessment1 from './AssessmentTemplates/Assessment1';
import Assessment2 from './AssessmentTemplates/Assessment2';

import AssessmentSelection from './AssessmentSelection';
import PopOutWindow from '../PopOutWindow';

const Assessments = (props) => {
    const [displayAssessmentIndex, setDisplayAssessmentIndex] = useState(-1);       // Switch between assessments
    const [showPopOutWindow, setShowPopOutWindow] = useState(false);
    const [windowColor, setWindowColor] = useState('rgb(20,20,20)');
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

    const handleDisplayAssessmentIndex = (index) => {
        if (index !== -1) {
            setDisplayAssessmentIndex(index);
            // console.log(`Now displaying assessment index (global) ${displayAssessmentIndex}`);
        } else {
            console.log(`Index below range for handleDisplayAssessmentIndex()`);
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


    return(
        <AssessmentsComponentContainer>

            {showPopOutWindow ?
                <PopOutWindow title={'Tips & Suggestions'} texts={finalPopOutWindowTexts} windowColor={windowColor} display={'block'} close={closePopOutWindow}/>
                :
                <PopOutWindow title={'Tips & Suggestions'} texts={finalPopOutWindowTexts} display={'none'} close={closePopOutWindow}/>
            }

            <AssessmentSelectionContainer>
                <AssessmentSelection title="Happiness"          index={0} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                <AssessmentSelection title="Social Self-Care"   index={1} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                <AssessmentSelection title="Custom Assessment 1"  index={2} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                <AssessmentSelection title="Custom Assessment 2"  index={3} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                <AssessmentSelection title="Custom Assessment 3"  index={4} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
            </AssessmentSelectionContainer>

            <AssessmentSectionContainer>
                { displayAssessmentIndex === 0 && <Assessment1 onScoresUpdate={handleScoresUpdate}/>}
                { displayAssessmentIndex === 1 && <Assessment2 onScoresUpdate={handleScoresUpdate2}/>}
                { displayAssessmentIndex === 2 && <p>Custom Assessment 1</p>}
                { displayAssessmentIndex === 3 && <p>Custom Assessment 2</p>}
                { displayAssessmentIndex === 4 && <p>Custom Assessment 3</p>}
            </AssessmentSectionContainer>

        </AssessmentsComponentContainer>
    );

};

const AssessmentsComponentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100vw;
    margin: auto;
    & p {
        font-size: 12pt;
        color: rgb(20,20,20);
    }
`;

const AssessmentSelectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 1000px;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const AssessmentSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default Assessments;