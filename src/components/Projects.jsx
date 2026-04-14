import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaFolder, FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';

const projectDescriptions = {
  'uwazi_app': 'A powerful social justice platform designed for human rights documentation and secure reporting.',
  'SlickTrends': 'A premium e-commerce platform focusing on high-performance product discovery and modern user experience.',
  'custom-database': 'An experimental database engine exploring ACID transitions and atomic file-based storage.',
  'anime-san': 'A full-stack anime tracking application with discovery features and social integrations.',
  'Anime-san-Cloud-Functions': 'Serverless backend logic powering anime-san with high scalability via Firebase Cloud Functions.',
  'GilbertKamau.github.io': 'The source code for my professional portfolio, built with React, Vite, and modern CI/CD integrations.',
  'MagariParts': 'A robust system for managing car parts sales and inventory tracking.',
  'Chama-management-system': 'A community-focused financial management tool for chama savings and loan tracking.'
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        
        if (response.data.error) {
          throw new Error(response.data.error);
        }

        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" style={{ padding: '6rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">Latest Projects</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading projects...</div>
        ) : (
          <div className="grid-3">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <FaFolder color="var(--accent)" size={32} />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={project.html_url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                      <FaExternalLinkAlt size={20} style={{ transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color='var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'} />
                    </a>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                <p style={{ color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  {projectDescriptions[project.name] || project.description || 'No description provided.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  {project.language && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }}></span>
                    {project.language}
                  </span>}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaStar size={14} /> {project.stargazers_count}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaCodeBranch size={14} /> {project.forks_count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="https://github.com/GilbertKamau" target="_blank" rel="noreferrer" className="btn-secondary">
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
