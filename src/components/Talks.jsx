import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaMicrophone, FaExternalLinkAlt } from 'react-icons/fa';

const Talks = () => {
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTalks = async () => {
      try {
        // Fetch from the local secure proxy function
        const response = await axios.get('/api/notion');
        
        if (response.data.error) {
          throw new Error(response.data.error);
        }

        setTalks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching talks:', err);
        setError(err.message || 'Failed to fetch talks. Check your Notion configuration.');
        setLoading(false);
      }
    };
    fetchTalks();
  }, []);

  return (
    <section id="talks" style={{ padding: '6rem 0' }}>
      <div className="container">
        <h2 className="section-title">My Talks</h2>
        
        {error ? (
           <motion.div 
             className="glass-card"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             style={{ textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))' }}
           >
             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
               <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1.5rem', borderRadius: '50%' }}>
                 <FaMicrophone size={48} color="var(--accent)" />
               </div>
             </div>
             <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Oops! Notion Error</h3>
             <p style={{ color: '#ef4444', maxWidth: '600px', margin: '0 auto 1rem', fontSize: '1.1rem' }}>
               {error}
             </p>
           </motion.div>
        ) : loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Syncing talks from all categories across Notion...</div>
        ) : talks.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No talks found in your Notion databases.</div>
        ) : (
          <div className="grid-3">
            {talks.map((talk, index) => (
              <motion.div 
                key={talk.id}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <FaMicrophone color="var(--accent)" size={32} />
                  {talk.link !== '#' && (
                    <a href={talk.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} onMouseOver={(e) => e.currentTarget.style.color='var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'}>
                      <FaExternalLinkAlt size={16} style={{ transition: 'color 0.3s' }} />
                    </a>
                  )}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{talk.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                   {talk.date !== 'Unknown Date' && <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{talk.date}</span>}
                   <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', background: 'rgba(56,189,248,0.2)', color: 'var(--accent)' }}>{talk.category}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  {talk.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Talks;
