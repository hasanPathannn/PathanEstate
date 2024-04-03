import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SighIn from "./pages/SignIn";
import SighUp from "./pages/SignUp";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoute from "./components/privateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SighIn />} />
        <Route path="/sign-up" element={<SighUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
