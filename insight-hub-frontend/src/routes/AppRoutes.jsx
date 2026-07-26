import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import api from "../api/axios";
import PublicRoute from "./PublicRoute";

function Home() {
   useEffect(() => {
    api
      .get("/posts")
      .then((response) => {
        console.log("Protected API response:", response.data);
      })
      .catch((error) => {
        console.log("Protected API error:", error);
      });
  }, []);
  return (
    <Layout>
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>
    </Layout>
  );
}


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="/"
             element={
         <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
        <Route
             path="/login"
       element={
       <PublicRoute>
         <Login />
    </PublicRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}