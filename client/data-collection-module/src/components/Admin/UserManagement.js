import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, Dialog, DialogActions, 
  DialogContent, DialogTitle, TablePagination 
} from '@mui/material';
import { FaUserPlus } from 'react-icons/fa';
import UserForm from './UserForm';
import ConfirmationDialog from './ConfirmationDialog';
import api from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, userId: null });

  useEffect(() => {
    fetchRecentUsers();
  }, []);

  const fetchRecentUsers = () => {
    api.get('/admin/users/recent')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching recent users:', error));
  };

  const handleSearch = () => {
    api.get(`/admin/users?email=${searchEmail}`)
    .then(response => setUsers([response.data]))
      .catch(error => console.error('Error fetching User:', error));
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setOpenForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleDeleteUser = (userId) => {
    setConfirmDialog({ isOpen: true, userId });
  };

  const confirmDeleteUser = () => {
    api.delete(`/admin/deleteUser/${confirmDialog.userId}`)
      .then(() => {
        setUsers(users.filter(u => u.userId !== confirmDialog.userId));
        setConfirmDialog({ isOpen: false, userId: null });
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleFormSubmit = (formData) => {
    if (selectedUser) {
      // Update existing user
      api.put(`/admin/updateUser/${selectedUser.userId}`, formData)
        .then(response => {
          setUsers(users.map(u => u.userId === selectedUser.userId ? response.data : u));
          setOpenForm(false);
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      // Add new user
      api.post('/admin/addUser', { ...formData, role: 'USER' })
        .then(response => {
          setUsers([...users, response.data]);
          setOpenForm(false);
        })
        .catch(error => console.error('Error adding user:', error));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom> User Management </Typography>
      
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField 
          label="Search by Email" 
          variant="outlined" 
          value={searchEmail} 
          onChange={(e) => setSearchEmail(e.target.value)}
          sx={{ marginRight: 2 }} 
        />
        <Button variant="contained" onClick={handleSearch} sx={{ marginRight: 2 }}>Search</Button>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<FaUserPlus />} 
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.isVerified ? 'Verified' : 'Unverified'}</TableCell>
                <TableCell>
                  <Button variant="outlined" sx={{ marginRight: 1, color: 'blue' }} onClick={() => handleEditUser(user)}>Edit</Button>
                  <Button variant="outlined" sx={{ color: 'red' }} onClick={() => handleDeleteUser(user.userId)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{selectedUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <UserForm initialValues={selectedUser} onSubmit={handleFormSubmit} buttonText={selectedUser ? 'Update User' : 'Add User'} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onConfirm={confirmDeleteUser}
        onCancel={() => setConfirmDialog({ isOpen: false, userId: null })}
        message="Are you sure you want to delete this user?"
      />
    </Box>
  );
};

export default UserManagement;