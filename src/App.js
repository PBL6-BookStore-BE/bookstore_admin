import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { Author, Category, Publisher } from './pages/dashboard'

// import { ForgotPassword, Login, Logout, Register, ResetPassword } from './pages/auth'

import './App.css';

function App() {
  return (
    // <div className="App">
    //   <Routes>
    //     <Route path="/category" element={<Category />} />
    //     <Route path="/author" element={<Author />} />
    //     <Route path="/publisher" element={<Publisher />} />
    //   </Routes>
    //   <ToastContainer
    //     position={toast.POSITION.TOP_RIGHT}
    //     autoClose={3000}
    //     icon
    //   />
    // </div>
  );
}

export default App;
