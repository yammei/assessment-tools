import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/signup', {
        username,
        password,
      });


      console.log('signup successful:', response.data);

      // Navigate to the dashboard or another page upon successful signup
      navigate('/');

      // Reset the form after submission
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('signup failed:', error.message);
      // Handle signup error, show a message to the user, etc.
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className='Form'>
      <p className='Form-Header'>Signup</p>
      <input className='Form-Textbox' type="text" placeholder='Username' value={username} onChange={handleUsernameChange} onKeyDown={handleEnterPress}/>
      <input className='Form-Textbox' type="password" placeholder='Password' value={password} onChange={handlePasswordChange} onKeyDown={handleEnterPress}/>
      <button className='Form-Submit' onClick={handleSignup}>Signup</button>

    </div>
  );
};

export default SignupForm;
