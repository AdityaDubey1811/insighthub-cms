import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Posts from "../pages/Posts";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import PostDetails from "../pages/PostDetails";
import Profile from "../pages/Profile";
import RoleBasedRoute from "./RoleBasedRoute";
import Moderation from "../pages/admin/Moderation";
import Notifications from "../pages/Notifications";
import Register from "../pages/auth/Register";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
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
        <Route
  path="/posts"
  element={
    <ProtectedRoute>
      <Layout>
        <Posts />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/posts/create"
  element={
    <ProtectedRoute>
      <Layout>
        <CreatePost />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/posts/:slug/edit"
  element={
    <ProtectedRoute>
      <Layout>
        <EditPost />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/posts/view/:slug"
  element={
    <ProtectedRoute>
      <Layout>
        <PostDetails />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Layout>
        <Profile />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/moderation"
  element={
    <ProtectedRoute>
      <RoleBasedRoute allowedRoles={["ADMIN"]}>
        <Layout>
          <Moderation />
        </Layout>
      </RoleBasedRoute>
    </ProtectedRoute>
  }
/>
<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Layout>
        <Notifications />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/register"
  element={
    <PublicRoute>
      <Register />
    </PublicRoute>
  }
/>
<Route
  path="/users/:userId"
  element={
    <ProtectedRoute>
      <Layout>
        <Profile />
      </Layout>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}