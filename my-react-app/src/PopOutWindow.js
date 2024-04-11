import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PopOutWindow = (props) => {
    const PopOutWindowTitle = props.title;
    const PopOutWindowTexts = props.texts; // An array of strings.
    const PopOutWindowColor = props.windowColor;
    const PopOutWindowWidth = 500;
    const [displayProperty, setDisplayProperty] = useState(`${props.display}`);

    useEffect(() => {
        setDisplayProperty(props.display);
      }, [props.display]);

    const PopOutWindowBarStyle = {
        display: 'flex',
        flexDirection: 'row',
        height: '30px',
        width: `${PopOutWindowWidth}`,
        // backgroundColor: `${PopOutWindowColor}`,
        backgroundColor: 'rgb(235,235,235)',
        borderRadius: '25px 25px 0px 0px',
        zIndex: '9999'
    };

    const PopOutWindowBodyStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '300px',
        width: '500px',
        marginTop: '10px',
        padding: '25px 0px',
        backgroundColor: 'rgb(235,235,235)',
        borderRadius: '0px 0px 25px 25px',
        overflow: 'scroll',
        zIndex: '9998'
    };

    const PopOutWindowBarTitleStyle = {
        color: 'rgb(50,50,50)',
        fontSize: '15pt',
        // fontWeight: 'bold',
        textAlign: 'center',
        width: `${PopOutWindowWidth/2}px`,
        margin: 'auto 0px',
        // backgroundColor: 'red',
        transform: `translateX(${PopOutWindowWidth/4}px)`,
        zIndex: '9999',
    };

    const handleClickPopOutWindowBarExit = () => {
        props.close();
    }

    return (

        <PopOutWindowContainer display={displayProperty}>
            <div className="PopOutWindow-Bar" style={PopOutWindowBarStyle}>
                <p id='PopOutWindow-Bar-Title' style={PopOutWindowBarTitleStyle}>{ PopOutWindowTitle ? PopOutWindowTitle : 'Mind Mender'}</p>
                <svg id='PopOutWindow-Bar-Exit' onClick={handleClickPopOutWindowBarExit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            </div>
            <div className="PopOutWindow-Body" style={PopOutWindowBodyStyle}>
                {Array.isArray(PopOutWindowTexts) ? (
                    PopOutWindowTexts.map((text, index) => (
                        <div>
                            <p style={{margin: '10px 0px', padding: '0px 20px',}} key={index}>{text}</p>
                            <PopOutWindowDivider/>
                        </div>
                    ))
                ) : (
                    <p>Nothing to see here...</p>
                )}
            </div>
        </PopOutWindowContainer>
    );
};

const PopOutWindowContainer = styled.div`
    display: ${(props) => props.display};
    height: fit-content;
    width: fit-content;
    scale: .9;
    margin: 0px auto;
    padding: 20px;
    box-shadow: 0 0px 15px rgba(0, 0, 0, .25);
    border-radius: 25px;
    z-index: 9997;
    p {
        font-size: 12pt;
    }
    #PopOutWindow-Bar-Exit {
        cursor: pointer;
        fill: rgb(100,100,100);
        vertical-align: middle;
        margin-top: auto;
        margin-left: auto;
        margin-right: 5px;
        margin-bottom: auto;
        height: 25px;
    }
    #PopOutWindow-Bar-Exit:hover {
        fill: rgb(75,75,75);
    }

`;

const PopOutWindowDivider = styled.div`
    /* flex: 1; */
    height: 1px;
    width: 90%;
    margin: 15px auto;
    background-color: rgb(200, 200, 200);
    /* background-color: red; */
`;
export default PopOutWindow;