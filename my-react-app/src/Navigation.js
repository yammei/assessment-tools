import Scores from './Scores';
import Logout from './Logout';
import History from './History';
import Menu from './Menu';

const Navigation = (props) => {
    return(
        <div>
            <div className='MainPage-Navigation-Bar'>
                <Menu displayComponentIndexFunction={props.displayComponentIndexFunction}/>
                <div className='MainPage-Navigation-Logo-Container'>
                    <img src='/imgs/MindMenderBlack.png' className="MainPage-Navigation-Logo" draggable='false' alt="logo"/>
                </div>
            </div>
            <div className='MainPage-Navigation-Bar-Background'/>
        </div>
    );
};

export default Navigation;