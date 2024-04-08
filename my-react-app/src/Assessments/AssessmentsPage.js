import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Assessment1 from './AssessmentTemplates/Assessment1';
import Assessment2 from './AssessmentTemplates/Assessment2';
import CustomAssessment from './AssessmentTemplates/CustomAssessment';

import AssessmentSelection from './AssessmentSelection';
import PopOutWindow from '../PopOutWindow';

const Assessments = (props) => {
    const [ assessmentNames, setAssessmentNames ] = useState([]);
    const [ displayAssessmentIndex, setDisplayAssessmentIndex ] = useState(-1);       // Switch between assessments
    const [ showPopOutWindow, setShowPopOutWindow ] = useState(false);
    const [ windowColor, setWindowColor ] = useState('rgb(20,20,20)');
    const popOutWindowTexts = [
        "Q1: Try incorporating mindfulness practices into your daily routine, such as meditation or gratitude journaling.",
        "Q2: Consider seeking support from friends, family, or a professional counselor to develop healthy coping mechanisms",
        "Q3: Practice self-care activities that boost self-esteem, such as engaging in hobbies you enjoy, setting achievable goals, and practicing self-compassion",
        "Q4: Explore relaxation techniques such as deep breathing exercises, progressive muscle relaxation, or spending time in nature to reduce stress",
        "Q5: Establish a consistent sleep schedule, create a relaxing bedtime routine, and limit screen time before bed to improve sleep quality",
        "Q6: Prioritize open communication, quality time spent together, and active listening in your relationships to foster deeper connections and satisfaction",
        "Q7: Focus on maintaining a balanced diet, engaging in regular physical activity, and practicing good hygiene habits ",
        "Q8: Minimize distractions, break tasks into smaller, manageable steps, and consider using productivity techniques like the Pomodoro Technique to enhance focus and concentration",
        "Q9: Take time to evaluate your options, weigh the potential outcomes, and seek advice from trusted sources",
        "Q10: Prioritize tasks, manage your time effectively, and delegate responsibilities when possible to meet your obligations",
      ];
      // Suggestions for Assessment#2
      const popOutWindowTexts2 = [
        "1. Host a weekly game night or dinner party with close friends.",
        "2. Schedule regular video calls or send thoughtful letters to distant loved ones. ",
        "3. Join a discussion group or attend events related to your interests.",
        "4. Attend meetups, workshops, or social events in your community.",
        "5. Plan a weekend getaway or a cozy night in with your partner or family.",
        "6. Reach out to friends or family members for advice or support when necessary.",
        "7. Organize outdoor adventures, movie nights, or cooking sessions with friends.",
        "8. Set aside time for romantic dates or heartfelt conversations with your partner.",
        "9. Arrange reunions or catch-ups with old friends through virtual or in-person meetups.",
        "10. Reflect on your efforts to maintain social connections and adjust as needed to prioritize self-care in this aspect of your life.",
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
    const handleScoresUpdateCustom = (scores, showSuggestions) => {
        if (showSuggestions) {
        //   const threshold = 1; // Minimum number to suggest tips.
        //   const newPopOutWindowTexts = popOutWindowTexts2.map((text, i) => scores[i] > threshold ? '' : text);
        //   setFinalPopOutWindowTexts(newPopOutWindowTexts.filter(entry => entry !== ''));
        //   setWindowColor('rgb(52, 26, 170)');
        }
    };

    useEffect(() => {
        setShowPopOutWindow(finalPopOutWindowTexts.length > 0);
        console.log(finalPopOutWindowTexts);
      }, [finalPopOutWindowTexts]);

      const closePopOutWindow = () => {
        setShowPopOutWindow(false);
    };

    useEffect(() => {
        getCustomAssessmentNames();
    }, []);

    const getCustomAssessmentNames = async () => {
        const userId = localStorage.getItem('userId');
        const apiUrl = `http://localhost:4000/getAssessmentNames?userId=${userId}`;
        const response = await axios.get(apiUrl);
        console.log(response.data.assessments.assessmentName);
        const assessmentNamesCopy = response.data.assessments.map(assessment => assessment.assessmentName);

        setAssessmentNames(assessmentNamesCopy);
        console.log(assessmentNamesCopy);
    };

    return(
        <AssessmentsComponentContainer>

            {showPopOutWindow ?
                <PopOutWindow title={'Tips & Suggestions'} texts={finalPopOutWindowTexts} windowColor={windowColor} display={'block'} close={closePopOutWindow}/>
                :
                <PopOutWindow title={'Tips & Suggestions'} texts={finalPopOutWindowTexts} display={'none'} close={closePopOutWindow}/>
            }

            <AssessmentSelectionContainer>
                <AssessmentSelection title="Happiness"              index={0} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                <AssessmentSelection title="Social Self-Care"       index={1} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                { assessmentNames[0] ? <AssessmentSelection title={assessmentNames[0]} index={2} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/> : ''}
                { assessmentNames[1] ? <AssessmentSelection title={assessmentNames[1]} index={3} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/> : ''}
                { assessmentNames[2] ? <AssessmentSelection title={assessmentNames[2]} index={4} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/> : ''}
                { assessmentNames[3] ? <AssessmentSelection title={assessmentNames[3]} index={5} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/> : ''}
                { assessmentNames[4] ? <AssessmentSelection title={assessmentNames[4]} index={6} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/> : ''}
            </AssessmentSelectionContainer>

            <AssessmentSectionContainer>
                { displayAssessmentIndex === 0 && <Assessment1 onScoresUpdate={handleScoresUpdate}/>}
                { displayAssessmentIndex === 1 && <Assessment2 onScoresUpdate={handleScoresUpdate2}/>}
                { displayAssessmentIndex === 2 && <CustomAssessment assessmentName2={assessmentNames[0]} onScoresUpdate={handleScoresUpdateCustom}/>}
                { displayAssessmentIndex === 3 && <CustomAssessment assessmentName2={assessmentNames[1]} onScoresUpdate={handleScoresUpdateCustom}/>}
                { displayAssessmentIndex === 4 && <CustomAssessment assessmentName2={assessmentNames[2]} onScoresUpdate={handleScoresUpdateCustom}/>}
                { displayAssessmentIndex === 5 && <CustomAssessment assessmentName2={assessmentNames[3]} onScoresUpdate={handleScoresUpdateCustom}/>}
                { displayAssessmentIndex === 6 && <CustomAssessment assessmentName2={assessmentNames[4]} onScoresUpdate={handleScoresUpdateCustom}/>}

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
    flex-wrap: wrap;
    width: 1000px;

`;

const AssessmentSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default Assessments;