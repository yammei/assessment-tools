import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/logout');

      localStorage.removeItem('username');
      localStorage.removeItem('userId');

      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className='Logout-Container'>
      <p onClick={handleLogout}>Logout</p>
    </div>
  );
};

export default Logout;


