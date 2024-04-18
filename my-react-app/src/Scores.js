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
      console.log("fetchCustomAssessmentScores() reached.");
      try {
        // Retrieve assessment name, ID, and rating
        const apiUrl = `http://localhost:4000/getAssessmentNames?userId=${storedUserId}`;
        const response = await axios.get(apiUrl);
        const customAssessmentIds = response.data.assessments.map(assessment => parseInt(assessment.assessmentId));
        const customAssessmentNames = response.data.assessments.map(assessment => assessment.assessmentName);
        const customAssessmentRatingModded = response.data.assessments.map(assessment => parseInt(assessment.assessmentRatingNum)*10);
        console.log("Response 1:", response);
        console.log("Response 1 (Processed):", customAssessmentRatingModded);
        setAssessmentNames(customAssessmentNames);
        setAssessmentTotalScore(customAssessmentRatingModded);


        // Retrieve assessment scores
        const apiUrl2 = `http://localhost:4000/getScoreCustom/${storedUserId}/${customAssessmentIds}`;
        const response2 = await axios.get(apiUrl2);
        const customAssessmentScores = response2.data.map(item => item.score);
        console.log("Response 2:", response2);
        console.log("Response 2 (Processed):", customAssessmentScores);
        setCustomScores(customAssessmentScores);

        // const newCustomScores = [];
        // for (let i = 0; i < customAssessmentIds.length; i++) {
        //   console.log(customAssessmentIds[i]);
        //   const response = await axios.get(`http://localhost:4000/getScoreCustom/${storedUserId}/${customAssessmentIds[i]}`);
        //   newCustomScores.push(response.data.score);
        // }
        // setCustomScores(newCustomScores);
        // console.log("hey", newCustomScores);
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
            <SectionTitleContainer>
              <p className='Scores-User'>Your Scores</p>
              <ScoreContentVerticalDivider/>
            </SectionTitleContainer>
            <p className='Info-Text'>Your current and available assessment scores.</p>


            {scores.map((score, index) => (
              <p key={index}>Happiness: {score}<span className='Scores-Fraction-Text'  style={{fontSize: '11pt'}}> of 50</span></p>
            ))}

            {scores2.map((score, index) => (
              <p key={index}>Social Self Care: {score}<span className='Scores-Fraction-Text' style={{fontSize: '11pt'}}> of 30</span></p>
            ))}

            <p>{assessmentNames[0]}: {customScores[0]}<span className='Scores-Fraction-Text'  style={{fontSize: '11pt'}}> of {assessmentTotalScore[0]}</span></p>
            <p>{assessmentNames[1]}: {customScores[1]}<span className='Scores-Fraction-Text'  style={{fontSize: '11pt'}}> of {assessmentTotalScore[1]}</span></p>

            {/* <p>hi lol these are the total score possible: {assessmentTotalScore[1]}</p> */}
          </TextContainer>

        </ScoresContentPart1>


        <ScoresContentPart2>
          <TextContainer>
            <SectionTitleContainer>
              <p className='Scores-User'>Assessment History</p>
              <ScoreContentVerticalDivider/>
            </SectionTitleContainer>
            <p className='Info-Text'>A historical graph of your past assessment scores.</p>

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
  background-color: rgb(235, 235, 235);
  border-radius: 5px;
  box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.1);
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
  background-color: rgb(235, 235, 235);
  border-radius: 5px;
  box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.1);

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
  margin-top: auto;
  background-color: rgb(200, 200, 200);
  /* background-color: red; */
`;

const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  width: 100%;
  margin: 0px auto;
  margin-bottom: 10px;
  /* background-color: rgb(255, 226, 226); */
  & p {
    white-space: nowrap;
    margin: auto 0px;
    padding-right: 10px;
  }
`;