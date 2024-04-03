import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const NewAssessmentForm = (props) => {
    const InputPlaceholderText = 'Enter statement or question ...';
    return(
        <NewAssessmentFormContainer>
            <p>New Assessment Form Component</p>

            <NewAssessmentFormColumnNames>
                <p id='NewAssessmentFormColumn0'>#</p>
                <p id='NewAssessmentFormColumn1'>Query/Statement</p>
                <p id='NewAssessmentFormColumn2'>Add/Delete</p>
            </NewAssessmentFormColumnNames>

            <NewAssessmentFormInputContainer>
                <label for='QueryInput'>1</label>
                <input id='QueryInput' placeholder={InputPlaceholderText}></input>
            </NewAssessmentFormInputContainer>

            <NewAssessmentFormInputContainer>
                <label for='QueryInput'>2</label>
                <input id='QueryInput' placeholder={InputPlaceholderText}></input>
                <NewAssessmentFormInputContainerDivider/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>            </NewAssessmentFormInputContainer>

        </NewAssessmentFormContainer>
    );

};

const NewAssessmentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: inherit;
    margin-top: 10px;
    background-color: rgb(235, 235, 235);
    border: 3px dashed rgb(200, 200, 200);
    border-radius: 5px;
    & p {
        font-size: 12pt;
        color: rgb(20, 20, 20);
    }
`;
const NewAssessmentFormColumnNames = styled.div`
    display: flex;
    flex-direction: row;
    & p {
        font-size: 12pt;
        color: rgb(20, 20, 20);
    }
`;
const NewAssessmentFormInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 0px;
    & label {
        margin-right: 20px;
    }
    & input {
        // text-align: center;
        text-indent: 7px;
        height: 25px;
        width: 300px;
        margin: auto 10px;
        padding-left: 7px;
        background-color: rgb(225, 225, 225);
        box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.25);
        outline: none;
        border-radius: 50px;
    }
    & svg {
        cursor: pointer;
        fill: rgb(20, 20, 20);
        height: 15px;
        width: auto;
        margin: auto 5px;
    }
`;
const NewAssessmentFormInputContainerDivider = styled.div`
    height: 25px;
    width: 1px;
    margin: auto 10px;
    background-color: rgb(200, 200, 200);
`;
const NewAssessmentFormInputContainerRemove = styled.div`

`;

export default NewAssessmentForm;