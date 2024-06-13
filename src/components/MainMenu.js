import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Главное меню
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/shop')}>
                Работа с магазином
            </Button>
            <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                Работа с ф/м
            </Button>
            <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                Работа с заявками
            </Button>
        </Container>
    );
};

export default MainMenu;
