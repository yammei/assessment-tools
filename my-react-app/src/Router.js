
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './Signup';
//import Dashboard from './Dashboard';
import App from './App';
import LoginForm from './Login';
import MainPage from './MainPage';
import Assessment1 from './Assessments/AssessmentTemplates/Assessment1';
import Assessment2 from './Assessments/AssessmentTemplates/Assessment2';
import Scores from './Scores';
import Logout from './Logout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/assessment1" element={<Assessment1 />} />
        <Route path="/assessment2" element={<Assessment2 />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/logout" element={<Logout />} />

        {/* routes as needed */}
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
