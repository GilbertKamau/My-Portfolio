import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '6rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '1.5rem' }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Have a project in mind or just want to say hi? Let's talk! I'm currently open for new opportunities to build amazing products.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}
          >
            <a href="https://wa.me/+254715619945" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaWhatsapp size={20} /> WhatsApp Me
            </a>
          </motion.div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <a href="https://www.linkedin.com/in/gilbert-chris-a696151a9" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} onMouseOver={(e) => e.currentTarget.style.color='var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'} className="transition">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com/El_berto31" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} onMouseOver={(e) => e.currentTarget.style.color='var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'} className="transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com/gilbertchris78?igshid=ZDdkNTZiNTM=" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} onMouseOver={(e) => e.currentTarget.style.color='var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'} className="transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://github.com/GilbertKamau" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} onMouseOver={(e) => e.currentTarget.style.color='var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'} className="transition">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
