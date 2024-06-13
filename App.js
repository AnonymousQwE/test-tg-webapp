import React from 'react';
import Menu from './components/Menu';
import { Container, CssBaseline, Typography } from '@mui/material';

const App = () => {
  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4" component="h1" gutterBottom>
        Telegram Bot Web App
      </Typography>
      <Menu />
    </Container>
  );
};

export default App;
