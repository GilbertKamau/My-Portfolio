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
      const notionToken = import.meta.env.VITE_NOTION_TOKEN;
      const dbIds = [
        { id: import.meta.env.VITE_NOTION_GCP_DATABASE_ID, category: 'GCP' },
        { id: import.meta.env.VITE_NOTION_AWS_DATABASE_ID, category: 'AWS' },
        { id: import.meta.env.VITE_NOTION_MS_DATABASE_ID, category: 'Microsoft' },
        { id: import.meta.env.VITE_NOTION_OTHER_DATABASE_ID, category: 'Other' }
      ].filter(db => db.id);

      if (!notionToken || dbIds.length === 0) {
        setError('Notion API keys missing. Please configure .env');
        setLoading(false);
        return;
      }

      try {
        const fetchDb = async (dbId, category) => {
          try {
            const response = await axios.post(`/notion-api/v1/databases/${dbId}/query`, {}, {
              headers: {
                'Authorization': `Bearer ${notionToken}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
              }
            });
            
            return response.data.results.map(page => {
              // Extract dynamically by parsing the underlying abstract type instead of hardcoding column names.
              let title = 'Untitled Talk';
              let link = '#';
              let date = 'Unknown Date';
              let description = '';
              
              Object.values(page.properties).forEach(p => {
                if (p.type === 'title') title = p.title?.[0]?.plain_text || title;
                if (p.type === 'url') link = p.url || link;
                if (p.type === 'date') date = p.date?.start || date;
                if (p.type === 'rich_text') description = p.rich_text?.[0]?.plain_text || description;
              });

              return { id: page.id, title, link, date, description, category };
            });
          } catch (e) {
            console.error(`Failed to fetch ${category} db:`, e);
            return []; // Fail gracefully for individual databases so others still render
          }
        };

        const results = await Promise.all(dbIds.map(db => fetchDb(db.id, db.category)));
        const combinedTalks = results.flat();

        // Sort dynamically by newest date first
        combinedTalks.sort((a, b) => {
          if (a.date === 'Unknown Date') return 1;
          if (b.date === 'Unknown Date') return -1;
          return new Date(b.date) - new Date(a.date);
        });

        setTalks(combinedTalks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Notion talks:', err);
        setError('Failed to fetch talks. Ensure your integration is invited to the databases.');
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
