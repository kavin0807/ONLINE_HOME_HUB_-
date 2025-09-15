import PlumbingFixtures from './pages/PlumbingFixtures';
import InteriorPaint from './pages/InteriorPaint';
import Tiles from './pages/Tiles';
import HardwoodFlooring from './pages/HardwoodFlooring';
import ElectricalWiringInterior from './pages/ElectricalWiringInterior';
import CeilingMaterials from './pages/CeilingMaterials';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Home from './pages/Home';
import Products from './pages/Products';
import Exterior from './pages/Exterior';
import Interior from './pages/Interior';
import Engineers from './pages/Engineers';
import EngineerProfile from './pages/EngineerProfile';
import NTRoofs from './pages/NTRoofs';
import ConcreteBlocks from './pages/ConcreteBlocks';
import Windows from './pages/Windows';
import Cement from './pages/Cement';
import ExteriorPaint from './pages/ExteriorPaint';
import SteelRebar from './pages/SteelRebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductPurchase from './pages/ProductPurchase';
import Profile from './pages/Profile';
import Admin from './pages/Admin';


// Page transition wrapper with fade/slide animations
const Page = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/products" element={<Page><Products /></Page>} />
        <Route path="/products/exterior" element={<Page><Exterior /></Page>} />
        <Route path="/products/exterior/nt-roofs" element={<Page><NTRoofs /></Page>} />
        <Route path="/products/exterior/concrete-blocks" element={<Page><ConcreteBlocks /></Page>} />
        <Route path="/products/interior/hardwood-flooring" element={<Page><HardwoodFlooring /></Page>} />
        <Route path="/products/exterior/energy-efficient-windows" element={<Page><Windows /></Page>} />
        <Route path="/products/cement" element={<Page><Cement /></Page>} />
        <Route path="/products/exterior/exterior-paint" element={<Page><ExteriorPaint /></Page>} />
        <Route path="/products/exterior/steel-rebar" element={<Page><SteelRebar /></Page>} />
        <Route path="/products/interior" element={<Page><Interior /></Page>} />
        <Route path="/engineers" element={<Page><Engineers /></Page>} />
        <Route path="/engineers/:id" element={<Page><EngineerProfile /></Page>} />
        <Route path="/products/interior/tiles" element={<Page><Tiles /></Page>} />
        <Route path="/products/interior/interior-paint" element={<Page><InteriorPaint /></Page>} />
        <Route path="/products/interior/plumbing-fixtures" element={<Page><PlumbingFixtures /></Page>} />
        <Route path="/products/interior/electrical-wiring" element={<Page><ElectricalWiringInterior /></Page>} />
        <Route path="/products/interior/ceiling-materials" element={<Page><CeilingMaterials /></Page>} />
        <Route path="/login" element={<Page><Login /></Page>} />
        <Route path="/signup" element={<Page><Signup /></Page>} />
        <Route path="/purchase" element={<Page><ProductPurchase /></Page>} />
        <Route path="/profile" element={<Page><Profile /></Page>} />
        <Route path="/admin" element={<Page><Admin /></Page>} />
        
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;

// Ensure Home.js nav bar menu is right-aligned
// No changes needed in App.js for nav bar position; ensure Home.js nav-menu uses justifyContent: 'flex-end' and is styled correctly.