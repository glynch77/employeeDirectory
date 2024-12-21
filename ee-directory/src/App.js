import React from 'react';
import { Button, Typography } from '@mui/material';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Employee Directory
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </div>
  );
}

export default App;
