import React, { useEffect, useState } from 'react';
import {
	TextField,
	Button,
	Container,
	Typography,
	FormControl,
	Grid,
	Paper,
	Avatar,
	Link,
} from '@mui/material';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import EditDetails from './editDetails';
import PropTypes from 'prop-types';

function Profile({ loggedUser, onLogout }) {
	const [showUpdate, setShowUpdate] = useState(false);

  const [user, setUser] = useState(
		JSON.parse(sessionStorage.getItem('loggedUser')) || ''
	);

	const handleUpdateButtonClick = () => {
		setShowUpdate((prevState) => !prevState);
	};

  const handleUpdate = (updatedUserData) => {
    // Update the user data in the Profile component
    setUser(updatedUserData);

    // You can also update the data in sessionStorage if needed
    sessionStorage.setItem('loggedUser', JSON.stringify(updatedUserData));
  };

	Profile.propTypes = {
		loggedUser: PropTypes.object.isRequired,
		onLogout: PropTypes.func.isRequired,
	};

	const ProfileStyle = {
		paperStyle: {
			padding: 20,
			// height: '50vh',
			// width: 700,
			margin: '20px auto',
		},
		avatarStyle: {
			marginBottom: 15,
			backgroundColor: 'rgb(19, 172, 126)',
		},
		profilePictureStyle: {
			width: '100px',
			height: '100px',
			borderRadius: '60px',
			border: '2px solid black',
			padding: '2px',
		},
	};


	console.log(user.profilePicture);
	//const user = JSON.parse(sessionStorage.getItem('loggedUser')) || ''

	const handleLogoutClick = (email) => {
		const loggedInUserEmail = user.email;
		console.log('loginUser email', loggedInUserEmail);
		console.log('email', email);
		if (loggedInUserEmail === email) {
			sessionStorage.removeItem('loggedUser');
			setUser('');
			onLogout();
		} else {
			console.log('The provided email does not match the logged-in user.');
		}
		console.log('Logout button clicked');
	};

	const handleGameClick = () => {
		window.open(
			'https://games.moomoo.co.il/2802.html',
			'_blank'
		);
	};

	return (
		<Grid>
			<Paper elevation={1} style={ProfileStyle.paperStyle}>
				<Container maxWidth="xl">
					<Typography
						variant="h4"
						align="center"
						fontWeight="bold"
						gutterBottom>
						My Profile
					</Typography>
					<div>
						{user.profilePicture && (
							<img
								src={user.profilePicture}
								style={ProfileStyle.profilePictureStyle}
							/>
						)}
					</div>
					<h3>
						{user.name} {user.familyName}
					</h3>
					<div>
						<p>{user.email}</p>
						<p>
							{user.street} {user.number}, {user.city}{' '}
						</p>
					</div>
					<p>{user.birthDate}</p>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								size="large"
								onClick={handleUpdateButtonClick}>
								Update Details
							</Button>
						</Grid>
						<Grid item xs={4}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								size="large"
								onClick={handleGameClick}>
								Game
							</Button>
						</Grid>
						<Grid item xs={4}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								size="large"
								onClick={() => handleLogoutClick(user.email)}>
								Log out
							</Button>
						</Grid>
					</Grid>
					{showUpdate ? <EditDetails userToEdit={user} onUpdate={handleUpdate} ></EditDetails> : <></>}
				</Container>
			</Paper>
		</Grid>
	);
}

export default Profile;
