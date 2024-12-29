import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@mui/material';
import EditDetails from './editDetails';

const AdministratorSystem = () => {
	const [users, setUsers] = useState([]);
	const [showEdit, setShowEdit] = useState(false);
	const [clickedUser, setclickedUser] = useState('');

	useEffect(() => {
		// Fetch users from local storage or your API
		const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
		// const storedUsersWithoutAdmin = storedUsers.filter((user) => user.username !== 'admin');
		setUsers(storedUsers);
	}, []);

	const handleEdit = (userEmail) => {
		// Implement your edit logic here
		setclickedUser(users.find((user) => user.email === userEmail));
		setShowEdit((prevState) => !prevState);
		// setShowEdit(true)
	};


	const handleDelete = (userEmail) => {
		// Implement your delete logic here
		// Assuming users have unique IDs, you can filter out the user to delete
		const updatedUsers = users.filter((user) => user.email !== userEmail);
		setUsers(updatedUsers);
		// Update local storage or API with the updated user list
		localStorage.setItem('users', JSON.stringify(updatedUsers));
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead >
						<TableRow >
							<TableCell>Username</TableCell>
							<TableCell>Full Name</TableCell>
							<TableCell>Birth Date</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Email</TableCell>
							{/* Add more columns as needed */}
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) =>
							user.username != 'admin' ? (
								<TableRow key={user.id}>
									<TableCell>{user.username}</TableCell>
									<TableCell>{`${user.name} ${user.familyName}`}</TableCell>
									<TableCell>{user.birthDate}</TableCell>
									<TableCell>{`${user.city}, ${user.street} ${user.number}`}</TableCell>
									<TableCell>{user.email}</TableCell>
									{/* Display more user attributes as needed */}
									<TableCell>
										<Button
											onClick={() => handleEdit(user.email)}
											variant="outlined"
											color="primary">
											Edit
										</Button>
										<Button
											onClick={() => handleDelete(user.email)}
											variant="outlined"
											color="secondary">
											Delete
										</Button>
									</TableCell>
								</TableRow>
							) : (
								''
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<div>
				{showEdit ? (
					<EditDetails userToEdit={clickedUser}></EditDetails>
				) : (
					<></>
				)}
			</div>
		</div>
	);
 
};

export default AdministratorSystem;
