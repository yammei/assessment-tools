import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LineGraph = (props) => {

    // VARIABLES: Line Graph Container Properties
    const containerHeight = 350; // Currently overriden by 'fit-content'
    const containerWidth = 400;
    const datesWidth = 60;

    // VARIABLES: Line Graph Mock Data
    const [componentAssessment1Data, setComponentAssessment1Data] = useState([{y: 0},]);
    const [datesAssessment1Data, setDatesAssessment1Data] = useState([{dd: '', mm: ''},]);

    const [componentAssessment2Data, setComponentAssessment2Data] = useState([{y: 0},]);
    const [datesAssessment2Data, setDatesAssessment2Data] = useState([{dd: '', mm: ''},]);

    const componentSize = [(containerWidth*.85), 250]; // (x, y) or (width, height)
    const componentSections = 4; // Number of entries.
    const scoreRange = [0, 50]; // (Minimum Score, Maximum Score)

    // REQUEST: Retrieve user's assessment history.
    useEffect(() => {
        const getAssessmentData = async (numOfEntriesParam, assessmentNameParam) => {
            try {
                const numOfEntries = numOfEntriesParam;
                const assessmentName = assessmentNameParam;
                const storedUserId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:4000/api/getArchiveScore/${storedUserId}/${numOfEntries}/${assessmentName}`);
                const reversedData = response.data.entries.reverse();

                const newScoreData = reversedData.map(entry => ({ y: entry.score }));
                const newDatesData = reversedData.map(entry => {
                    const [year, month, day] = entry.date.split('-');
                    return { dd: day, mm: month };
                });

                if (assessmentName === 'happiness') {
                    setComponentAssessment1Data(newScoreData);
                    setDatesAssessment1Data(newDatesData);
                }
                if (assessmentName === 'socialselfcare') {
                    setComponentAssessment2Data(newScoreData);
                    setDatesAssessment2Data(newDatesData);
                }


            } catch (error) {
                console.error("Error fetching or processing data:", error);
            }
        };
        getAssessmentData(4, 'happiness');
        getAssessmentData(4, 'socialselfcare');

    }, []);

    // STYLE: Component background.
    const lineGraphBackgroundStyle = {
        position: 'absolute',
        transform: 'translateX(-50%)',
        // left: '-50%',
        marginTop: '50px',
        padding: '45px 25px 40px 5px',
        height: `fit-content`,
        width: `${containerWidth}px`,
        borderRadius: '25px',
        backgroundColor: 'rgb(235,235,235)',
        boxShadow: '0 0px 15px rgba(0, 0, 0, .25)',
    };

    return (
        <LineGraphContainer>
            <div className="LineGraph-Background" style={lineGraphBackgroundStyle}>
                {/* SUB-COMPONENT Part 1A/B */}
                <LineGraphScoreAndComponent scoreRange={scoreRange} componentData1={componentAssessment1Data} componentData2={componentAssessment2Data} componentSize={componentSize} componentSections={componentSections} datesWidth={datesWidth}/>
                {/* SUB-COMPONENT Part 2 */}
                <LineGraphDates datesData1={datesAssessment1Data} datesData2={datesAssessment2Data} datesWidth={datesWidth}/>
            </div>
        </LineGraphContainer>
    );
};

// STYLE: Parent container.
const LineGraphContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    p {
        user-select: none;
        color: rgb(20,20,20);
        z-index: 9990;
    }
`;

// SUB-COMPONENT: Part 1 - Combines y-axis and line graph component.
const LineGraphScoreAndComponent = (props) => {

    const range = props.scoreRange;
    const size = props.componentSize;
    const data1 = props.componentData1;
    const data2 = props.componentData2;
    const sections = props.componentSections;
    const width = props.datesWidth;

    return(
        <div className="LineGraph-Content-Row-1" style={{height: `${size[1]}px`, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 'auto'}}>
            <LineGraphScore scoreRange={range}/>
            <LineGraphComponent data1={data1} data2={data2} size={size} sections={sections} scoreRange={range} width={width}/>
        </div>
    );
};

// SUB-COMPONENT: Part 1A - Line graph component.
const LineGraphComponent = (props) => {

    // VARIABLES: Line Graph Display Properties
    const canvasRef = useRef(null);
    const width = props.size[0] - props.width;
    const height = props.size[1];
    const sections = props.sections;
    const intervals = width / (sections - 1);
    const maxScore = Math.max(...props.scoreRange);
    const incomingData1 = props.data1;
    const incomingData2 = props.data2;

    // STYLE: Line Graph Component Stylings
    const lineGraphDisplayStyle = {
        flex: '0 0 85%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: 'blue',
        zIndex: '9999',
    };

    const lineGraphStyle = {
        width: `${width}`,
        border: '1px solid #ccc',
        padding: `0px ${(props.width/2)-10}px`,
    };

    // GRAPH: Line Graph Creation.
    useEffect(() => {

        // VARIABLES: Line graph data preperation.
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        var outgoingData1 = incomingData1.map((entry, index) => ({
            x: index * intervals,
            y: height - (height * entry.y / maxScore),
        }));
        var outgoingData2 = incomingData2.map((entry, index) => ({
            x: index * intervals,
            y: height - (height * entry.y / maxScore),
        }));

        // CREATE: Assessment 1 score trend.
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(outgoingData1[0].x, outgoingData1[0].y);

        for (let i = 1; i < outgoingData1.length; i++) {
            ctx.lineTo(outgoingData1[i].x, outgoingData1[i].y);
        }

        ctx.strokeStyle = 'rgb(0, 132, 255)';
        ctx.lineWidth = 5;
        ctx.stroke();

        // CREATE: Assessment 2 score trend.
        ctx.beginPath();
        ctx.moveTo(outgoingData2[0].x, outgoingData2[0].y);

        for (let i = 1; i < outgoingData2.length; i++) {
            ctx.lineTo(outgoingData2[i].x, outgoingData2[i].y);
        }

        ctx.strokeStyle = 'rgb(52, 26, 170)';
        ctx.lineWidth = 5;
        ctx.stroke();
    }, [width, height, intervals, incomingData1]);

    return (
        <div className="LineGraph-Display" style={lineGraphDisplayStyle}>
            <canvas ref={canvasRef} width={width} height={height} style={lineGraphStyle} />
        </div>
    );
};

// SUB-COMPONENT: Part 1B - The y-axis.
const LineGraphScore = (props) => {

    const scoreRange = props.scoreRange;
    const scoreRangeMax = Math.max(...scoreRange);
    const scoreRangeMin = Math.min(...scoreRange);
    const scoreInterval = (scoreRangeMax-scoreRangeMin)/5

    return (
        <LineGraphScoreStyled>
            <p id='LineGraphScoreTop'>{scoreRangeMax}</p>
            <p>{scoreInterval*4}</p>
            <p>{scoreInterval*3}</p>
            <p>{scoreInterval*2}</p>
            <p>{scoreInterval*1}</p>
            <p id='LineGraphScoreBottom'>{scoreRangeMin}</p>
        </LineGraphScoreStyled>
    );
};

// STYLE: Part 1B - The y-axis stylings.
const LineGraphScoreStyled = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 10%;
    justify-content: space-between;
    /* background-color: pink; */
    p {
        font-size: 12pt;
        text-align: right;
        margin: 0px;
        /* background-color: yellow; */
    }
`;

// SUB-COMPONENT: Part 2 - The x-axis.
const LineGraphDates = (props) => {

    const dates1 = props.datesData1;
    const dates2 = props.datesData2;
    const width = props.datesWidth;

    const checkDate1 = (index) => !!dates1[index];
    const checkDate2 = (index) => !!dates2[index];

    return (
        <div className='LineGraph-Content-Row-2-Parent'>
            <div id="LineGraph-Content-Row-2-Assessment-1" className="LineGraph-Content-Row-2" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <LineGraphDateStyled datesWidth={width}>
                    <p id="LineGraph-Assessment-1-Dates">{ checkDate1(0) ? `(${ dates1[0].dd }/${ dates1[0].mm })` : '(MM/DD)' }</p>
                    <p id="LineGraph-Assessment-1-Dates">{ checkDate1(1) ? `(${ dates1[1].dd }/${ dates1[1].mm })` : '(MM/DD)' }</p>
                    <p id="LineGraph-Assessment-1-Dates">{ checkDate1(2) ? `(${ dates1[2].dd }/${ dates1[2].mm })` : '(MM/DD)' }</p>
                    <p id="LineGraph-Assessment-1-Dates">{ checkDate1(3) ? `(${ dates1[3].dd }/${ dates1[3].mm })` : '(MM/DD)' }</p>
                </LineGraphDateStyled>
                <div style={{ flex: '0 0 2.5%'}}/>
            </div>
            <div id="LineGraph-Content-Row-2-Assessment-2" className="LineGraph-Content-Row-2" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <LineGraphDateStyled datesWidth={width}>
                    <p id="LineGraph-Assessment-2-Dates">{ checkDate2(0) ? `(${ dates2[0].dd }/${ dates2[0].mm })` : '(MM/DD)' }</p>
                    <p id="LineGraph-Assessment-2-Dates">{ checkDate2(1) ? `(${ dates2[1].dd }/${ dates2[1].mm })` : '(MM/DD)' }</p>
                    <p id="LineGraph-Assessment-2-Dates">{ checkDate2(2) ? `(${ dates2[2].dd }/${ dates2[2].mm })` : '(MM/DD)' }</p>
                    <p id="LineGraph-Assessment-2-Dates">{ checkDate2(3) ? `(${ dates2[3].dd }/${ dates2[3].mm })` : '(MM/DD)' }</p>
                </LineGraphDateStyled>
                <div style={{ flex: '0 0 2.5%'}}/>
            </div>
        </div>
    );
};

//STYLE: Part 2 - The x-axis stylings.
const LineGraphDateStyled = styled.div`
    flex: 0 0 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: auto;
    /* background-color: orange; */
    p {
        text-align: center;
        font-size: 10pt;
        width: ${(props) => props.datesWidth}px;
        margin: 0px;
        margin-top: 5px;
        /* background-color: red; */
        transform: rotate(-0deg);
    }
    #LineGraph-Assessment-1-Dates {
        color: rgb(0, 132, 255);
    }
    #LineGraph-Assessment-2-Dates {
        color: rgb(52, 26, 170);
    }
`;

export default LineGraph;
