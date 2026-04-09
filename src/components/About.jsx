import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" style={{ padding: '6rem 0' }}>
      <div className="container grid-2">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'var(--accent-gradient)', 
            transform: 'translate(-20px, 20px)', 
            borderRadius: '16px', 
            zIndex: -1 
          }}></div>
          <img 
            src="/images/profile-pro.jpg" 
            alt="Gilbert Kamau Profile" 
            style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', border: '1px solid var(--card-border)' }} 
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" style={{ textAlign: 'left' }}>About Me</h2>
          <h5 style={{ fontSize: '1.25rem', color: 'var(--accent)', marginBottom: '1rem' }}>Software Developer</h5>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            I am a web developer with 2 years of experience. I like turning ideas into reality through clean code. I focus on making websites both appealing and functional for users.
          </p>
          <a href="https://drive.google.com/file/d/1nJ4gbGLS7Ld0S3f0ItG-rrYHqV9F4tKv/view?usp=sharing" target="_blank" rel="noreferrer" className="btn-primary">
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
