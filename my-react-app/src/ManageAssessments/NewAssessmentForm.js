import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import NewAssessmentFormInput from './NewAssessmentFormInput';

const NewAssessmentForm = (props) => {
    const [inputInstances, setinputInstances] = useState([]);
    const inputPlaceholderText = 'Enter statement or question ...';


    const handleAddInstance = (index) => {
        const newArray = [...inputInstances,
        <NewAssessmentFormInput
            key={inputInstances.length}
            inputNumber={inputInstances.length}
            inputPlaceholderText={inputPlaceholderText}
            inputDisplayAdd={true}
            inputDisplayRemove={true}
        />];
        setinputInstances(newArray);
      };

      const handleDeleteInstance = (index) => {
        const newArray = [...inputInstances];
        newArray.splice(index, 1);
        setinputInstances(newArray);
      };

    return(
        <NewAssessmentFormContainer>
            <div style={{height: 'fit-content', width: 'inherit', margin: 'auto', padding: '20px', overflow: 'scroll'}}>
                <p>New Assessment Form Component</p>

                <NewAssessmentFormColumnNames>
                    <p style={{flex: '0 0 10%', textAlign: 'center'}}>no.</p>
                    <NewAssessmentFormInputContainerDivider/>
                    <p style={{flex: '0 0 50%', textAlign: 'center'}}>Query/Statement</p>
                    <NewAssessmentFormInputContainerDivider/>
                    <p style={{flex: '0 0 10%', textAlign: 'center'}}>+/-</p>
                </NewAssessmentFormColumnNames>

                {inputInstances.map((component, index) => (
                    component
                ))}
                <button onClick={() => handleAddInstance(4)}> add </button>
                <button onClick={() => handleDeleteInstance()}> remove </button>
                <NewAssessmentFormInput inputNumber={1} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/>
                <NewAssessmentFormInput inputNumber={2} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/>
                <NewAssessmentFormInput inputNumber={3} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/>
                <NewAssessmentFormInput inputNumber={4} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/>
                <NewAssessmentFormInput inputNumber={5} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/>
            </div>
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
    margin: 10px 0px;
    & p {
        font-size: 10pt;
        color: rgb(20, 20, 20);
        margin: auto 0px;
    }
`;

const NewAssessmentFormInputContainerDivider = styled.div`
    flex: '0 0 5%';
    height: 20px;
    width: 1px;
    margin: auto 10px;
    background-color: rgb(200, 200, 200);
`;

export default NewAssessmentForm;