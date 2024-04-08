import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import ExistingAssessmentsRow from './ExistingAssessmentsRow';

const ExistingAssessments = (props) => {

    const [ existingAssessmentsInstances, setExistingAssessmentsInstances ] = useState([]);
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');

    useEffect(() => {
        getAssessmentData();
      }, []);

    const getAssessmentData = async () => {
        const apiUrl = `http://localhost:4000/getAssessmentData?userId=${storedUserId}`;
        const response = await axios.get(apiUrl);
        const assessmentData = response.data.assessments; 
        setExistingAssessmentsInstances(assessmentData);
    };

    const updateAssessment = async () => {
        console.log("updateAssessment()");
  
    };

    const addAssessment = async () => {
        console.log("addAssessment()");
        // Activate "NewAssesssmentForm.js" and pass assessment data to input fields
        // On submission, update previous version of assessment
    };

    const deleteAssessment = async () => {
        console.log("deleteAssessment()");
        // API call to backend to delete assessment entry in userXAssessments
        // Referesh page
    };

    // useEffect(() =>{const meow = 0;}, []);

    return(
        <ExistingAssessmentsContainer>

            <div style={{display: 'flex', flexDirection: 'row', height: '20px', margin: '30px 0px', backgroundColor: ''}}>
                <p style={{fontSize: '12pt', height: 'fit-content', width: 'fit-content', whiteSpace: 'nowrap', marginTop: '0px', marginRight: 'auto', paddingRight: '10px', marginBottom: '10px'}}>
                    My Assessments
                </p>
                <NewAssessmentFormVerticalDivider/>
            </div>

            <ExistingAssessmentsInfo>
                    <ExistingAssessmentsInfoColumnNames>
                        <p style={{width: '100px'}}>Title</p>
                        <NewAssessmentFormColumnNameDivider/>
                        <p style={{width: '150px'}}>Description</p>
                        <NewAssessmentFormColumnNameDivider/>
                        <p style={{width: '50px'}}>Entries</p>
                        <NewAssessmentFormColumnNameDivider />
                        <p style={{width: '50px'}}>Scale</p>
                    </ExistingAssessmentsInfoColumnNames>
                    <NewAssessmentFormColumnNameDivider style={{marginRight: '10px'}}/>
                    <p style={{width: '50px', marginRight: 'auto', marginLeft: '0px', backgroundColor: ''}}>Tools</p>
            </ExistingAssessmentsInfo>

            { 
                existingAssessmentsInstances[0] ?
                <ExistingAssessmentsRow index={0} addAssessment={addAssessment} deleteAssessment={deleteAssessment}/> 
                : 
                '' 
            }

            { 
                existingAssessmentsInstances[1] ?
                <ExistingAssessmentsRow index={1} addAssessment={addAssessment} deleteAssessment={deleteAssessment}/> 
                : 
                '' 
            }

            { 
                existingAssessmentsInstances[2] ?
                <ExistingAssessmentsRow index={2} addAssessment={addAssessment} deleteAssessment={deleteAssessment}/> 
                : 
                '' 
            }

            { 
                existingAssessmentsInstances[3] ?
                <ExistingAssessmentsRow index={3} addAssessment={addAssessment} deleteAssessment={deleteAssessment}/> 
                : 
                '' 
            }

            { 
                existingAssessmentsInstances[4] ?
                <ExistingAssessmentsRow index={4} addAssessment={addAssessment} deleteAssessment={deleteAssessment}/> 
                : 
                '' 
            }
        </ExistingAssessmentsContainer>
    );

};

const ExistingAssessmentsContainer = styled.div`
    height: fit-content;
    width: fit-content;
    margin: 20px auto;
    background-color: rgb(235, 235, 235);
    & p {
        font-size: 10pt;
        color: rgb(20, 20, 20);
        height: 30px;
        width: fit-content;
        margin: auto;
    }
`;

const ExistingAssessmentsInfoColumnNames = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    width: 400px;
    margin-left: auto;
    margin-right: 0px;
    & p {
        font-size: 10pt;
    }
`;

const ExistingAssessmentsInfo = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
    width: 500px;
    margin: auto;
    & p {
        font-size: 10pt;
        text-align: center;
        height: fit-content;
        width: fit-content;
        margin: auto;
    }
`;

const NewAssessmentFormVerticalDivider = styled.div`
    flex: 1;
    height: 1px;
    margin: 0px auto;
    margin-top: auto;
    background-color: rgb(200, 200, 200);
`;

const NewAssessmentFormColumnNameDivider = styled.div`
    height: 20px;
    width: 1px;
    margin: auto 0px;
    background-color: rgb(200, 200, 200);
`;

export default ExistingAssessments;