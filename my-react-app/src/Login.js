import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSuccessfulLogin = (username, id) => {
    // Store the username in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('userId', id);

    // Navigate to MainPage.js
    navigate('/MainPage');

    // Reset the form and error message after submission
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
      });

      console.log('login successful:', response.data);
      const id = response.data.user.id;
      console.log('login successful:', id);

      handleSuccessfulLogin(username, id);
    } catch (error) {
      console.error('login failed:', error.message);
      if (error.response && error.response.data) {
        setLoginError(error.response.data.error);
      } else {
        setLoginError('An error occurred during login.');
      }
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='Form'>
      <p className='Form-Header'>Login</p>
        <input className='Form-Textbox' type="text" placeholder='Username' value={username} onChange={handleUsernameChange} onKeyDown={handleEnterPress}/>
        <input className='Form-Textbox' type="password" placeholder='Password' value={password} onChange={handlePasswordChange} onKeyDown={handleEnterPress}/>
        <button className='Form-Submit' onClick={handleLogin}>Login</button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>
  );
};

export default LoginForm;
