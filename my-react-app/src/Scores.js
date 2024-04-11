import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import History from './History';
import LineGraph from './LineGraph';

const Scores = ({ userId, isLoggedIn }) => {
  const [ scores, setScores ] = useState([]);
  const [ scores2, setScores2 ] = useState([]);
  const [ username, setUsername ] = useState('');
  const [ customScores, setCustomScores ] = useState([]);
  const [ assessmentNames, setAssessmentNames ] = useState([]);
  const [ assessmentTotalScore, setAssessmentTotalScore ] = useState([]);

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

    const multiplyArrays = (array1, array2) => {
      if (array1.length !== array2.length) {
        throw new Error('Arrays must have the same length');
      }
      const result = [];
      for (let i = 0; i < array1.length; i++) {
        result.push(array1[i] * array2[i]);
      }
      return result;
    }

    const fetchCustomAssessmentScores = async () => {
      try {
        const apiUrl = `http://localhost:4000/getAssessmentNames?userId=${storedUserId}`;
        const response = await axios.get(apiUrl);
        const customAssessmentIds = response.data.assessments.map(assessment => parseInt(assessment.assessmentId));
        setCustomScores(customAssessmentIds);
        const customAssessmentNames = response.data.assessments.map(assessment => parseInt(assessment.assessmentNames));
        setAssessmentNames(customAssessmentNames);

        const apiUrl2 = `http://localhost:4000/getAssessment2?userId=${storedUserId}`;
        const response2 = await axios.get(apiUrl2);
        const customAssessmentRating = response2.data.assessments.map(assessment => parseInt(assessment.assessmentRating * assessment.assessmentEntries.length));
        console.log(customAssessmentRating);
        setAssessmentTotalScore("haweraewr", customAssessmentRating);

        const newCustomScores = [];
        for (let i = 0; i < customAssessmentIds.length; i++) {
          console.log(customAssessmentIds[i]);
          const response = await axios.get(`http://localhost:4000/getScoreCustom/${storedUserId}/${customAssessmentIds[i]}`);
          newCustomScores.push(response.data.score);
        }
        setCustomScores(newCustomScores);
        console.log("hey", newCustomScores);
      } catch (error) {
        console.error('Error fetching custom assessment scores:', error);
      }
    };

    if (storedUserId) {
      fetchScores();
      fetchCustomAssessmentScores();
    }
  }, []);

  return (
    <ScoresContainer>
      <ScoresContent>

        <ScoresContentPart1>

          <TextContainer>
            <p className='Scores-User'>Your Scores</p>
            <ScoreContentVerticalDivider/>

            {scores.map((score, index) => (
              <p key={index}>Happiness: {score}<span className='Scores-Fraction-Text'  style={{fontSize: '11pt'}}> of 50</span></p>
            ))}

            {scores2.map((score, index) => (
              <p key={index}>Social Self Care: {score}<span className='Scores-Fraction-Text' style={{fontSize: '11pt'}}> of 30</span></p>
            ))}

            {/* <p>{assessmentNames[0]}: <b>{customScores[0]}</b><span className='Scores-Fraction-Text'  style={{fontSize: '11pt'}}> of {assessmentTotalScore[0]}</span></p> */}
          </TextContainer>

        </ScoresContentPart1>


        <ScoresContentPart2>
          <TextContainer>
            <p>Assessment Score History</p>
            <ScoreContentVerticalDivider/>
          </TextContainer>
          <HistoryContainer><History/></HistoryContainer>
        </ScoresContentPart2>

      </ScoresContent>
    </ScoresContainer>
  );
};

export default Scores;

const ScoresContainer  = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px;
  /* border: 3px dashed rgb(200, 200, 200); */
`;

const ScoresContent  = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  margin: auto;
`;

const ScoresContentPart1 = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 600px;
  margin: 20px auto;
  /* background-color: red; */
  border: 3px dashed rgb(200, 200, 200);
  p {
    margin: 5px;
  }
`;

const TextContainer = styled.div`
    height: fit-content;
    width: 500px;
    margin: auto;
    padding: 20px 0px;
`;

const ScoresContentPart2 = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 600px;
  margin: 20px auto;
  /* background-color: red; */
  border: 3px dashed rgb(200, 200, 200);
`;

const HistoryContainer = styled.div`
    height: fit-content;
    width: fit-content;
    scale: .8;
    margin: auto;
`;

const ScoreContentVerticalDivider = styled.div`
    /* flex: 1; */
    height: 1px;
    width: 500px;
    margin: 0px auto;
    background-color: rgb(200, 200, 200);
    /* background-color: red; */
`;
