import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaShieldAlt, FaRocket } from 'react-icons/fa';

const services = [
  {
    icon: <FaCode size={40} />,
    title: 'Full-Stack Web Development',
    description: 'Building high-performance, responsive websites using React, Vite, and Next.js. I focus on clean architecture and premium UI/UX design.',
    features: ['Modern Frameworks', 'Responsive Design', 'API Integration']
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: 'Social Justice Technology',
    description: 'Developing secure platforms for human rights documentation and reporting. Specialized in privacy, security, and reliable documentation tools.',
    features: ['Secure Reporting', 'Data Privacy', 'Impact-Driven Tech']
  },
  {
    icon: <FaServer size={40} />,
    title: 'Scaleable Infrastructure',
    description: 'Designing cloud environments and serverless architectures that scale with your users. Deep expertise in Firebase and Cloud Functions.',
    features: ['Cloud Functions', 'Database Optimization', 'Serverless Architecture']
  },
  {
    icon: <FaRocket size={40} />,
    title: 'Fintech & Payment Systems',
    description: 'Integrating complex payment gateways and financial transaction engines with strict adherence to ACID compliance and reliability.',
    features: ['M-Pesa Integration', 'Transaction Scaling', 'Financial Security']
  }
];

const Services = () => {
  return (
    <section id="services" style={{ padding: '6rem 0' }}>
      <div className="container">
        <h2 className="section-title">My Services</h2>
        <div className="grid-3">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>
                {service.description}
              </p>
              <ul style={{ marginBottom: '2rem' }}>
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    color: 'var(--text-primary)', 
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-secondary" style={{ textAlign: 'center', padding: '0.5rem 1rem' }}>
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ 
            marginTop: '4rem', 
            textAlign: 'center', 
            background: 'var(--accent-gradient)', 
            padding: '3rem', 
            borderRadius: '24px',
            color: 'white'
          }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to start your next project?</h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
            Whether you're building a social justice platform or a high-scale fintech app, I'm here to help you build it right.
          </p>
          <a href="#contact" className="btn-primary" style={{ background: 'white', color: 'var(--bg-primary)' }}>
            Hire Me Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
