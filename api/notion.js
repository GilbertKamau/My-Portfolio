import axios from 'axios';

export default async function handler(req, res) {
  // Use environment variables (Vercel will provide these from Project Settings)
  const notionToken = process.env.NOTION_TOKEN || process.env.VITE_NOTION_TOKEN;
  
  const databases = [
    { id: process.env.NOTION_GCP_DATABASE_ID || process.env.VITE_NOTION_GCP_DATABASE_ID, category: 'GCP' },
    { id: process.env.NOTION_AWS_DATABASE_ID || process.env.VITE_NOTION_AWS_DATABASE_ID, category: 'AWS' },
    { id: process.env.NOTION_MS_DATABASE_ID || process.env.VITE_NOTION_MS_DATABASE_ID, category: 'Microsoft' },
    { id: process.env.NOTION_OTHER_DATABASE_ID || process.env.VITE_NOTION_OTHER_DATABASE_ID, category: 'Other' }
  ].filter(db => db.id);

  const notionVersion = process.env.NOTION_VERSION || process.env.VITE_NOTION_VERSION || '2022-06-28';

  if (!notionToken) {
    return res.status(500).json({ error: 'NOTION_TOKEN is not configured on the server.' });
  }

  if (databases.length === 0) {
    return res.status(500).json({ error: 'No database IDs configured.' });
  }

  try {
    const fetchDb = async (dbId, category) => {
      try {
        const response = await axios.post(`https://api.notion.com/v1/databases/${dbId}/query`, {}, {
          headers: {
            'Authorization': `Bearer ${notionToken}`,
            'Notion-Version': notionVersion,
            'Content-Type': 'application/json'
          }
        });
        
        return response.data.results.map(page => {
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
        console.error(`Failed to fetch ${category} db:`, e.response?.data || e.message);
        return [];
      }
    };

    const results = await Promise.all(databases.map(db => fetchDb(db.id, db.category)));
    const combinedTalks = results.flat();

    // Sort by date
    combinedTalks.sort((a, b) => {
      if (a.date === 'Unknown Date') return 1;
      if (b.date === 'Unknown Date') return -1;
      return new Date(b.date) - new Date(a.date);
    });

    res.status(200).json(combinedTalks);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch talks from Notion.' });
  }
}
