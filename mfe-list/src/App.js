import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, IconButton } from "@mui/material";
import { FaTasks, FaFolderOpen, FaArrowRight } from "react-icons/fa";
import { setGlobalState } from "@shared/store";

export default function App() {
  const engagements = [
    { id: 1, client: "Citibank US", tech: "Cloud Migration", status: "On Track", color: "success" },
    { id: 2, client: "FedEx Global", tech: "AI Optimization", status: "High Priority", color: "error" },
    { id: 3, client: "Morgan Stanley", tech: "Digital Modernization", status: "In Progress", color: "primary" },
  ];

  return (
    <Card elevation={4} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
        <Box style={{ backgroundColor: '#ECEFF1', padding: '20px 25px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #CFD8DC' }}>
            <FaTasks style={{ marginRight: 12, color: '#263238', fontSize: 26 }} />
            <Typography variant="h5" style={{ color: '#263238', fontWeight: 700 }}>
              Top Active Engagements
            </Typography>
        </Box>
      <CardContent style={{ padding: 0 }}>
        <List style={{ padding: 0 }}>
          {engagements.map((eng, index) => (
            <ListItem 
                key={eng.id} 
                divider={index < engagements.length - 1}
                style={{ padding: '20px 25px', transition: 'background-color 0.2s', cursor: 'pointer' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => setGlobalState({ selectedEngagement: eng.client, notifications: Math.floor(Math.random() * 5) + 1 })}
                secondaryAction={
                  <IconButton edge="end" color="primary">
                    <FaArrowRight size={18} style={{ color: '#b71c1c' }} />
                  </IconButton>
                }
            >
              <ListItemAvatar style={{ marginRight: 15 }}>
                <Avatar style={{ backgroundColor: '#b71c1c', width: 48, height: 48 }}>
                  <FaFolderOpen size={22} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={<Typography variant="h6" style={{ fontWeight: 700, color: '#263238' }}>{eng.client}</Typography>}
                secondary={<Typography variant="subtitle1" color="textSecondary" style={{ marginTop: 4, fontWeight: 500 }}>Engagement: {eng.tech}</Typography>}
              />
              <Chip label={eng.status} color={eng.color} size="small" style={{ fontWeight: 'bold', minWidth: 100, marginRight: 30 }} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}