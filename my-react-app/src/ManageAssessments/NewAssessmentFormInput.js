import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const NewAssessmentFormInput = (props) => {
    const number = props.inputNumber;
    const inputPlaceholderText = props.inputPlaceholderText;
    const [ displayAdd, setDisplayAdd ] = useState(`none`);
    const [ displayRemove, setDisplayRemove ] = useState(`none`);

    console.log("NewAssessmentFormInput: ", "add func: ", props.addInstanceFunction);

    useEffect(() => {
        if (props.inputDisplayAdd) {
            setDisplayAdd(`block`);
            if (props.inputDisplayRemove) {
                setDisplayRemove(`block`);
            }
        }
    }, [props.inputDisplayAdd, props.inputDisplayRemove]);

    return(
        <NewAssessmentFormInputContainer>

            <label for='QueryInput'>{number}</label>
            <NewAssessmentFormInputContainerDivider/>
            <input id='QueryInput' placeholder={inputPlaceholderText}></input>
            <NewAssessmentFormInputContainerDivider/>
            {/* <NewAssessmentFormInputSVGContainer>
                <div>
                    <svg onClick={() => props.addInstanceFunction(number+1)} style={{display: `${displayAdd}`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    <svg onClick={() => props.deleteInstanceFunction(number)} style={{display: `${displayRemove}`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                </div>
            </NewAssessmentFormInputSVGContainer> */}

        </NewAssessmentFormInputContainer>
    );
};

const NewAssessmentFormInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 15px 0px;
    /* width: min-content; */
    background-color: brown;
    & label {
        font-size: 10pt;
        text-align: center;
        flex: 0 0 10%;
        margin: auto 0px;
        /* background-color: blue; */
    }
    & input {
        flex: 0 0 50%;
        font-size: 9pt;
        // text-align: center;
        text-indent: 7px;
        height: 30px;
        width: 500px;
        margin: auto 0px;
        padding-left: 7px;
        background-color: rgb(215, 215, 215);
        box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.25);
        outline: none;
        border-radius: 50px;
    }
`;

const NewAssessmentFormInputContainerDivider = styled.div`
    flex: '0 0 5%';
    height: 30px;
    width: 1px;
    margin: auto 10px;
    /* background-color: rgb(200, 200, 200); */
`;

const NewAssessmentFormInputSVGContainer  = styled.div`
        flex: 0 0 10%;
        /* background-color: red; */
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

export default NewAssessmentFormInput;