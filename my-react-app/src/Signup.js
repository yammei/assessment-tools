import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  // Update textbox values
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordCheckChange = (event) => {
    setPasswordCheck(event.target.value);
  };

  const handleSignup = async () => {
    if (password === passwordCheck) {
      try {
        const response = await axios.post('http://localhost:4000/api/signup', {
          username,
          email,
          password,
        });

        console.log('signup successful:', response.data);

        // Navigate to the dashboard or another page upon successful signup
        navigate('/');

        // Reset the form after submission
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordCheck('');
      } catch (error) {
        console.error('signup failed:', error.message);
        // Handle signup error, show a message to the user, etc.
      }
    } else {
      console.log(`Passwords do not match.`);
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
      <input className='Form-Textbox' type="text" placeholder='Email' value={email} onChange={handleEmailChange} onKeyDown={handleEnterPress}/>
      <input className='Form-Textbox' type="password" placeholder='Password' value={password} onChange={handlePasswordChange} onKeyDown={handleEnterPress}/>
      <input className='Form-Textbox' type="password" placeholder='Re-Enter Password' value={passwordCheck} onChange={handlePasswordCheckChange} onKeyDown={handleEnterPress}/>
      <button className='Form-Submit' onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default SignupForm;
