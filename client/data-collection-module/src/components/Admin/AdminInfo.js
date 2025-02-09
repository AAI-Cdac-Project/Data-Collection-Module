import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const AdminInfo = () => {
  const adminDetails = {
    name: 'Admin Name',
    email: 'admin@example.com',
    role: 'ADMIN'
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Admin Info
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Name: {adminDetails.name}</Typography>
          <Typography variant="h6">Email: {adminDetails.email}</Typography>
          <Typography variant="h6">Role: {adminDetails.role}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminInfo;