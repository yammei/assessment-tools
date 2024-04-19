import { useEffect, useState } from "react";
import { CustomScale, scores } from './CustomQuestion';
import axios from 'axios';

const CustomAssessment = (props) => {
  const [ assessmentId, setAssessmentId ] = useState();
  const [ assessmentTitles, setAssessmentTitles ] = useState([]);
  const [ assessmentRatingNum, setAssessmentRatingNum ] = useState(0);
  const [ displayThreshold, setDisplayThreshold ] = useState(50);
  const [ isScoresSent, setIsScoresSent ] = useState(false);
  const updateGlobalScore = props.onScoresUpdate;

  useEffect(() => {
    const userName = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    getAssessment(userId, props.assessmentName2);
    // getAssessmentRatingNum(userId);
  }, []);

  const getAssessmentRatingNum = async (userId) => {
    // Retrieve assessment scores
    const apiUrl = `http://localhost:4000/getAssessmentNames?userId=${userId}`;
    const response = await axios.get(apiUrl);

    // Check if response.data.assessments exists and is an array
    if (response.data && Array.isArray(response.data.assessments)) {
      console.log(assessmentId);
      const assessment = response.data.assessments.find(item => item.assessmentId === assessmentId);

      if (assessment) {
        const assessmentRatingNum = assessment.assessmentRatingNum;
        console.log("Assessment ID:", assessmentId, "Assessment Rating Number:", assessmentRatingNum);
        setAssessmentRatingNum(assessmentRatingNum);
      } else {
        console.error("Assessment with ID", assessmentId, "not found.");
      }

  };
}

    // Call backend API to retrieve list of assessments.
  const getAssessment = async (userId, assessmentName) => {
    try {

      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      const apiUrl = `http://localhost:4000/getAssessment?userId=${userId}&assessmentName=${assessmentName}`;
      const response = await axios.get(apiUrl);

      const entriesTitles= JSON.parse(response.data.assessment.assessmentEntries);
      const entriesIds = JSON.parse(response.data.assessment.assessmentId);
      const entriesRatingNum = JSON.parse(response.data.assessment.assessmentRatingNum);
      console.log("Response Data", response)
      setAssessmentTitles(entriesTitles);
      setAssessmentId(entriesIds);
      setAssessmentRatingNum(entriesRatingNum);
      setDisplayThreshold((response.data.assessment.assessmentRatingNum * entriesTitles) / 2);
      console.log(entriesTitles, entriesIds, entriesRatingNum);

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
        {assessmentTitles[0] ? <CustomScale index={0} title={assessmentTitles[0]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        {assessmentTitles[1] ? <CustomScale index={1} title={assessmentTitles[1]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        {assessmentTitles[2] ? <CustomScale index={2} title={assessmentTitles[2]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        {assessmentTitles[3] ? <CustomScale index={3} title={assessmentTitles[3]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        {assessmentTitles[4] ? <CustomScale index={4} title={assessmentTitles[4]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        {assessmentTitles[5] ? <CustomScale index={5} title={assessmentTitles[5]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        {assessmentTitles[6] ? <CustomScale index={6} title={assessmentTitles[6]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        {assessmentTitles[7] ? <CustomScale index={7} title={assessmentTitles[7]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        {assessmentTitles[8] ? <CustomScale index={8} title={assessmentTitles[8]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        {assessmentTitles[9] ? <CustomScale index={9} title={assessmentTitles[9]} ratingNum={assessmentRatingNum}></CustomScale> : ''}
        <button className='Assessment-Submit' onClick={() => handleSendScores(scores)}>Submit</button>
      </div>
    );

};

export default CustomAssessment;