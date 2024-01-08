import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home, Login, Profile, Search, Listing } from './pages'
import Navbar from './components/NavBar';
function App() {

  return (

    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/search' element={<Search />} />
          <Route path='/listing' element={<Listing />} />
        </Routes>
      </>
    </Router>

  );
}

export default App;
