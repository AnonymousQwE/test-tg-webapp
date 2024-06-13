import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Shop from "./components/Shop";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
};

export default App;
