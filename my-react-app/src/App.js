import React, { useState } from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import './App.css';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);

  // Swap between <LoginForm/> and <Signup/> forms.
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowBackButton(!showBackButton);
  };

  return (
    <div className="App">

        <img src='/imgs/PsychologyWallpaper.jpg' className="App-Background" draggable='false' alt="background"/>

        <div className='App-Content-Container'>

          <div className='App-Left-Container'>
            <div className='App-Banner-Container'>
              {/* <img src='/imgs/MindMender.png' className="App-Form-Logo" draggable='false' alt="logo"/> */}
              <p style={{fontSize: '28pt', fontWeight: 'bold', marginBottom: '20px'}}>Our Mission.<br/></p>
              <p>
                Mind Mender's enables you to analyze your EQ (emotional intelligence) and well-being; 
                helping you be the best you. 
              </p>
            </div>
            <img src='/imgs/PolygonGroup.png' className="App-Foreground" draggable='false' alt="foreground"/>
          </div>

          <div className='App-Right-Container'>
            <div className='App-Form-Container'>
            <img src='/imgs/MindMenderBlack.png' className="App-Form-Logo" style={{margin: '-75px', opacity: .9}} draggable='false' alt="logo"/>
                {showBackButton ? <svg className='App-Back-Button' onClick={toggleForm} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg> : ''}
                {showLoginForm ? <LoginForm/> : <SignupForm/>}
                <p className="App-link" onClick={toggleForm} rel="noopener noreferrer">
                  {showLoginForm ? 'No Account? ' : 'Forgot Password?'}
                  {showLoginForm && <span className='App-Signup-Text'>Sign up!</span>}
                </p>
            </div>
          </div>

        </div>

    </div>
  );

}

export default App;
