import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h4 
            style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Hi! my name is
          </motion.h4>
          <motion.h1 
            style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Gilbert <span style={{ color: 'var(--accent)' }}>Kamau</span>
          </motion.h1>
          <motion.h3 
            style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Software Developer
          </motion.h3>
          
          <motion.div 
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-secondary">Let's Connect</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
