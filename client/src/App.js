import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home, Login, Profile, Search, Listing } from './pages'
function App() {

  return (
    <Router>
      <>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/listing' element={<Listing />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
