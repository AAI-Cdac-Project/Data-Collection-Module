import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography, Grid, Tooltip, Box } from '@mui/material';
import { Circle } from '@mui/icons-material';
import api from '../../services/api';

const Charts = () => {
  const [userDistributionData, setUserDistributionData] = useState([]);
  const [documentStatusData, setDocumentStatusData] = useState([]);

  useEffect(() => {
    fetchUserDistributionData();
    fetchDocumentStatusData();
  }, []);

  const fetchUserDistributionData = () => {
    api.get('/admin/stats')
      .then(response => {
        const { users, verifiers } = response.data;
        setUserDistributionData([
          { name: 'Users', value: users },
          { name: 'Verifiers', value: verifiers },
        ]);
      })
      .catch(error => console.error('Error fetching user distribution data:', error));
  };

  const fetchDocumentStatusData = () => {
    // Assuming there's an endpoint to get document status data
    api.get('/admin/documentStatus')
      .then(response => {
        setDocumentStatusData(response.data);
      })
      .catch(error => console.error('Error fetching document status data:', error));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Distribution
            </Typography>
            <Tooltip title="Click to view details" arrow>
              <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.value}`,
                    data: userDistributionData.map((item, index) => ({
                      id: index,
                      value: item.value,
                      label: item.name,
                    })),
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                  },
                }}
                colors={COLORS}
                height={300}
                animate="true"
              />
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Roles Distribution
            </Typography>
            <Tooltip title="Click to view details" arrow>
              <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.value}`,
                    data: userDistributionData.map((item, index) => ({
                      id: index,
                      value: item.value,
                      label: item.name,
                    })),
                    innerRadius: 50,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                  },
                }}
                colors={['#2A3F5F', '#FF6B6B']}
                height={300}
                animate="true"
              />
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Document Status Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Tooltip title="Click to view details" arrow>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: documentStatusData.map((item) => item.name) }]}
                    series={[{ data: documentStatusData.map((item) => item.value) }]}
                    colors={['#88D8B0']}
                    height={300}
                    animate="true"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                  {documentStatusData.map((item, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                      <Circle sx={{ color: '#88D8B0', mr: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        {item.name}: {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;