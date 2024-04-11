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
        console.log("kore9", existingAssessmentsInstances);
    };

    const updateAssessment = async (aID) => {
        console.log("updateAssessment()");
        // Activate "NewAssesssmentForm.js" and pass assessment data to input fields
        props.displayNewAssessmentForm();
        // On submission, update previous version of assessment
        var index = 0;
        for (let i=0; i < existingAssessmentsInstances.length; i++) {
            if (existingAssessmentsInstances[i].assessmentId === aID) {
                // console.log(`Now comparing ${existingAssessmentsInstances[i].assessmentId} and ${aID}`);
                console.log(existingAssessmentsInstances[i]);
                index = i;
            }
        }
        console.log("2", existingAssessmentsInstances[index]);

        props.transferAssessmentDataForUpdate(aID, existingAssessmentsInstances[index]);
    };

    const deleteAssessment = async (aID) => {
        // API call to backend to delete assessment entry in userXAssessments
        console.log("deleteAssessment()", aID);
        const apiUrl = `http://localhost:4000/deleteAssessment/${storedUserId}/${aID}`;
        const response = await axios.delete(apiUrl);
        console.log(response);

        // Referesh page
        window.location.href = '/MainPage'; // Hacky fix. Ideally this would call a global state for only the necessary components that need reloading.
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
                <ExistingAssessmentsRow index={0} updateAssessment={updateAssessment} deleteAssessment={deleteAssessment} aID={existingAssessmentsInstances[0].assessmentId}/>
                :
                ''
            }

            {
                existingAssessmentsInstances[1] ?
                <ExistingAssessmentsRow index={1} updateAssessment={updateAssessment} deleteAssessment={deleteAssessment} aID={existingAssessmentsInstances[1].assessmentId}/>
                :
                ''
            }

            {
                existingAssessmentsInstances[2] ?
                <ExistingAssessmentsRow index={2} updateAssessment={updateAssessment} deleteAssessment={deleteAssessment} aID={existingAssessmentsInstances[2].assessmentId}/>
                :
                ''
            }

            {
                existingAssessmentsInstances[3] ?
                <ExistingAssessmentsRow index={3} updateAssessment={updateAssessment} deleteAssessment={deleteAssessment} aID={existingAssessmentsInstances[3].assessmentId}/>
                :
                ''
            }

            {
                existingAssessmentsInstances[4] ?
                <ExistingAssessmentsRow index={4} updateAssessment={updateAssessment} deleteAssessment={deleteAssessment} aID={existingAssessmentsInstances[4].assessmentId}/>
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