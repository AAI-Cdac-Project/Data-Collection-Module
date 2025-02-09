import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, Dialog, DialogActions, 
  DialogContent, DialogTitle, TablePagination 
} from '@mui/material';
import { FaUserPlus } from 'react-icons/fa';
import VerifierForm from './VerifierForm';
import api from '../../services/api';
import ConfirmationDialog from './ConfirmationDialog';

const VerifierManagement = () => {
  const [verifiers, setVerifiers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [selectedVerifier, setSelectedVerifier] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, userId: null });


  useEffect(() => {
    fetchRecentVerifiers();
  }, []);

  const fetchRecentVerifiers = () => {
    api.get('/admin/verifiers/recent')
      .then(response => setVerifiers(response.data))
      .catch(error => console.error('Error fetching recent verifiers:', error));
  };

  const handleSearch = () => {
    api.get(`/admin/verifiers?email=${searchEmail}`)
      .then(response => setVerifiers([response.data]))
      .catch(error => console.error('Error fetching verifier:', error));
  };

  const handleAddVerifier = () => {
    setSelectedVerifier(null);
    setOpenForm(true);
  };

  const handleEditVerifier = (verifier) => {
    setSelectedVerifier(verifier);
    setOpenForm(true);
  };

  const handleDeleteVerifier = (userId) => {
    setConfirmDialog({ isOpen: true, userId });
  };

  //   api.delete(`/admin/deleteUser/${userId}`)
  //     .then(() => {
  //       setVerifiers(verifiers.filter(v => v.userId !== userId));
  //     })
  //     .catch(error => console.error('Error deleting verifier:', error));
  // };

  const confirmDeleteUser = () => {
    api.delete(`/admin/deleteUser/${confirmDialog.userId}`)
      .then(() => {
        setVerifiers(verifiers.filter(u => u.userId !== confirmDialog.userId));
        setConfirmDialog({ isOpen: false, userId: null });
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleFormSubmit = (formData) => {
    if (selectedVerifier) {
      // Update existing verifier
      api.put(`/admin/updateUser/${selectedVerifier.userId}`, formData)
        .then(response => {
          setVerifiers(verifiers.map(v => v.userId === selectedVerifier.userId ? response.data : v));
          setOpenForm(false);
        })
        .catch(error => console.error('Error updating verifier:', error));
    } else {
      // Add new verifier
      api.post('/admin/addUser', { ...formData, role: 'VERIFIER' })
        .then(response => {
          setVerifiers([...verifiers, response.data]);
          setOpenForm(false);
        })
        .catch(error => console.error('Error adding verifier:', error));
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
      <Typography variant="h5" gutterBottom> Verifier Management </Typography>
      
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
          onClick={handleAddVerifier}
        >
          Add Verifier
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Verifier ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verifiers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(verifier => (
              <TableRow key={verifier.userId}>
                <TableCell>{verifier.userId}</TableCell>
                <TableCell>{verifier.email}</TableCell>
                <TableCell>{verifier.fullName}</TableCell>
                <TableCell>{verifier.isVerified ? 'Verified' : 'Unverified'}</TableCell>
                <TableCell>
                  <Button variant="outlined" sx={{ marginRight: 1, color: 'blue' }} onClick={() => handleEditVerifier(verifier)}>Edit</Button>
                  <Button variant="outlined" sx={{ color: 'red' }} onClick={() => handleDeleteVerifier(verifier.userId)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={verifiers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{selectedVerifier ? 'Edit Verifier' : 'Add Verifier'}</DialogTitle>
        <DialogContent>
          <VerifierForm initialValues={selectedVerifier} onSubmit={handleFormSubmit} buttonText={selectedVerifier ? 'Update Verifier' : 'Add Verifier'} />
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

export default VerifierManagement;