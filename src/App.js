import './App.css';

import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { Author, Book, Category, Orders, Publisher, Stats, SharedLayout, Customer, OurStaff } from './pages/dashboard'
import BookDetails from './pages/BookDetails/BookDetails';
import Landing from './pages/Landing';
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Error from './pages/Error';
import ProtectedRoute from './pages/ProtectedRoute';
import Invoice from './pages/Invoice/Invoice';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
            }>
          <Route index element={<Stats />} />
          <Route path="category" element={<Category />} />
          <Route path="author" element={<Author />} />
          <Route path="publisher" element={<Publisher />} />
          <Route path="book" element={<Book />} />
          <Route path='book/:id' element={<BookDetails />} />
          <Route path="order" element={<Orders />} />
          <Route path="order/:id" element={<Invoice />} />
          <Route path="customer" element={<Customer />} />
          <Route path="staff" element={<OurStaff />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='login' element={<Login />} />
        <Route path='logout' element={<Logout />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path='*' element={<Error />} />
        
      </Routes>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        icon
      />
    </div>
  );
}
export default App;