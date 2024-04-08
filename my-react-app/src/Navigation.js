import styled from 'styled-components';

import Scores from './Scores';
import Logout from './Logout';
import History from './History';
import Menu from './Menu';

const Navigation = (props) => {
    return(
        <div>
            <div className='MainPage-Navigation-Bar'>
                <Menu displayComponentIndexFunction={props.displayComponentIndexFunction} darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode}/>
                <div className='MainPage-Navigation-Logo-Container'>
                    <img src='/imgs/MindMenderBlack.png' className="MainPage-Navigation-Logo" draggable='false' alt="logo"/>
                </div>
                <ToggleDarkModeButton>
                    {/* {props.darkMode ? <p onClick={props.toggleDarkMode}>Switch Light Mode</p> : <p onClick={props.toggleDarkMode}>Switch Dark Mode</p>} */}
                </ToggleDarkModeButton>
            </div>
            <div className='MainPage-Navigation-Bar-Background'/>
        </div>
    );
};

const ToggleDarkModeButton = styled.div`
    cursor: pointer;
`;

export default Navigation;