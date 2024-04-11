import { useState, useEffect } from 'react';

import Logout from './Logout';

const Menu = (props) => {
    const [ username, setUsername ] = useState('');
    const [displayMenuContents, setDisplayMenuContents] = useState(false);

    useEffect(() => {
        // Retrieve username from localStorage
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

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
                        {/* <p onClick={() => handleShowContentComponent(0)}>Hello, {username}!</p> */}
                        <p>Hello, {username}!</p>
                        <div className='Menu-Content-Seperator'/>
                        <p onClick={() => handleShowContentComponent(1)}>Assessment History</p>
                        <p onClick={() => handleShowContentComponent(2)}>Manage Assessments</p>
                        {props.darkMode ? <p onClick={props.toggleDarkMode}>Switch Light Mode</p> : <p onClick={props.toggleDarkMode}>Switch Dark Mode</p>}
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