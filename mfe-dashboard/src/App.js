import React from 'react';
import { Card, CardContent, Typography, Grid, Box, LinearProgress, Chip } from "@mui/material";
import { FaChartLine, FaServer, FaUsers, FaGlobe } from "react-icons/fa";
import { useGlobalState } from "host/store";

export default function App() {
  const { selectedEngagement } = useGlobalState();

  return (
    <Card elevation={4} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
      <Box style={{ backgroundColor: '#263238', padding: '20px 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <FaChartLine style={{ marginRight: 15, color: '#fff', fontSize: 28 }} />
          <Typography variant="h5" style={{ color: '#fff', fontWeight: 600 }}>
            Global Delivery Metrics
          </Typography>
        </Box>
        {selectedEngagement && (
          <Chip label={`Filtering by: ${selectedEngagement}`} style={{ backgroundColor: '#b71c1c', color: '#fff', fontWeight: 600 }} />
        )}
      </Box>
      <CardContent style={{ padding: '30px 25px' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <FaUsers style={{ marginRight: 12, color: '#b71c1c', fontSize: 24 }} />
              <Typography variant="h6" color="textSecondary" style={{ fontWeight: 600 }}>Resource Utilization</Typography>
            </Box>
            <Typography variant="h3" style={{ fontWeight: 800, color: '#263238' }}>{selectedEngagement ? '88.1%' : '92.4%'}</Typography>
            <LinearProgress variant="determinate" value={selectedEngagement ? 88.1 : 92.4} style={{ height: 10, borderRadius: 5, marginTop: 15, backgroundColor: '#ffebee' }} sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#b71c1c' } }} />
            <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>Optimal bench allocation</Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <FaGlobe style={{ marginRight: 12, color: '#1976d2', fontSize: 24 }} />
              <Typography variant="h6" color="textSecondary" style={{ fontWeight: 600 }}>Active Regions</Typography>
            </Box>
            <Typography variant="h3" style={{ fontWeight: 800, color: '#263238' }}>{selectedEngagement ? '3' : '14'}</Typography>
            <Box mt={2.5} display="flex" flexWrap="wrap" gap={1}>
               <Chip label="North America" style={{ fontWeight: 600, backgroundColor: '#e3f2fd', color: '#1565c0' }} />
               <Chip label="EMEA" style={{ fontWeight: 600, backgroundColor: '#e3f2fd', color: '#1565c0' }} />
               {!selectedEngagement && <Chip label="APAC" style={{ fontWeight: 600, backgroundColor: '#e3f2fd', color: '#1565c0' }} />}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <FaServer style={{ marginRight: 12, color: '#2e7d32', fontSize: 24 }} />
              <Typography variant="h6" color="textSecondary" style={{ fontWeight: 600 }}>Infrastructure Uptime</Typography>
            </Box>
            <Typography variant="h3" style={{ fontWeight: 800, color: '#2e7d32' }}>99.99%</Typography>
            <Typography variant="body1" style={{ marginTop: 15, color: '#4caf50', fontWeight: 500 }}>All core services operational</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}