import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import axios from 'axios';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [searchFileName, setSearchFileName] = useState('');

  useEffect(() => {
    // Fetch documents data
    axios.get('/api/documents')
      .then(response => setDocuments(response.data))
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

  const handleSearch = () => {
    // Fetch document by file name
    axios.get(`/api/documents?fileName=${searchFileName}`)
      .then(response => setDocuments([response.data]))
      .catch(error => console.error('Error fetching document:', error));
  };

  const handleDelete = (documentId) => {
    // Delete document
    axios.delete(`/api/documents/${documentId}`)
      .then(() => {
        setDocuments(documents.filter((document) => document.documentId !== documentId));
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
      });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Document Management
      </Typography>
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField
          label="Search by File Name"
          variant="outlined"
          value={searchFileName}
          onChange={(e) => setSearchFileName(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document ID</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Verifier ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map(document => (
              <TableRow key={document.documentId}>
                <TableCell>{document.documentId}</TableCell>
                <TableCell>{document.fileName}</TableCell>
                <TableCell>{document.userId}</TableCell>
                <TableCell>{document.verifierId}</TableCell>
                <TableCell>{document.status}</TableCell>
                <TableCell>{document.uploadDate}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(document.documentId)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DocumentManagement;