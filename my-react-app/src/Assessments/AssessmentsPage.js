import { useState } from 'react';
import styled from 'styled-components';
import Assessment1 from './AssessmentTemplates/Assessment1';
import Assessment2 from './AssessmentTemplates/Assessment2';

import AssessmentSelection from './AssessmentSelection';

const Assessments = (props) => {
    const [displayAssessmentIndex, setDisplayAssessmentIndex] = useState(-1);       // Switch between assessments

    const handleDisplayAssessmentIndex = (index) => {
        if (index !== -1) {
            setDisplayAssessmentIndex(index);
            // console.log(`Now displaying assessment index (global) ${displayAssessmentIndex}`);
        } else {
            console.log(`Index below range for handleDisplayAssessmentIndex()`);
        }  
    };

    return(
        <AssessmentsComponentContainer>
            <AssessmentSelectionContainer>
                <AssessmentSelection title="Happiness"          index={0} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                <AssessmentSelection title="Social Self-Care"   index={1} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                <AssessmentSelection title="Custom Assessment 1"  index={2} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                <AssessmentSelection title="Custom Assessment 2"  index={3} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
                <AssessmentSelection title="Custom Assessment 3"  index={4} displayAssessmentIndexFunction={handleDisplayAssessmentIndex}/>
            </AssessmentSelectionContainer>

            <AssessmentSectionContainer>
                { displayAssessmentIndex === 0 && <Assessment1/>}
                { displayAssessmentIndex === 1 && <Assessment2/>}
                { displayAssessmentIndex === 2 && <p>Custom Assessment 1</p>}
                { displayAssessmentIndex === 3 && <p>Custom Assessment 2</p>}
                { displayAssessmentIndex === 4 && <p>Custom Assessment 3</p>}
            </AssessmentSectionContainer>

        </AssessmentsComponentContainer>
    );

};

const AssessmentsComponentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100vw;
    margin: auto;
    & p {
        font-size: 12pt;
        color: rgb(20,20,20);
    }
`;

const AssessmentSelectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 1000px;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const AssessmentSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default Assessments;