import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--card-border)' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Gilbert Kamau.
      </p>
    </footer>
  );
};

export default Footer;
