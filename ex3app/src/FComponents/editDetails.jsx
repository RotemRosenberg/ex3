import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  FormHelperText,
  Avatar,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// ... (previous imports)



const EditDetails = ({userToEdit,onUpdate}) => {

    const [messageInputPic,setMessageInputPic]=useState("")

    const [messageUpdate, setMessage] = useState('')


    const [formDataUpdate, setformDataUpdate] = useState({
      
      username: '',
      email:'',
      password: '',
      confirmPassword: '',
      profilePicture: '', // To store the file selected by the user
      name: '',
      familyName: '',
      birthDate:'',
      city: '',
      street: '',
      number: '',
    });


    EditDetails.propTypes = {
      userToEdit: PropTypes.object.isRequired,
    };

    useEffect(() => {
      // const user = JSON.parse(sessionStorage.getItem('loggedUser')) || ''
      setformDataUpdate(userToEdit)
      console.log(formDataUpdate);
    }, []);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          if (file.type === "image/jpeg" || file.type === "image/jpg") {
              // Create an object URL for the file
              const objectURL = URL.createObjectURL(file);
              setformDataUpdate((prevData) => ({
                ...prevData,
                profilePicture: objectURL,
              }));
              setMessageInputPic("Image Inserted")


          
          }
          else{
            setMessageInputPic("Image format has to be .jpg or .jpeg");
            setformDataUpdate((prevData) => ({
              ...prevData,
              profilePicture: '',
            }));
          }
        }
    };
    

    const centralCities = [
      'תל אביב',
      'ירושלים',
      'חיפה',
      'פתח תקווה',
      'ראשון לציון',
      'בני ברק',
      'חולון',
      'רמת גן',
      'אשדוד',
      'נתניה',
      'אשקלון',
      'בת ים',
      'הרצליה',
      'קרית אתא',
      'רעננה',
      'לוד',
      'נצרת',
      'חדרה',
      'כפר סבא',
      'עכו',
      'קרית ים',
      'אור יהודה',
      'קרית מוצקין',
      'נס ציונה',
      'רהט',
      'נוף הגליל',
      'זכרון יעקב',
      'יבנה',
      'גבעתיים',
    ];
      
    const isValidDate = (dateString) => {
      const currentDate = new Date();
      const selectedDate = new Date(dateString);
  
      // Check if it's a valid date and not a future date
      return !isNaN(selectedDate.getTime()) && selectedDate <= currentDate;
    };

    const isValidCity = (city) => {
      // Add your logic to check if the city is in a valid list of cities in Israel
      // For example, you can have an array of valid city names and check if the entered city is in that array.
      return centralCities.includes(city);
    };


    const editUser = (updateUser) => {
      // 1. Get users data from local storage (or create an empty array if not found)
      const users = JSON.parse(localStorage.getItem('users')) || [];
    
      // 2. Find the user that needs to be updated using the email
      const userIndex = users.findIndex(user => user.email === updateUser.email);
    
      // 3. Check if the user is found
      if (userIndex !== -1) {
        // 4. Update the user at the found index
        users[userIndex] = updateUser;
        onUpdate(updateUser);
        // 5. Update local storage with the modified user array
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('loggedUser', JSON.stringify(updateUser));
        
        console.log(users)
      } else {
        // 6. Handle the case where the user is not found (optional)
        console.warn(`User with email "${updateUser.email}" not found in local storage.`);
      }
    };
    
  
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
  
      // Check if the input is a file input
      if (type === 'file') {
        // For file input, use files[0] to get the selected file
        setformDataUpdate((prevData) => ({
          ...prevData,
          [name]: files[0],
        }));
      } else {
        setformDataUpdate((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      if (
        formDataUpdate.familyName !== '' && !/^\p{L}+$/u.test(formDataUpdate.familyName) ||
        formDataUpdate.name !== '' && !/^\p{L}+$/u.test(formDataUpdate.name) ||
        formDataUpdate.confirmPassword !== formDataUpdate.password ||
        formDataUpdate.password !== '' && !/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,12}$/.test(formDataUpdate.password) ||
        formDataUpdate.username !== '' && !/^[a-zA-Z0-9!@#$%^&*()-_+=|<>?{}[\]:";'.,~\\/]{1,60}$/.test(formDataUpdate.username) ||
        formDataUpdate.profilePicture === '' ||
        formDataUpdate.birthDate !== '' && !isValidDate(formDataUpdate.birthDate) ||
        formDataUpdate.street !== '' && !/^[א-ת\s']+$/i.test(formDataUpdate.street)||
        formDataUpdate.number !== '' && !/^[0-9]+$/.test(formDataUpdate.number)

      ) {
        console.log('Form has errors. Submission prevented.');
      setMessage("Update failed");

        // You can add additional logic here, such as displaying an error message
        return;
      }
      editUser(formDataUpdate);
      setMessage("Update success");

    }

    return (
      <Container component="main" maxWidth="xs" style={{ marginTop:'20px' }}>
        <div>

          <Typography component="h1" variant="h5" style={{ color: '#000000' }}>
            EditDetails
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formDataUpdate.username}
                  onChange={handleChange}
                  required
                  error={formDataUpdate.username !== '' && !/^[a-zA-Z0-9!@#$%^&*()-_+=|<>?{}[\]:";'.,~\\/]{1,60}$/.test(formDataUpdate.username)}
                  />
                  {formDataUpdate.username !== '' && !/^[a-zA-Z0-9!@#$%^&*()-_+=|<>?{}[\]:";'.,~\\/]{1,60}$/.test(formDataUpdate.username) && (
                <FormHelperText error>
                 Username must contain only Latin letters (a-z, A-Z), numbers, and special characters. Maximum length is 60 characters.
                </FormHelperText>
              )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formDataUpdate.password}
                  onChange={handleChange}
                  required
                  error={formDataUpdate.password !== '' && !/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,12}$/.test(formDataUpdate.password)}
                  />
                  {formDataUpdate.password !== '' && !/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,12}$/.test(formDataUpdate.password) && (
                <FormHelperText error>
                Password must be 7 to 12 characters long and contain at least one special character, one uppercase letter, and one number.
                </FormHelperText>
              )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formDataUpdate.confirmPassword}
                  onChange={handleChange}
                  required
                  error={formDataUpdate.confirmPassword !== formDataUpdate.password}
                />
                 {formDataUpdate.confirmPassword !== formDataUpdate.password && (
                <FormHelperText error>
                    Passwords do not match
                </FormHelperText>
              )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formDataUpdate.name}
                  onChange={handleChange}
                  required
                  error={formDataUpdate.name !== '' && !/^\p{L}+$/u.test(formDataUpdate.name)}
                />
                {formDataUpdate.name !== '' && !/^\p{L}+$/u.test(formDataUpdate.name) && (
              <FormHelperText error>
               Name must contain only letters.
              </FormHelperText>
            )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Family Name"
                  name="familyName"
                  value={formDataUpdate.familyName}
                  onChange={handleChange}
                  required
                  error={formDataUpdate.familyName !== '' && !/^\p{L}+$/u.test(formDataUpdate.familyName)}

                />
                {formDataUpdate.familyName !== '' && !/^\p{L}+$/u.test(formDataUpdate.familyName) && (
              <FormHelperText error>
               Name must contain only letters.
              </FormHelperText>
            )}
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profilePicture"
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                />
                <label htmlFor="profilePicture">
                  <Button
                    fullWidth
                    variant="outlined"
                    component="span"
                  >
                    Upload Profile Picture
                  </Button>
                </label>
                <FormHelperText>
                  {messageInputPic}
                </FormHelperText>
              </Grid>
              {/* Add more fields as needed */}
            </Grid>
            <Grid item xs={12} sm={6} style={{marginTop:'10px'}} >
            <TextField
              fullWidth
              label="Birth Date"
              type="date"
              name="birthDate"
              value={formDataUpdate.birthDate}
              onChange={handleChange}
              required
              // You can add the min attribute to prevent future dates
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split('T')[0] }}
            />
            {/* Error message for birth date */}
            {formDataUpdate.birthDate !== '' && !isValidDate(formDataUpdate.birthDate) && (
              <FormHelperText error>
                Invalid birth date. Please enter a valid and not a future date.
              </FormHelperText>
            )}
          </Grid>
          <Grid container spacing={2} style={{marginTop:'10px'}}>

          <Grid item xs={12}>
            {/* Autocomplete for city */}
            <Autocomplete
              name="city"
              value={formDataUpdate.city}

              onChange={(event, newValue) => handleChange({target: {name: "city", value: newValue}})}            
              options={centralCities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  name="city"
                  value={formDataUpdate.city}
                  onChange={handleChange}
                  required
                  error = {formDataUpdate.city !== '' && !isValidCity(formDataUpdate.city)} 
                />
              )}
            />
            {/* Error message for city */}
            {formDataUpdate.city !== '' && !isValidCity(formDataUpdate.city) && (
              <FormHelperText error>
                Invalid city. Please select a city from the list.
              </FormHelperText>
            )}
          </Grid>




          <Grid item xs={12} sm={6}>
            {/* TextField for street */}
            <TextField
              fullWidth
              label="Street"
              name="street"
              value={formDataUpdate.street}
              onChange={handleChange}
              required
              // Regex validation for Hebrew letters
              error={formDataUpdate.street !== '' && !/^[א-ת\s']+$/i.test(formDataUpdate.street)}
            />
            {/* Error message for street */}
            {formDataUpdate.street !== '' && !/^[א-ת\s']+$/i.test(formDataUpdate.street) && (
              <FormHelperText error>
                Invalid street. Please enter only Hebrew letters.
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* TextField for street */}
            <TextField
              fullWidth
              label="Number"
              name="number"
              value={formDataUpdate.number}
              onChange={handleChange}
              required
              // Regex validation for Hebrew letters
              error={formDataUpdate.number !== '' && !/^[0-9]+$/.test(formDataUpdate.number)}
            />
            {/* Error message for street */}
            {formDataUpdate.number !== '' && !/^[0-9]+$/.test(formDataUpdate.number) && (
              <FormHelperText error>
                Invalid input. Please enter only numbers.
              </FormHelperText>
            )}
          </Grid>
          </Grid>

            <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop:'10px'}}>
              Update
            </Button>
            <div><p style={{color:'black'}}>{messageUpdate}</p></div>
            
          </form>
        </div>
      </Container>
    );
  };
  
  export default EditDetails;
  
