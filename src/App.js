import './App.css';

import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { Author, Book, Category, Orders, Publisher, Stats, SharedLayout } from './pages/dashboard'
import BookDetails from './pages/BookDetails/BookDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index element={<Stats />} />
          <Route path="category" element={<Category />} />
          <Route path="author" element={<Author />} />
          <Route path="publisher" element={<Publisher />} />
          <Route path="book" element={<Book />} />
          <Route path='book/:id' element={<BookDetails />} />
          <Route path="order" element={<Orders />} />

        </Route>
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