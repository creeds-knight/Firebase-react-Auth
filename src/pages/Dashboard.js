import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>DASHBOARD</h2>
      <p> Welcome to, {user ? user.username : 'Guest'}! trial for logging in </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
