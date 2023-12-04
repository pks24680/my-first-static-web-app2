//import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const NewUser = () => {

    const [jsonData, setJsonData] = useState({
        username: "user1",
        password: "password1"
      });
    
      const handleInputChange = (e, path) => {
        const { value } = e.target;
        setJsonData((prevData) => {
          // Using the spread operator to create a shallow copy of the previous state
          const newData = { ...prevData };
    
          // Use the path to navigate through the nested structure and update the value
          let currentLevel = newData;
          const keys = path.split('.');
          for (let i = 0; i < keys.length - 1; i++) {
            currentLevel = currentLevel[keys[i]];
          }
          currentLevel[keys[keys.length - 1]] = value;
    
          return newData;
        });
      };

    return(
        <div>
        <h1>Create User</h1>
        <form>
          <label>
            Username:
            <input
              type="text"
              value={jsonData.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={jsonData.age}
              onChange={(e) => handleInputChange(e, 'age')}
            />
          </label>
        </form>
        <div>
          <h2>Updated JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      </div>
    );
};

export default NewUser;