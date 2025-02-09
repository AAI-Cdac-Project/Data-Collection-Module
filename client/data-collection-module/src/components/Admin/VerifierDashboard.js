import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa';
import VerifierForm from './VerifierForm';
import api from '../../services/api';

const VerifierManagement = () => {
  const [verifiers, setVerifiers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    // Fetch recently added verifiers data when the component mounts
    fetchRecentVerifiers();
  }, []);

  const fetchRecentVerifiers = () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    api.get('/admin/verifiers/recent')
      .then(response => setVerifiers(response.data))
      .catch(error => console.error('Error fetching recent verifiers:', error));
  };

  const handleSearch = () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    api.get(`/admin/verifiers?email=${searchEmail}`)
      .then(response => setVerifiers([response.data]))
      .catch(error => console.error('Error fetching verifier:', error));
  };

  const handleAddVerifier = () => {
    setOpenForm(true);
  };

  const handleFormSubmit = (formData) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    api.post('/admin/addUser', formData)
      .then(response => {
        setVerifiers([...verifiers, response.data]);
        setOpenForm(false);
      })
      .catch(error => console.error('Error adding verifier:', error));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Verifier Management
      </Typography>
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField
          label="Search by Email"
          variant="outlined"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ marginRight: 2 }}>
          Search
        </Button>
        <Button variant="contained" color="primary" startIcon={<FaUserPlus />} onClick={handleAddVerifier}>
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
            {verifiers.map(verifier => (
              <TableRow key={verifier.userId}>
                <TableCell>{verifier.userId}</TableCell>
                <TableCell>{verifier.email}</TableCell>
                <TableCell>{verifier.fullName}</TableCell>
                <TableCell>{verifier.isVerified ? 'Verified' : 'Unverified'}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Add Verifier</DialogTitle>
        <DialogContent>
          <VerifierForm onSubmit={handleFormSubmit} buttonText="Add Verifier" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VerifierManagement;