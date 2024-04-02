import React, { useState } from 'react';
import LineGraph from './LineGraph';

const History = () => {
    const [showHistory, setShowHistory] = useState(false);

    const handleOnClick = () => {
      setShowHistory(!showHistory);
    };

    return (
        <div id="History-Container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p className="Nav-Bar-Link" onClick={handleOnClick}>View Assessment History</p>
            { showHistory && <LineGraph/> }
        </div>
    );
};

export default History;