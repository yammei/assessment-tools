import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ExistingAssessments = (props) => {

    const [ existingAssessmentsInstances, setExistingAssessmentsInstances ] = useState([]);
    
    
    const updateAssessment = () => {
        console.log("updateAssessment()");
    };

    const addAssessment = () => {
        console.log("addAssessment()");
    };

    const deleteAssessment = () => {
        console.log("deleteAssessment()");
    };

    useEffect(() =>{const meow = 0;}, []);

    return(
        <ExistingAssessmentsContainer>

            <div style={{display: 'flex', flexDirection: 'row', height: '20px', margin: '30px 0px', backgroundColor: ''}}>
                <p style={{height: 'fit-content', width: 'fit-content', whiteSpace: 'nowrap', marginTop: '0px', marginRight: 'auto', paddingRight: '10px', marginBottom: '10px'}}>
                    My Assessments
                </p>
                <NewAssessmentFormVerticalDivider/>
            </div>

            <ExistingAssessmentsInfo>
                    <ExistingAssessmentsInfoColumnNames>
                        <p style={{width: '150px'}}>Title</p>
                        <NewAssessmentFormColumnNameDivider/>
                        <p style={{width: '150px'}}>Description</p>
                        <NewAssessmentFormColumnNameDivider/>
                        <p style={{width: '50px'}}>Entries</p>
                        <NewAssessmentFormColumnNameDivider/>
                        <p style={{width: '50px'}}>Scale</p>
                    </ExistingAssessmentsInfoColumnNames>
                    <NewAssessmentFormColumnNameDivider/>
                    <p style={{width: '50px'}}>Tools</p>
            </ExistingAssessmentsInfo>

            <ExistingAssessmentsRow>
                <ExistingAssessmentsInfo>
                    <p style={{width: '150px'}}>Example Assessment</p>
                    <p style={{width: '150px'}}>Assessment Description</p>
                    <p style={{width: '50px'}}>10</p>
                    <p style={{width: '50px'}}>5</p>
                </ExistingAssessmentsInfo>

                <ExistingAssessmentsTools>
                    <svg onClick={() => addAssessment()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    <svg onClick={() => deleteAssessment()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </ExistingAssessmentsTools>

            </ExistingAssessmentsRow>
        </ExistingAssessmentsContainer>
    );

};

const ExistingAssessmentsContainer = styled.div`
    height: fit-content;
    width: fit-content;
    margin: 20px auto;
    background-color: rgb(235, 235, 235);
    & p {
        font-size: 12pt;
        color: rgb(20, 20, 20);
        height: 30px;
        width: fit-content;
        margin: auto;
    }
`;

const ExistingAssessmentsRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
    width: 500px;
    margin: 10px auto;
    // padding: 10px 0px;
    // background-color: #ff0000;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 5px;
`;

const ExistingAssessmentsInfo = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
    width: 500px;
    margin: auto;
    // background-color: cyan;
    & p {
        font-size: 10pt;
        text-align: center;
        height: fit-content;
        width: fit-content;
        margin: auto;
        // background-color: yellow;
    }
`;

const ExistingAssessmentsInfoColumnNames = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    width: 500px;
    & p {
        font-size: 10pt;
    }
`;

const ExistingAssessmentsTools = styled.div`
    cursor: pointer;
    display: flex;
    width: 50px;
    flex-direction: row;
    // background-color: orange;
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