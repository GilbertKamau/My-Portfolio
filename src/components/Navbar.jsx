import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav>
      <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
        <motion.ul 
          className="nav-links"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </motion.ul>
      </div>
    </nav>
  );
};

export default Navbar;
