//import { Link } from 'react-router-dom';
import * as React from 'react';
import './Dashboard.css';
import { Switch } from '@mui/material';

const Dashboard = () => {

  const handleTable = () => {
    window.location.href = "/tableTest";
  }

  const handleWord = () => {
    window.location.href = "/WordTest";
  }

    return(  
      <div className='dashpage'>
          <div>
            <h1>RCM Dashboard</h1>
            <button className="tableBtn" onClick={handleTable}>Table</button>
            <Switch/>
          </div>
          <div className='functions'>
            <button class="butt new" onClick={handleWord}>New RCM</button>
            <button class="butt view" onClick={handleWord}>View RCM</button>
            <button class="butt edit" onClick={handleWord}>Edit RCM</button>
            <button class="butt share" onClick={handleWord}>Share RCM</button>
          </div>
      </div>
    );
};

export default Dashboard;