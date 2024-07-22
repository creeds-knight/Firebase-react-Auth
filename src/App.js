import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Signup />} /> {/* Default to signup page */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
