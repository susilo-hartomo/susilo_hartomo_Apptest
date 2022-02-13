import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Contact from './Contact';

function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className='App h-100'>
        <Routes>
          <Route caseSensitive={true} path="/" element={<Redirect to="/contact" />} />
          <Route caseSensitive={true} path="/contact" element={<Contact />} />
          <Route path='*' component={<div>Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
