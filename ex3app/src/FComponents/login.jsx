import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  TextField,
  Button,
  Grid,

} from '@mui/material';
import Profile from './profile';

function Login({ onLogin }) {

  const [loggedUser, setLoggedUser] = useState('');

  const [formLoginData, setFormLoginData] = useState({
    username: '',
    password: '',
  });
const [loginMessage,setLoginMessage]= useState('')



const loginUser = () => {


  const users = JSON.parse(localStorage.getItem('users')) || []
  // Find a user with the given username and password
  const loggedInUser = users.find(user => user.username === formLoginData.username && user.password === formLoginData.password);
  if (loggedInUser) {
    console.log('Login successful! Welcome, ', loggedInUser.name);
    setLoginMessage('Login successful! Welcome, ' + loggedInUser.username)
    // Save the logged-in user in sessionStorage
    sessionStorage.setItem('loggedUser', JSON.stringify(loggedInUser));
    // setUser(loggedInUser);
    onLogin(loggedInUser);
    setLoggedUser(loggedInUser)
    return loggedInUser;
  } else {
    setLoginMessage('Invalid username or password. Please try again.')

    console.log('Invalid username or password. Please try again.');
    return null;
  }
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
 }
const handleSubmit = (e) => {
      // Add your registration logic here
      e.preventDefault();

      loginUser();
      console.log('Form LoginData:', formLoginData);
    };

  return (
    <div style={{backgroundColor:'#ffffff'}}>
          <Typography component="h1" variant="h5" style={{ color: '#000000' }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{marginTop:'10px',marginBottom:'10px'}}>
              <Grid item xs={12} sm={6} style={{marginBottom:'10px'}} >
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formLoginData.username}
                  onChange={handleChange}
                  required
                  />
              </Grid>
              <Grid item xs={12} sm={6}  style={{marginBottom:'10px'}}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formLoginData.password}
                  onChange={handleChange}
                  required
                  />
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop:'10px'}}>
              Login
            </Button>
            </form>

            <div><p style={{color:'black'}}>{loginMessage}</p></div>



    </div>
  )
 }

export default Login