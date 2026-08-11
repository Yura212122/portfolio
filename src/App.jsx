import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./component/Header";
import Login from "./component/Login";
import Register from "./component/Register";
import Kitchen from "./component/Kitchen";
import Main from "./component/Main";
import Bed from "./component/Bed";
import Stairs from "./component/Stairs";
import Table from "./component/Table";
import Nightstand from "./component/Nightstand";
function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
         <Route path="/main" element={<Main />} />
        <Route path="/kitchen" element={<Kitchen user={user} />} />
        <Route path="/bed" element={<Bed user={user} />} />
        <Route path="/stairs" element={<Stairs user={user} />} />
        <Route path="/wardrobe" element={<Nightstand user={user} />} />
        <Route path="/table" element={<Table user={user} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
