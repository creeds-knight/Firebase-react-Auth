import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  console.log('PrivateUser', user);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          />
          <Route path="" element={<Navigate to="/signup" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
