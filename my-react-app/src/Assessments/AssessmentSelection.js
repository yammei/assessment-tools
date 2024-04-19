import { useState } from 'react';
import styled from 'styled-components';

const AssessmentSelection = (props) => {

    const handleDisplayAssessment = (index) => {
        console.log(`Now displaying component index ${index}.`);
        props.displayAssessmentIndexFunction(index);
    };

    return(
        <div onClick={() => handleDisplayAssessment(props.index)}>
            <AssessmentSelectionContainer>
                <p>{props.title}</p>
            </AssessmentSelectionContainer>
        </div>

    );

};

const AssessmentSelectionContainer = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 75px;
    width: 200px;
    margin: 10px;
    padding: 0px 5px;
    background-color: rgb(175,175,175);
    border-radius: 10px;
    &:hover {
        /* filter: brightness(.9); */
        background-color: rgb(105, 173, 236);
    }
    & p {
        font-size: 12pt;
        /* color: rgb(235,235,235); */
        color: rgb(20, 20, 20);
        margin: auto;
    }
`;

export default AssessmentSelection;