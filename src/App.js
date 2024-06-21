import React from "react";
import MainMenu from "./components/MainMenu";
import Shop from "./components/Shop";
import { Button, Container } from "@mui/material";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const onClose = () => {
    tg.close();
  };

  const tg = window.Telegram.WebApp;

  // tg.showAlert(`Добро пожаловать, ${tg?.WebAppUser?.username}`);
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </BrowserRouter>
        <Button onClick={onClose}>Закрыть</Button>
        <span className={"username"}>{tg.initDataUnsafe?.user?.username}</span>
      </Container>
    </>
  );
};

export default App;
