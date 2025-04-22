import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import AddOrganization from "./pages/AddOrganization";
import AddHr from "./pages/AddHR";
import ViewHRs from "./pages/ViewHRs";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/*"
          element={
            <>
              <PrivateRoute>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/add-organization" element={<AddOrganization />} />
                  <Route path="/add-hr" element={<AddHr />} />
                  <Route path="/view-hrs" element={<ViewHRs />} />
                </Routes>
              </PrivateRoute>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
