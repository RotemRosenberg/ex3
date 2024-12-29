import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import { createTheme } from '@mui/material';
import './App.css';
import Register from './FComponents/register';
import Login from './FComponents/login';
import Profile from './FComponents/profile';
import EditDetails from './FComponents/editDetails';
import SystemAdmin from './FComponents/systemAdmin';
import usersData from './utils/userData.js';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';

import { Avatar, Button, ThemeProvider } from '@mui/material';
import AdministratorSystem from './FComponents/FCsystemAdmin.jsx';

function App() {
	const [loggedUser, setLoggedUser] = useState('');
	const [showRegister, setShowRegister] = useState(false); // מנהל את הצגת טופס ה-Register

	const handleLogin = (user) => {
		setLoggedUser(user);
	};

	const handleLogout = () => {
		setLoggedUser(null);
	};

	const loadUsers = () => {
		console.log(usersData);
		const users = JSON.parse(localStorage.getItem('users')) || usersData;
		console.log('Users:', users);
		return users;
	};

	useEffect(() => {
		const savedUsers = JSON.parse(localStorage.getItem('users'));
		if (!savedUsers || savedUsers.length === 0) {
			localStorage.setItem('users', JSON.stringify(usersData));
		}
		const user = JSON.parse(sessionStorage.getItem('loggedUser'));
		setLoggedUser(user);
		loadUsers();
	}, []);

	const theme = createTheme({
		palette: {
			primary: { main: '#1976d2' },
			secondary: { main: '#9c27b0' },
		},
		typography: {
			fontFamily: 'Arial, sans-serif',
		},
		components: {
			MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: '8px' } } },
			MuiTextField: { styleOverrides: { root: { marginBottom: '15px' } } },
		},
	});
	

	return (
		<ThemeProvider theme={theme}>
			<div className='container'>
				<div>
					{loggedUser ? '' : <Login onLogin={handleLogin} />}
					{loggedUser ? (
						<Profile loggedUser={loggedUser} onLogout={handleLogout} />
					) : (
						<div
							style={{
								display: 'flex',
								textAlign: 'center',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Avatar
								style={{
									marginRight: '10px',
									backgroundColor: 'rgb(19, 172, 126)',
									textAlign: 'center',
								}}>
								<ManOutlinedIcon />
							</Avatar>
							<p>User is not logged in</p>
						</div>
					)}
				</div>
				{loggedUser &&
				loggedUser.username === 'admin' &&
				loggedUser.password === 'ad12343211ad' ? (
					<AdministratorSystem />
				) : (
					<></>
				)}

				{/* כפתור לפתיחת/סגירת טופס ה-Register */}
				{!loggedUser && (
					<div style={{ textAlign: 'center', marginTop: '20px' }}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setShowRegister(!showRegister)}>
							{showRegister ? 'Close Register Form' : 'Open Register Form'}
						</Button>
					</div>
				)}

				{/* טופס ה-Register */}
				{!loggedUser && showRegister && <Register />}
			</div>
		</ThemeProvider>
	);
}

export default App;
