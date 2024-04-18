import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import NewAssessmentFormInput from './NewAssessmentFormInput';

const NewAssessmentForm = (props) => {
    const [updateData, setUpdateData] = useState(props.updateAssessmentFormData); // Contains .assessmentName, .assessmentDescription, .assessmentRatingNum
    const [updateDataEntries, setUpdateDataEntries] = useState('');
    const [inputInstances, setInputInstances] = useState([]);
    const [inputInstancesText, setInputInstancesText] = useState([]);   // Array for assessment entries.
    const [inputSuggestionText, setInputSuggestionText] = useState([]);   // Array for assessment suggestions.
    const inputPlaceholderText = 'Prompt (Max. 30 Characters)';
    const inputPlaceholderText2 = 'Treatment (Max. 100 Characters)';

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [scale, setScale] = useState('');
    const [entries, setEntries] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (typeof props.updateAssessmentFormData !== 'undefined') {
            console.log("Trying to update new assessment form data with: ");
            console.log(updateData);
            setName(props.updateAssessmentFormData.assessmentName || '');
            setDescription(props.updateAssessmentFormData.assessmentDescription || '');
            setScale(props.updateAssessmentFormData.assessmentRatingNum || '');
            setEntries(props.updateAssessmentFormData.assessmentEntries || []);
            setSuggestions(props.updateAssessmentFormData.assessmentSuggestions || []);
        }
        // console.log(suggestions);
    }, [props.updateAssessmentFormData]);
    

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
                    updateAssessmentDataValue={entries[index+1]}
                />
            );
            // sortInstanceArray();
            setInputInstances(newArray);
            console.log("entry value: ", entries[index+1]);
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
            assessmentSuggestions: inputSuggestionText,
        });
        console.log(inputSuggestionText);
        window.location.href = '/MainPage';
    };

    const handleSuggestionInputChange = (event, number) => {
        const { value } = event.target;
        setInputSuggestionText((prevText) => {
            const newText = [...prevText];
            newText[number] = value;
            return newText;
        });
        console.log(`Suggestion # ${number} is now: ${value}`);
    };

    return(
        <NewAssessmentFormContainer>
            <NewAssessmentFormContainer2>
            <div style={{height: 'fit-content', width: 'inherit', margin: 'auto', marginTop: '30px'}}>

                <div style={{display: 'flex', flexDirection: 'row', height: '20px', marginBottom: '10px', backgroundColor: ''}}>
                    <p style={{height: 'fit-content', width: 'fit-content', whiteSpace: 'nowrap', marginTop: '0px', marginRight: 'auto', paddingRight: '10px', marginBottom: '10px'}}>
                        General Information
                    </p>
                    <NewAssessmentFormVerticalDivider/>
                </div>
                <p className='Info-Text' style={{color: 'rgb(150, 150, 150)', fontSize: '9pt', marginLeft: '0px'}}>
                    Enter new assessment information.
                </p>

                <NewAssessmentFormMiscInputsContainer style={{ display: 'flex', flexDirection: 'column' }}>
                    <label for='input-0'>Assessment Name</label>
                    <input id='input-0' placeholder='Assessment Name (Max. 20 Characters)' type='text' maxLength='20' value={name} onChange={(e) => setName(e.target.value)} />

                    <label for='input-1'>Assessment Description</label>
                    <input id='input-1' placeholder='Assessment Description (Max. 100 Characters)' type='text' maxLength='100' value={description} onChange={(e) => setDescription(e.target.value)} />

                    <label for='input-2'>Response Rating Scale</label>
                    <input id='input-2' placeholder=' Response Rating Scale (Range: 2-5)' type='number' min='2' max='5' value={scale} onChange={(e) => setScale(e.target.value)} />

                    {/* <label for='input-3'>Treatments & Suggestions</label>
                    <input id='input-3' placeholder='Treatments & Suggestions' type='text' value={suggestions} onChange={(e) => setSuggestions(e.target.value)} /> */}
                </NewAssessmentFormMiscInputsContainer>

                <div style={{display: 'flex', flexDirection: 'row', height: '20px', margin: '30px auto', marginBottom: '10px', backgroundColor: ''}}>
                    <p style={{height: 'fit-content', width: 'fit-content', whiteSpace: 'nowrap', marginTop: '0px', marginRight: 'auto', paddingRight: '10px', marginBottom: '10px'}}>
                        Assessment Entries
                    </p>
                    <NewAssessmentFormVerticalDivider/>
                </div>
                <p className='Info-Text' style={{color: 'rgb(150, 150, 150)', fontSize: '9pt', marginLeft: '0px'}}>
                    Enter assessment prompt(s) and treatment(s).
                </p>

                <NewAssessmentFormColumnNames>
                    <p style={{width: '50px', textAlign: 'center'}}>no.</p>
                    <NewAssessmentFormInputContainerDivider/>
                    <p style={{width: '300px', textAlign: 'center', margin: 'auto 0px'}}>Prompt & Treatment</p>
                    <NewAssessmentFormInputContainerDivider/>
                    <p style={{width: '50px', textAlign: 'center'}}>+/-</p>
                    {/* <p style={{flex: '0 0 20%', textAlign: 'center', backgroundColor: 'pink'}}>a</p> */}
                </NewAssessmentFormColumnNames>

                <NewAssessmentFormInputContainerSUPERDUPER>
                    <NewAssessmentFormInputContainerSUPER>
                        <div style={{width: 'fit-content'}}>
                            <NewAssessmentFormInput inputNumber={1} updateAssessmentDataValue={entries[0]} inputPlaceholderText={inputPlaceholderText} updateInputValue={handleUpdateInputValue}/>
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
                    <NewAssessmentFormSuggestionInput placeholder={inputPlaceholderText2} value={suggestions[0]} onChange={(event) => handleSuggestionInputChange(event, 0)}></NewAssessmentFormSuggestionInput>
                </NewAssessmentFormInputContainerSUPERDUPER>

                {inputInstances.map((component, index) => (
                    <React.Fragment key={index}>
                        <NewAssessmentFormInputContainerSUPERDUPER>
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
                            <NewAssessmentFormSuggestionInput placeholder={inputPlaceholderText2} value={suggestions[index]} onChange={(event) => handleSuggestionInputChange(event, index+1)}></NewAssessmentFormSuggestionInput>
                        </NewAssessmentFormInputContainerSUPERDUPER>
                    </React.Fragment>
                ))}

                <NewAssessmentsSubmitButton onClick={handleSubmitAssessment}>
                    <p>Create Assessment</p>
                </NewAssessmentsSubmitButton>

            </div>
            </NewAssessmentFormContainer2>
        </NewAssessmentFormContainer>
    );

};

const NewAssessmentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    margin-top: 10px;
    background-color: rgb(235, 235, 235);
    border-radius: 5px;
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.1);

`;
const NewAssessmentFormContainer2 = styled.div`
    width: min-content;
    margin: 0px auto;
    & p {
        font-size: 12pt;
        color: rgb(20, 20, 20);
    }
`;

const NewAssessmentFormColumnNames = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 0px;
    margin: 20px;
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
            fill: rgb(100, 100, 100);
            height: 13px;
            width: auto;
            margin: auto 6px;
        }
        & svg:hover {
            fill: rgb(20, 20, 20);
        }
`;

const NewAssessmentFormInputContainerSUPER  = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: 100%;
    /* background-color: cyan; */
`;
const NewAssessmentFormInputContainerSUPERDUPER  = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: fit-content;
    margin: 10px auto;
    padding: 10px 20px;
    background-color: rgb(225, 225, 225);
    // border: 1px solid rgb(220, 220, 220);
    border-radius: 10px;
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
    margin: 10px auto;
    /* background-color: red; */
    & label {
        font-size: 10pt;
        width: 300px;
        margin: 0px auto;
        margin-top: 10px;
        // margin-left: 70px;
        margin-bottom: -5px;
    }
    & input {
        /* flex: 0 0 50%; */
        font-size: 9pt;
        // text-align: center;
        text-indent: 7px;
        height: 30px;
        width: 300px;
        margin: 10px auto;
        padding-left: 7px;
        background-color: rgb(250, 250, 250);
        box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.25);
        outline: none;
        border-radius: 50px;
    }
    & input::placeholder {
        user-select: none;
    }
    & input[type=number]::-webkit-inner-spin-button,
    & input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

`;

const NewAssessmentFormVerticalDivider = styled.div`
    flex: 1;
    height: 1px;
    width: min-content;
    margin: 0px auto;
    margin-top: auto;
    background-color: rgb(200, 200, 200);
`;

const NewAssessmentFormSuggestionInput = styled.input`

    /* flex: 0 0 50%; */
    font-size: 9pt;
    // text-align: center;
    text-indent: 7px;
    height: 30px;
    width: 300px;
    margin: 10px auto;
    margin-top: 0px;
    padding-left: 7px;
    background-color: rgb(250, 250, 250);
    box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.25);
    outline: none;
    border-radius: 50px;
    &::placeholder {
        user-select: none;
    }


`;
export default memo(NewAssessmentForm);