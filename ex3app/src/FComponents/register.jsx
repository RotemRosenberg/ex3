import React, { useState } from 'react';

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

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		confirmPassword: '',
		profilePicture: '', // To store the file selected by the user
		name: '',
		familyName: '',
		email: '',
		birthDate: '',
		city: '',
		street: '',
		number: '',
	});

	const [messageInputPic, setMessageInputPic] = useState('');
  const [messageRegister, setmessageRegister] = useState('');
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

	const registerUser = (user) => {
		const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
		// Check if the username already exists
		const isUserExist = existingUsers.find(
			(existingUser) =>
				existingUser.email === user.email ||
				existingUser.username === user.username
		);

		if (isUserExist) {
			setmessageRegister('User already exists. email or username already exist');
			return false;
		}
		existingUsers.push(user);
		localStorage.setItem('users', JSON.stringify(existingUsers));
		setmessageRegister('User registered successfully.');
		console.log('User registered:', user);
		console.log(existingUsers);
	};

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

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;

		// Check if the input is a file input
		if (type === 'file') {
			//For file input, use files[0] to get the selected file
			setFormData((prevData) => ({
				...prevData,
				[name]: files[0],
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
				// Create an object URL for the file
				const objectURL = URL.createObjectURL(file);
				setFormData((prevData) => ({
					...prevData,
					profilePicture: objectURL,
				}));
				setMessageInputPic('Image Inserted');
			} else {
				setMessageInputPic('Image format has to be .jpg or .jpeg');
				setFormData((prevData) => ({
					...prevData,
					profilePicture: '',
				}));
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			(formData.email !== '' &&
				!/^[^\s@]+@[^\s@]+\.(com)$/.test(formData.email)) ||
			(formData.familyName !== '' && !/^\p{L}+$/u.test(formData.familyName)) ||
			(formData.name !== '' && !/^\p{L}+$/u.test(formData.name)) ||
			formData.confirmPassword !== formData.password ||
			(formData.password !== '' &&
				!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,12}$/.test(
					formData.password
				)) ||
			(formData.username !== '' &&
				!/^[a-zA-Z0-9!@#$%^&*()-_+=|<>?{}[\]:";'.,~\\/]{1,60}$/.test(
					formData.username
				)) ||
			formData.profilePicture === '' ||
			(formData.birthDate !== '' && !isValidDate(formData.birthDate)) ||
			(formData.street !== '' && !/^[א-ת\s']+$/i.test(formData.street)) ||
			(formData.number !== '' && !/^[0-9]+$/.test(formData.number))
		) {
			console.log('Form has errors. Submission prevented.');
			// You can add additional logic here, such as displaying an error message
			return;
		}

		const user = {
			username: formData.username,
			password: formData.password,
			confirmPassword: formData.confirmPassword,
			profilePicture: formData.profilePicture, // To store the file selected by the user
			name: formData.name,
			familyName: formData.familyName,
			email: formData.email,
			birthDate: formData.birthDate,
			city: formData.city,
			street: formData.street,
			number: formData.number,
		};
		if (registerUser(user)) {
			console.log('Form Data:', formData);
		}
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
			// style={{ backgroundColor: '#f0f0f0' }}
			>
			<div>
				<Typography component="h1" variant="h5" style={{ color: '#000000' }}>
					Register
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Username"
								name="username"
								value={formData.username}
								onChange={handleChange}
								required
								error={
									formData.username !== '' &&
									!/^[a-zA-Z0-9!@#$%^&*()-_+=|<>?{}[\]:";'.,~\\/]{1,60}$/.test(
										formData.username
									)
								}
							/>
							{formData.username !== '' &&
								!/^[a-zA-Z0-9!@#$%^&*()-_+=|<>?{}[\]:";'.,~\\/]{1,60}$/.test(
									formData.username
								) && (
									<FormHelperText error>
										Username must contain only Latin letters (a-z, A-Z),
										numbers, and special characters. Maximum length is 60
										characters.
									</FormHelperText>
								)}
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Password"
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
								error={
									formData.password !== '' &&
									!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,12}$/.test(
										formData.password
									)
								}
							/>
							{formData.password !== '' &&
								!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,12}$/.test(
									formData.password
								) && (
									<FormHelperText error>
										Password must be 7 to 12 characters long and contain at
										least one special character, one uppercase letter, and one
										number.
									</FormHelperText>
								)}
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Confirm Password"
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								error={formData.confirmPassword !== formData.password}
							/>
							{formData.confirmPassword !== formData.password && (
								<FormHelperText error>Passwords do not match</FormHelperText>
							)}
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								error={formData.name !== '' && !/^\p{L}+$/u.test(formData.name)}
							/>
							{formData.name !== '' && !/^\p{L}+$/u.test(formData.name) && (
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
								value={formData.familyName}
								onChange={handleChange}
								required
								error={
									formData.familyName !== '' &&
									!/^\p{L}+$/u.test(formData.familyName)
								}
							/>
							{formData.familyName !== '' &&
								!/^\p{L}+$/u.test(formData.familyName) && (
									<FormHelperText error>
										Name must contain only letters.
									</FormHelperText>
								)}
						</Grid>
						<Grid item xs={12}>
							{/* <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profilePicture"
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                /> */}
							<label htmlFor="profilePicture">
								<Button fullWidth variant="outlined" component="span">
									<input
										accept="image/*"
										style={{ display: 'none' }}
										id="profilePicture"
										type="file"
										name="profilePicture"
										onChange={handleFileChange}
									/>
									Upload Profile Picture
								</Button>
							</label>
							<FormHelperText>{messageInputPic}</FormHelperText>
						</Grid>
						{/* Add more fields as needed */}
					</Grid>
					<Grid item xs={12} sm={6} style={{ marginTop: '10px' }}>
						<TextField
							fullWidth
							label="Email"
							type="text"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							//error={formData.email !== '' && !/^[a-zA-Z@.]+\.com$/.test(formData.email)}
							error={
								formData.email !== '' &&
								!/^[^\s@]+@[^\s@]+\.(com)$/.test(formData.email)
							}
						/>
						{formData.email !== '' &&
							!/^[^\s@]+@[^\s@]+\.(com)$/.test(formData.email) && (
								<FormHelperText error>
									Only English letters and special characters are allowed. The
									'@' symbol appears only once, and at the end of the text,
									there should be '.com' only.
								</FormHelperText>
							)}
					</Grid>
					<Grid item xs={12} sm={6} style={{ marginTop: '10px' }}>
						<TextField
							fullWidth
							label="Birth Date"
							type="date"
							name="birthDate"
							value={formData.birthDate}
							onChange={handleChange}
							required
							// You can add the min attribute to prevent future dates
							InputLabelProps={{ shrink: true }}
							inputProps={{ max: new Date().toISOString().split('T')[0] }}
						/>
						{/* Error message for birth date */}
						{formData.birthDate !== '' && !isValidDate(formData.birthDate) && (
							<FormHelperText error>
								Invalid birth date. Please enter a valid and not a future date.
							</FormHelperText>
						)}
					</Grid>
					<Grid container spacing={2} style={{ marginTop: '10px' }}>
						<Grid item xs={12}>
							{/* Autocomplete for city */}
							<Autocomplete
								name="city"
								value={formData.city}
								onChange={(event, newValue) =>
									handleChange({ target: { name: 'city', value: newValue } })
								}
								options={centralCities}
								renderInput={(params) => (
									<TextField
										{...params}
										label="City"
										name="city"
										value={formData.city}
										onChange={handleChange}
										required
										error={formData.city !== '' && !isValidCity(formData.city)}
									/>
								)}
							/>
							{/* Error message for city */}
							{formData.city !== '' && !isValidCity(formData.city) && (
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
								value={formData.street}
								onChange={handleChange}
								required
								// Regex validation for Hebrew letters
								error={
									formData.street !== '' &&
									!/^[א-ת\s']+$/i.test(formData.street)
								}
							/>
							{/* Error message for street */}
							{formData.street !== '' &&
								!/^[א-ת\s']+$/i.test(formData.street) && (
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
								value={formData.number}
								onChange={handleChange}
								required
								// Regex validation for Hebrew letters
								error={
									formData.number !== '' && !/^[0-9]+$/.test(formData.number)
								}
							/>
							{/* Error message for street */}
							{formData.number !== '' && !/^[0-9]+$/.test(formData.number) && (
								<FormHelperText error>
									Invalid input. Please enter only numbers.
								</FormHelperText>
							)}
						</Grid>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						style={{ marginTop: '10px' }}>
						Register
					</Button>
				</form>
        {messageRegister}
			</div>
		</Container>
	);
};

export default Register;
