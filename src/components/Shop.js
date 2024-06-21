import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Computer as ComputerIcon,
  PointOfSale as PointOfSaleIcon,
  Router as RouterIcon,
  Scale as ScaleIcon,
  Store as StoreIcon,
  Wifi as WifiIcon,
} from "@mui/icons-material";
import axios from "axios";

const Shop = () => {
  const [shopNumber, setShopNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [equipmentStatuses, setEquipmentStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchPingResults = useCallback(async () => {
    if (shopNumber) {
      setEquipmentStatuses([]);
      setLoading(true);
      try {
        const response = await axios.get(
          `https://webapp.havasfood.uz:11443/backend/ping/${shopNumber}`,
          {
            referrerPolicy: "unsafe-url",
          }
        );
        const data = response.data;
        console.log(data);
        setEquipmentStatuses(data);
        setLastUpdate(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Error fetching ping results:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [shopNumber]);

  useEffect(() => {
    if (shopNumber) {
      const intervalId = setInterval(fetchPingResults, 30000);
      return () => clearInterval(intervalId);
    }
  }, [shopNumber, fetchPingResults]);

  const handleSearch = () => {
    setStatus(`Магазин ${shopNumber}`);
    setEquipmentStatuses([]);
    fetchPingResults();
  };

  const handleShopNumberChange = (e) => {
    setShopNumber(e.target.value);
    setStatus(null);
    setEquipmentStatuses([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const renderStatusIcon = (alive) => {
    return alive ? (
      <CheckCircleIcon color="success" />
    ) : (
      <CancelIcon color="error" />
    );
  };

  const renderHostName = (host) => {
    const ip = host.split(".");
    const last = ip[ip.length - 1];
    switch (last) {
      case "254":
        return ["Mikrotik", <RouterIcon fontSize="large" key="mikrotik" />];
      case "10":
        return ["Компьютер", <ComputerIcon fontSize="large" key="computer" />];
      case "160":
        return ["Unify", <WifiIcon fontSize="large" key="unify" />];
      case "60":
        return ["Весы", <ScaleIcon fontSize="large" key="scale" />];
      case "101":
        return ["Касса 1", <PointOfSaleIcon fontSize="large" key="pos1" />];
      case "102":
        return ["Касса 2", <PointOfSaleIcon fontSize="large" key="pos2" />];
      case "103":
        return ["Касса 3", <PointOfSaleIcon fontSize="large" key="pos3" />];
      default:
        return [
          "Неизвестное устройство",
          <StoreIcon fontSize="large" key="unknown" />,
        ];
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Работа с магазином
      </Typography>

      <TextField
        label="Номер магазина"
        variant="outlined"
        value={shopNumber}
        onChange={handleShopNumberChange}
        onKeyPress={handleKeyPress}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginTop: "10px" }}
        startIcon={<SearchIcon />}
        fullWidth
      >
        Искать магазин
      </Button>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        status && (
          <>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginTop: "20px" }}
              align="center"
            >
              {status}
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              Последнее обновление: {lastUpdate}
            </Typography>
            <Typography variant="body1" align="center">
              Текущее время: {currentTime}
            </Typography>
            {equipmentStatuses.length > 0 && (
              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                {equipmentStatuses.map((h) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={h.host}>
                    <Card>
                      <CardHeader
                        avatar={renderHostName(h.host)[1]}
                        title={renderHostName(h.host)[0]}
                        titleTypographyProps={{ variant: "h6" }}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {renderStatusIcon(h.alive)} Max: {h.max} Min: {h.min}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )
      )}
    </>
  );
};

export default Shop;
