import React from "react";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./data/authContext/authContext.js";
import Login from "./pages/Login.jsx";
import SingUp from "./pages/SingUp.jsx";
import Account from "./pages/Account.jsx";
import ProtectRoute from "./data/ProtectRoute.js";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <>
      <RecoilRoot>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp/>} />
          <Route path="/account" element={
          <ProtectRoute>
            <Account />
          </ProtectRoute>
          } />
        </Routes>
      </AuthContextProvider>
        </RecoilRoot>
    </>
  );
};

export default App;
