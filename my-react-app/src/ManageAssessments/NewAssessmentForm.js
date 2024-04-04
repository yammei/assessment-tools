import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import NewAssessmentFormInput from './NewAssessmentFormInput';

const NewAssessmentForm = (props) => {
    const [inputInstances, setInputInstances] = useState([]);
    const inputPlaceholderText = 'Enter statement or question ...';

    useEffect(() => {
        console.log(inputInstances);
    }, [inputInstances]);

    const handleAddInstance = (index) => {
        const newArray = [...inputInstances];
        const newIndex = newArray.length;

        newArray.push(
            <NewAssessmentFormInput
                key={newIndex}
                inputNumber={newIndex}
                inputPlaceholderText={inputPlaceholderText}
                inputDisplayAdd={true}
                inputDisplayRemove={true}
                addInstanceFunction={handleAddInstance}
                deleteInstanceFunction={handleDeleteInstance}
            />
        );
        setInputInstances(newArray);
    };
    const handleDeleteInstance = (index) => {
        console.log("handleDeleteInstance index: ", index);
        const newArray = [...inputInstances];
        newArray.splice(index, 1);
        setInputInstances(newArray);
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
                    <React.Fragment key={index}>
                        <NewAssessmentFormInputContainerSUPER>
                            <div style={{width: 'fit-content', backgroundColor: 'yellow'}}>{component}</div>
                            {/* <NewAssessmentFormInputContainerDivider/> */}
                            {
                                <NewAssessmentFormInputSVGContainer>
                                    <div>
                                        <svg onClick={() => handleAddInstance(index+1)} style={{display: `${'block'}`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                                        <svg onClick={() => handleDeleteInstance(index)} style={{display: `${'block'}`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                                    </div>
                                </NewAssessmentFormInputSVGContainer>
                            }
                        </NewAssessmentFormInputContainerSUPER>
                    </React.Fragment>
                ))}

                <button onClick={() => handleAddInstance(0)}> add </button>
                {/* <NewAssessmentFormInput inputNumber={1} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/>
                <NewAssessmentFormInput inputNumber={2} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/>
                <NewAssessmentFormInput inputNumber={3} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/>
                <NewAssessmentFormInput inputNumber={4} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/>
                <NewAssessmentFormInput inputNumber={5} inputPlaceholderText={inputPlaceholderText} inputDisplayAdd={true} inputDisplayRemove={true}/> */}
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
    background-color: green;
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

const NewAssessmentFormInputSVGContainer  = styled.div`
        flex: 0 0 10%;
        background-color: red;
        margin: auto;
        & div {
            display: flex;
            flex-direction: row;
            height: 30px;
            width: fit-content;
            margin: 0px auto;
        }
        & svg {
        cursor: pointer;
            fill: rgb(20, 20, 20);
            height: 14px;
            width: auto;
            margin: auto 6px;
        }
`;
const NewAssessmentFormInputContainerSUPER  = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: 100%;
    background-color: cyan;
`;
export default NewAssessmentForm;