import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import TableTest from './TableTest';
import WordTest from './WordCreator';


function App() { 
  return(
    <div className='page'>
      <Routes>
        <Route path="/" exact element={<LoginForm/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/TableTest" element={<TableTest/>}/>
        <Route path="/WordTest" element={<WordTest/>}/>
      </Routes>
    </div>
  );
}

export default App;
