import React from "react";
import LoginPage from "./Components/Authentication/logIn";
import Dash from "./Components/Dash/Dash";
import SignupPage from "./Components/Authentication/signUp";
import AdminDash from "./Components/Dash/AdminDash";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dash />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin-dashboard" element={<AdminDash />} />
        </Routes>
        </Router>
    );
    }

export default App;