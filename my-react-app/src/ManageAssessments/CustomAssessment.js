import { useState } from "react";
import axios from 'axios';

const CustomAssessment = (props) => {

    // Call backend API to retrieve list of assessments.
    const GetAssessment = async () => {
        try {
            const userId = localStorage.getItem('userId');

            if (!userId) {
              console.error('User ID not found in local storage');
              return;
            }

            const apiUrl = `http://localhost:4000/getAssessment`;
            const response = await axios.post(apiUrl, { assessmentName: 'happiness', scoreDistribution: scores});

          } catch (error) {
            console.error('Error sending scores:', error);
          }
    };

    return(
        <div>
            <p>Sample Text</p>
        </div>
    );

};

export default CustomAssessment;