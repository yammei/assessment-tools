import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ExistingAssessmentsRow = (props) => {
    const [ index, setIndex ] = useState(props.index);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ entries, setEntries] = useState('');
    const [ scale, setScale ] = useState('');

    useEffect(() => {
        console.log("kore3");
        getAssessmentData();
    }, []);

    const getAssessmentData = async () => {
        const userId = localStorage.getItem('userId');
        const apiUrl = `http://localhost:4000/getAssessmentDataAtIndex?userId=${userId}&assessmentIndex=${index}`;
        const response = await (await axios.get(apiUrl)).data.assessment;
        console.log(response);
        setName(response.assessmentName);
        setDescription(response.assessmentDescription);
        setEntries((JSON.parse(response.assessmentEntries)).length.toString());
        setScale(response.assessmentRatingNum);
    };

    return(
        <ExistingAssessmentsRowContainer>
            <ExistingAssessmentsInfo>
                <p style={{width: '100px'}}>{name}</p>
                <ExistingAssessmentsDescription style={{width: '150px', overflow: 'auto'}}>
                    <p>{description}</p>
                </ExistingAssessmentsDescription>
                <p style={{width: '50px'}}>{entries}</p>
                <p style={{width: '50px'}}>{scale}</p>
            </ExistingAssessmentsInfo>

            <ExistingAssessmentsTools>
                <svg onClick={() => props.addAssessment()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                <svg onClick={() => props.deleteAssessment()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </ExistingAssessmentsTools>
        </ExistingAssessmentsRowContainer>
    );

};

const ExistingAssessmentsRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
    width: 500px;
    margin: 15px auto;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 5px;
`;

const ExistingAssessmentsInfo = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
    width: 400px;
    margin: auto;
    margin-right: 10px;
    & p {
        font-size: 10pt;
        text-align: center;
        height: fit-content;
        width: fit-content;
        margin: auto;
    }
`;

const ExistingAssessmentsTools = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    width: 50px;
    margin-left: 0px;
    margin-right: auto;
    & svg {
        fill: rgb(100, 100, 100);
        height: 13px;
        width: auto;
        margin: auto 5px;
    }
    & svg:hover {
        fill: rgb(20, 20, 20);
    }
`;

const ExistingAssessmentsDescription = styled.div`
    margin: auto;
    & p {
        font-size: 10pt;
        text-align: center;
        height: fit-content;
        width: fit-content;
        margin: auto;
    }
    &::-webkit-scrollbar {
        // display: none;
        height: 0px;
        width: 0px;
        background-color: rgb(235, 235, 235);
    }
`;
export default ExistingAssessmentsRow;