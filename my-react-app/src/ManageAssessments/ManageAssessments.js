import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import ExistingAssessments from './ExistingAssessments';
import NewAssessmentForm from './NewAssessmentForm';

 const ManageAssessments = () => {
    const [ displayNewAssessmentForm, setDisplayNewAssessmentForm ] = useState(false);
    const [ updateAssessmentFormData, setUpdateAssessmentFormData ] = useState();

    const handleNewAssessmentClick = () => {
        // console.log(`Reached handleNewAssessmentClick() from Management.js`);
        setDisplayNewAssessmentForm(!displayNewAssessmentForm);
    };

    const transferAssessmentDataForUpdate = (aID, data) => {
        console.log(`Transferring aID ${aID} data for update.`);
        console.log(`aID ${aID} data: ${data}`);
        setUpdateAssessmentFormData(data);
        console.log("new data:", data);
        console.log(updateAssessmentFormData);
    };

    return(
        <ManageAssessmentsContainer>
            <ManageAssessmentsContainer2>
                <ManageAssessmentsButton onClick={handleNewAssessmentClick}>
                    <p>New Assessment</p>
                </ManageAssessmentsButton>

                { displayNewAssessmentForm === true && <NewAssessmentForm updateAssessmentFormData={updateAssessmentFormData}/> }

                <ManageAssessmentsLists>
                    <ExistingAssessments transferAssessmentDataForUpdate={transferAssessmentDataForUpdate} displayNewAssessmentForm={handleNewAssessmentClick}/>
                </ManageAssessmentsLists>
            </ManageAssessmentsContainer2>
        </ManageAssessmentsContainer>
    );

};

const ManageAssessmentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 610px;
    /* scale: 1.05; */
    overflow: auto;
    /* background-color: red; */
    &::-webkit-scrollbar {
        display: none;
        background-color: rgb(235, 235, 235);
    }
    /* & div {
        scale: .97;
    } */
`;
const ManageAssessmentsContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    margin: 0px auto;
`;

const ManageAssessmentsButton = styled.div`
    cursor: pointer;
    height: fit-content;
    width: fit-content;
    margin-left: auto;
    padding: 10px 15px;
    background-color: rgb(0, 132, 255);
    border-radius: 5px;
    &:hover {
        background-color: rgb(0, 116, 224);
    }
    & p {
        user-select: none;
        color: rgb(235,235,235);
        margin: auto;
    }
`;

const ManageAssessmentsLists = styled.div`
    height: fit-content;
    width: inherit;
    margin: 10px 0px;
    background-color: rgb(235, 235, 235);
    /* background-color: red; */
    border-radius: 5px;
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.1);
    & p {
        height: fit-content;
        width: fit-content;
        margin: auto;
    }
`;
export default memo(ManageAssessments);