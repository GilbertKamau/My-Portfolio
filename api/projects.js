import axios from 'axios';

export default async function handler(req, res) {
  const githubToken = process.env.GITHUB_TOKEN;
  const username = 'GilbertKamau';
  
  try {
    console.log(`[API] Fetching GitHub repos for ${username}...`);
    
    const config = {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GilbertKamau-Portfolio'
      }
    };

    if (githubToken) {
      config.headers['Authorization'] = `token ${githubToken}`;
      console.log('[API] Using GITHUB_TOKEN for authentication.');
    }

    const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, config);
    
    // Filter out unwanted repos: portfolio itself and skill checks
    const filteredProjects = response.data
      .filter(project => {
        const name = project.name.toLowerCase();
        const desc = (project.description || '').toLowerCase();
        
        const isPortfolio = name === 'my-portfolio' || name === 'gilbertkamau.github.io';
        const isSkillCheck = name.includes('skills') || name.includes('check') || 
                            desc.includes('skills') || desc.includes('check');
                            
        return !isPortfolio && !isSkillCheck;
      })
      .slice(0, 6);

    console.log(`[API] Successfully fetched ${filteredProjects.length} projects.`);
    res.status(200).json(filteredProjects);
  } catch (error) {
    console.error('[API] Error fetching GitHub projects:', error.response?.data || error.message);
    
    // Fallback or detailed error message
    if (error.response?.status === 403) {
      return res.status(403).json({ error: 'GitHub API rate limit exceeded. Please add a GITHUB_TOKEN to Vercel settings.' });
    }
    
    res.status(500).json({ error: 'Failed to fetch projects from GitHub.' });
  }
}
