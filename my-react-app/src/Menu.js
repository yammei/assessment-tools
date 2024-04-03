import { useState } from 'react';

import Scores from './Scores';
import Logout from './Logout';
import History from './History';

const Menu = (props) => {

    const [displayMenuContents, setDisplayMenuContents] = useState(false);

    const handleMenuClick = () => {
        setDisplayMenuContents(!displayMenuContents);
    };

    const handleShowContentComponent = (componentIndex) => {
        console.log(`Now displaying component index ${componentIndex}.`);
        props.displayComponentIndexFunction(componentIndex);
    };

    return(
        <div className="Menu-Container Nav-Bar-Item">
            <div className='Nav-Bar-Link' onClick={handleMenuClick}  style={{marginRight: '25px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                <p>Menu</p>
            </div>

            <div className="Menu-Content-Container">
                {
                displayMenuContents ?
                    <div className='Menu-Content'>
                        <p onClick={() => handleShowContentComponent(0)}>Account Settings (Dead)</p>
                        <div className='Menu-Content-Seperator'/>
                        <p onClick={() => handleShowContentComponent(1)}>Assessment History</p>
                        <p onClick={() => handleShowContentComponent(2)}>Manage Assessments</p>
                        <div className='Menu-Content-Seperator'/>
                        <Logout/>
                    </div>
                :
                    <div/>
                }
            </div>
        </div>
    );

};

export default Menu;