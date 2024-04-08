import { useEffect, useState } from "react";
import { CustomScale, scores } from './CustomQuestion';
import axios from 'axios';

const CustomAssessment = (props) => {
  const [ assessmentId, setAssessmentId ] = useState();
  const [ assessmentTitles, setAssessmentTitles ] = useState([]);
  const [ displayThreshold, setDisplayThreshold ] = useState(50);
  const [ isScoresSent, setIsScoresSent ] = useState(false);
  const updateGlobalScore = props.onScoresUpdate;

  useEffect(() => {
    GetAssessment(props.assessmentName2);
  }, []);
    // Call backend API to retrieve list of assessments.
  const GetAssessment = async (assessmentName) => {
      try {
          const userId = localStorage.getItem('userId');

          if (!userId) {
            console.error('User ID not found in local storage');
            return;
          }

          const apiUrl = `http://localhost:4000/getAssessment?userId=${userId}&assessmentName=${assessmentName}`;
          const response = await axios.get(apiUrl);

          const entriesArray = JSON.parse(response.data.assessment.assessmentEntries);
          setAssessmentTitles(entriesArray);
          setAssessmentId(response.data.assessment.assessmentId);
          setDisplayThreshold((response.data.assessment.assessmentRatingNum * entriesArray) / 2);
        } catch (error) {
          console.error('Error sending scores:', error);
        }
    };

    const handleSendScores = async (scores) => {

      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in local storage');
          return;
        }

        const apiUrl = `http://localhost:4000/api/scoresCustom/${userId}`;
        const response = await axios.post(apiUrl, { assessmentId: assessmentId, assessmentName: props.assessmentName2, scoreDistribution: scores});

        const sum = scores.reduce((acc, curr) => acc + curr, 0);

        if (sum < displayThreshold) {
          updateGlobalScore(scores, true);
          console.log(`Score of ${sum} fell below display threshold. Display thershold is set to ${sum < displayThreshold}`);
        } else {
          updateGlobalScore(scores, false);
          console.log(`Score of ${sum} did not fall below display threshold. Display thershold is set to ${sum < displayThreshold}`);
        }

        setIsScoresSent(true);
        scrollToPosition();
        // window.location.href = '/MainPage';
      } catch (error) {
        console.error('Error sending scores:', error);
      }
    };

    const scrollToPosition = () => {
      const scrollToTop = 0;

      window.scrollTo({
        top: scrollToTop,
        behavior: 'smooth',
      });
    };

    return(
      <div className='Assessment-Container'>
        {assessmentTitles[0] ? <CustomScale index={0} title={assessmentTitles[0]}></CustomScale> : ''}
        {assessmentTitles[1] ? <CustomScale index={1} title={assessmentTitles[1]}></CustomScale> : ''}
        {assessmentTitles[2] ? <CustomScale index={2} title={assessmentTitles[2]}></CustomScale> : ''}
        {assessmentTitles[3] ? <CustomScale index={3} title={assessmentTitles[3]}></CustomScale> : ''}
        {assessmentTitles[4] ? <CustomScale index={4} title={assessmentTitles[4]}></CustomScale> : ''}
        {assessmentTitles[5] ? <CustomScale index={5} title={assessmentTitles[5]}></CustomScale> : ''}
        {assessmentTitles[6] ? <CustomScale index={6} title={assessmentTitles[6]}></CustomScale> : ''}
        {assessmentTitles[7] ? <CustomScale index={7} title={assessmentTitles[7]}></CustomScale> : ''}
        {assessmentTitles[8] ? <CustomScale index={8} title={assessmentTitles[8]}></CustomScale> : ''}
        {assessmentTitles[9] ? <CustomScale index={9} title={assessmentTitles[9]}></CustomScale> : ''}
        <button className='Assessment-Submit' onClick={() => handleSendScores(scores)}>Submit</button>
      </div>
    );

};

export default CustomAssessment;