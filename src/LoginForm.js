import React, {useState} from 'react';
import './Login.css';
//import logins from './logins.json';
// import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [pickColour, setPickColour] = useState("transparent");

    const handleLogin = async (e) => {
        e.preventDefault();
        // const user = logins.users.find(
        //     (u) => u.username === username && u.password === password
        // );

        // if (user){
        //     setPickColour("transparent")
        //     window.location.href = '/Dashboard';
        // } else {
        //     setPickColour("red")
        // }

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password}),
            });

            if (response.ok) {
                setPickColour("transparent");
                window.location.href = '/Dashboard';
                console.log('Authentication Successful');
            } else {
                setPickColour("red");
                console.log('Authentication Failed');               
            }
        } catch (error) {
            setPickColour("red");
            console.error('Error during authentication:', error);
        }
    };

    return(
        <div className="cover">
            <h1>Welcome</h1>
            <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            
            <p className="tryAgain" style={{color: pickColour}}> Incorrect username or password </p>
        
            <div className='loginBtn' onClick={handleLogin}>Login</div>
        </div>
    );
};

export default LoginForm;