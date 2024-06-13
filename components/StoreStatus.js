import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const StoreStatus = ({ storeNumber }) => {
  const [status, setStatus] = useState("Загрузка...");
  const [lastUpdate, setLastUpdate] = useState("");

  const fetchData = () => {
    // Здесь будет ваш код для получения данных
    setStatus("Статус оборудования: ОК"); // Заглушка
    setLastUpdate(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [storeNumber]);

  return (
    <Box mt={2}>
      <Typography variant="h6">Магазазин № {storeNumber}</Typography>
      <Typography variant="body1">{status}</Typography>
      <Typography variant="caption">
        Последнее обновление: {lastUpdate}
      </Typography>
    </Box>
  );
};

export default StoreStatus;
