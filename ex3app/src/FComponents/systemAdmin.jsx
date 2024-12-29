import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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
import { useState } from 'react';

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'username', headerName: 'username', width: 130 },
	{ field: 'street', headerName: 'street', width: 130 },
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 90,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params) =>
			`${params.row.firstName || ''} ${params.row.lastName || ''}`,
	},
	{
		field: 'remove',
		headerName: 'remove',
		width: 160,
		renderCell: (cellValues) => (
			<strong>
				<Button variant="contained" size="small" style={{ marginLeft: 16 }}>
					remove
				</Button>
			</strong>
		),
	},
	{
		field: 'edit',
		headerName: 'edit',
		renderCell: (cellValues) => (
			<strong>
				<Button variant="contained" size="small" style={{ marginLeft: 16 }}>
					edit
				</Button>
			</strong>
		),
	},
];

export default function DataTable() {
	const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')));
	const loadUsers = () => {
		// console.log(usersData);
		const users = JSON.parse(localStorage.getItem('users')) || '';
		console.log('Users:', users);
		setUsers(users);
	};
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={users}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				pageSizeOptions={[5, 10]}
				getRowId={(row) => row.email}
				// checkboxSelection
			/>
		</div>
	);
}
