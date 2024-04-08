import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import NewAssessmentFormInput from './NewAssessmentFormInput';

const NewAssessmentForm = (props) => {
    const [inputInstances, setInputInstances] = useState([]);
    const [inputInstancesText, setInputInstancesText] = useState([]);
    const inputPlaceholderText = 'Enter statement or question ...';

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [scale, setScale] = useState('');
    const [suggestions, setSuggestions] = useState('');

    useEffect(() => {
    }, [inputInstances]);

    const handleAddInstance = (index) => {

        if (inputInstances.length < 9) {
            const newArray = [...inputInstances];
            const newIndex = newArray.length+2;

            newArray.push(
                <NewAssessmentFormInput
                    key={newIndex}
                    inputNumber={newIndex}
                    inputPlaceholderText={inputPlaceholderText}
                    inputDisplayAdd={true}
                    inputDisplayRemove={true}
                    addInstanceFunction={handleAddInstance}
                    deleteInstanceFunction={handleDeleteInstance}
                    updateInputValue={handleUpdateInputValue}
                />
            );
            // sortInstanceArray();
            setInputInstances(newArray);
        } else {
            console.log("Maximum query/statement instances reached.");
        }

    };
    const handleDeleteInstance = (index) => {
        var newArray = [...inputInstances];
        newArray.splice(index, 1);
        newArray = sortInstanceArray(newArray);
        setInputInstances(newArray);

        var newArrayText = [...inputInstancesText];
        newArrayText.splice(index, 1);
        setInputInstancesText(newArrayText);
    };

    const sortInstanceArray = (tempArray) => {
        const newArray = [...tempArray];
        for (let i=0; i < newArray.length; i++) {
            let newProps = { ...newArray[i].props };
            newProps.inputNumber = i+2;
            newArray[i] = <NewAssessmentFormInput {...newProps} />;

        }
        return newArray;
    };

    const handleUpdateInputValue = (input, index) => {
        const newArray = inputInstancesText;
        newArray[index] = input;
        setInputInstancesText(newArray);
    };

    const handleSubmitAssessment = async () => {
        console.log('Submitted', inputInstancesText);
        const userId = localStorage.getItem('userId');
        // const apiUrl = `http://localhost:4000/testSubmission/`;
        const apiUrl = `http://localhost:4000/newAssessment/`;
        const response = await axios.post(apiUrl, {
            userId: userId,
            assessmentName: name,
            assessmentDescription: description,
            assessmentEntries: inputInstancesText.slice(1, inputInstancesText.length),
            assessmentRatingNum: scale,
            assessmentSuggestions: suggestions,
        });
        window.location.href = '/MainPage';
    };

    return(
        <NewAssessmentFormContainer>
            <div style={{height: 'fit-content', width: 'inherit', margin: 'auto', padding: '20px', overflow: 'scroll'}}>
                <p style={{height: 'fit-content', width: 'fit-content', margin: '10px auto'}}>New Assessment Form Component</p>

                <NewAssessmentFormMiscInputsContainer style={{ display: 'flex', flexDirection: 'column' }}>
                    <input placeholder='Assessment Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <input placeholder='Assessment Description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input placeholder='Rating Scale (2-5)' type='number' value={scale} onChange={(e) => setScale(e.target.value)} />
                    <input placeholder='Treatments & Suggestions' type='text' value={suggestions} onChange={(e) => setSuggestions(e.target.value)} />
                </NewAssessmentFormMiscInputsContainer>

                <NewAssessmentFormColumnNames>
                    <p style={{width: '50px', textAlign: 'center'}}>no.</p>
                    <NewAssessmentFormInputContainerDivider/>
                    <p style={{width: '300px', textAlign: 'center', margin: 'auto 0px'}}>Query/Statement</p>
                    <NewAssessmentFormInputContainerDivider/>
                    <p style={{width: '50px', textAlign: 'center'}}>+/-</p>
                    {/* <p style={{flex: '0 0 20%', textAlign: 'center', backgroundColor: 'pink'}}>a</p> */}
                </NewAssessmentFormColumnNames>

                <NewAssessmentFormInputContainerSUPER>
                    <div style={{width: 'fit-content'}}>
                        <NewAssessmentFormInput inputNumber={1} inputPlaceholderText={inputPlaceholderText} updateInputValue={handleUpdateInputValue}/>
                    </div>
                    {
                        <NewAssessmentFormInputSVGContainer>
                            <div>
                                <svg onClick={() => handleAddInstance(1)} style={{display: `${'block'}`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                                <svg onClick={() => handleDeleteInstance(1)} style={{display: `${'block'}`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                            </div>
                        </NewAssessmentFormInputSVGContainer>
                    }
                </NewAssessmentFormInputContainerSUPER>

                {inputInstances.map((component, index) => (
                    <React.Fragment key={index}>
                        <NewAssessmentFormInputContainerSUPER>
                            <div style={{width: 'fit-content'}}>{component}</div>
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

                <NewAssessmentsSubmitButton onClick={handleSubmitAssessment}>
                    <p>Create Assessment</p>
                </NewAssessmentsSubmitButton>

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
    /* background-color: green; */
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
        /* flex: 0 0 10%; */
        /* background-color: red; */
        margin: auto;
        /* margin-right: auto; */
        & div {
            display: flex;
            flex-direction: row;
            height: 30px;
            width: 50px;
            margin: 0px auto;
        }
        & svg {
        cursor: pointer;
            fill: rgb(20, 20, 20);
            height: 13px;
            width: auto;
            margin: auto 6px;
        }
`;
const NewAssessmentFormInputContainerSUPER  = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: 100%;
    /* background-color: cyan; */
`;
const NewAssessmentsSubmitButton = styled.div`
    cursor: pointer;
    scale: .9;
    height: fit-content;
    width: fit-content;
    margin: 20px auto;
    padding: 10px 15px;
    background-color: rgb(0, 132, 255);
    border-radius: 9999px;
    &:hover {
        background-color: rgb(0, 116, 224);
    }
    & p {
        user-select: none;
        color: rgb(235,235,235);
        margin: auto;
    }
`;

const NewAssessmentFormMiscInputsContainer = styled.div`
    & input {
        /* flex: 0 0 50%; */
        font-size: 9pt;
        // text-align: center;
        text-indent: 7px;
        height: 30px;
        width: 300px;
        margin: 10px auto;
        padding-left: 7px;
        background-color: rgb(215, 215, 215);
        box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.25);
        outline: none;
        border-radius: 50px;
    }
    & input::placeholder {
        user-select: none;
    }
`;
export default NewAssessmentForm;