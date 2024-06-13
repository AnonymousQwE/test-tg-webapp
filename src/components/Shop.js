import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';

const Shop = () => {
    const [shopNumber, setShopNumber] = useState('');
    const [status, setStatus] = useState('Нет данных');
    const [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (shopNumber) {
                // Обновляем статус оборудования (заглушка)
                setStatus(`Статус оборудования магазина ${shopNumber}: Все в порядке`);
                setLastUpdate(new Date().toLocaleTimeString());
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [shopNumber]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Работа с магазином
            </Typography>
            <TextField
                label="Номер магазина"
                variant="outlined"
                value={shopNumber}
                onChange={(e) => setShopNumber(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Typography variant="h6" gutterBottom>
                {status}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Последнее обновление: {lastUpdate}
            </Typography>
        </Container>
    );
};

export default Shop;
