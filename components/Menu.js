import React, { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import StoreStatus from './StoreStatus';

const Menu = () => {
  const [storeNumber, setStoreNumber] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  const handleInputChange = (event) => {
    setStoreNumber(event.target.value);
  };

  const handleButtonClick = (section) => {
    if (section === 'store' && storeNumber) {
      setShowStatus(true);
    } else {
      setShowStatus(false);
      // Handle other sections here
    }
  };

  return (
    <Box>
      <TextField
        label="Введите номер магазина"
        variant="outlined"
        value={storeNumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={() => handleButtonClick('store')} fullWidth>
        Работа с магазином
      </Button>
      <Button variant="contained" onClick={() => handleButtonClick('fm')} fullWidth>
        Работа с Ф/М
      </Button>
      <Button variant="contained" onClick={() => handleButtonClick('requests')} fullWidth>
        Работа с заявками
      </Button>
      {showStatus && <StoreStatus storeNumber={storeNumber} />}
    </Box>
  );
};

export default Menu;
