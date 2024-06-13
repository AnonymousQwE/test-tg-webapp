import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Computer as ComputerIcon,
  PointOfSale as PointOfSaleIcon,
  Router as RouterIcon,
} from "@mui/icons-material";

const Shop = () => {
  const [shopNumber, setShopNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [equipmentStatuses, setEquipmentStatuses] = useState({});

  const handleSearch = () => {
    // Заглушка для поиска магазина
    if (shopNumber) {
      setStatus(`Магазин ${shopNumber} найден`);
      setEquipmentStatuses({
        cashRegister1: "Работает",
        cashRegister2: "Не работает",
        pc: "Работает",
        mikrotik: "Работает",
      });
      setLastUpdate(new Date().toLocaleTimeString());
    } else {
      setStatus("Магазин не найден");
      setEquipmentStatuses({});
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (shopNumber) {
        // Обновляем статус оборудования (заглушка)
        setStatus(`Магазин ${shopNumber} найден`);
        setEquipmentStatuses({
          cashRegister1: "Работает",
          cashRegister2: "Не работает",
          pc: "Работает",
          mikrotik: "Работает",
        });
        setLastUpdate(new Date().toLocaleTimeString());
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [shopNumber]);

  const renderStatusIcon = (status) => {
    return status === "Работает" ? (
      <CheckCircleIcon color="success" />
    ) : (
      <CancelIcon color="error" />
    );
  };

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
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginTop: "10px" }}
        startIcon={<SearchIcon />}
      >
        Искать магазин
      </Button>
      {status && (
        <>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            {status}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Последнее обновление: {lastUpdate}
          </Typography>
          {Object.keys(equipmentStatuses).length > 0 && (
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Касса 1</Typography>
                    <PointOfSaleIcon fontSize="large" />
                    <Typography variant="body1">
                      {renderStatusIcon(equipmentStatuses.cashRegister1)}{" "}
                      {equipmentStatuses.cashRegister1}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Касса 2</Typography>
                    <PointOfSaleIcon fontSize="large" />
                    <Typography variant="body1">
                      {renderStatusIcon(equipmentStatuses.cashRegister2)}{" "}
                      {equipmentStatuses.cashRegister2}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">ПК</Typography>
                    <ComputerIcon fontSize="large" />
                    <Typography variant="body1">
                      {renderStatusIcon(equipmentStatuses.pc)}{" "}
                      {equipmentStatuses.pc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Микротик</Typography>
                    <RouterIcon fontSize="large" />
                    <Typography variant="body1">
                      {renderStatusIcon(equipmentStatuses.mikrotik)}{" "}
                      {equipmentStatuses.mikrotik}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default Shop;
