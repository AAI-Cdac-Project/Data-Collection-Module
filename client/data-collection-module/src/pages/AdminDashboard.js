import React, { useState } from 'react';
import { Box, Button, Stack, Typography, Collapse, List, ListItem, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Navbar from '../components/Navbar';
import Charts from '../components/Admin/charts';
import UserManagement from '../components/Admin/UserManagement';
import VerifierManagement from '../components/Admin/VerifierManagement';
import UserDashboard from '../components/Admin/UserDashboard';
import VerifierDashboard from '../components/Admin/VerifierDashboard';
import AdminInfo from '../components/Admin/AdminInfo';

const AdminDashboard = () => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [selectedSection, setSelectedSection] = useState('charts');

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
    setSelectedSection('charts');
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'charts':
        return <Charts />;
      case 'userDashboard':
        return <UserDashboard />;
      case 'verifierDashboard':
        return <VerifierDashboard />;
      case 'userManagement':
        return <UserManagement />;
      case 'verifierManagement':
        return <VerifierManagement />;
      case 'adminInfo':
        return <AdminInfo />;
      default:
        return <Charts />;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}> {/* Add marginTop to account for fixed Navbar */}
        {/* Sidebar */}
        <Box sx={{ 
          width: '25%', 
          bgcolor: '#f5f5f5', 
          padding: 2,
          paddingTop: '80px', // Add paddingTop to create space at the top of the sidebar
          boxShadow: 3,
        }}>
          <Stack spacing={2}>
            <Button variant="contained" color="primary" startIcon={<DashboardIcon />} onClick={handleDashboardClick}>
              Dashboard
            </Button>
            {/* Commented out the dropdown code for now */}
            {/* 
            <Collapse in={openDashboard} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }} onClick={() => setSelectedSection('userDashboard')}>
                  <PersonIcon sx={{ color: '#42A5F5', mr: 1 }} />
                  <ListItemText primary="User Dashboard" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }} onClick={() => setSelectedSection('verifierDashboard')}>
                  <VerifiedUserIcon sx={{ color: 'green', mr: 1 }} />
                  <ListItemText primary="Verifier Dashboard" />
                </ListItem>
              </List>
            </Collapse>
            */}
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#42A5F5' }} // Updated to light blue
              startIcon={<PeopleIcon />} 
              onClick={() => setSelectedSection('userManagement')}
            >
              User Management
            </Button>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#42A5F5' }} // Updated to light blue
              startIcon={<PeopleIcon />} 
              onClick={() => setSelectedSection('verifierManagement')}
            >
              Verifier Management
            </Button>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#EF4444' }} // Admin Info color remains unchanged
              startIcon={<InfoIcon />} 
              onClick={() => setSelectedSection('adminInfo')}
            >
              Admin Info
            </Button>
          </Stack>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, padding: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Admin Dashboard
          </Typography>
          {renderSection()}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;