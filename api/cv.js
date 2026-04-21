import axios from 'axios';

export default async function handler(req, res) {
  const notionToken = process.env.NOTION_TOKEN || process.env.VITE_NOTION_TOKEN;
  const databaseId = process.env.VITE_NOTION_CV_DATABASE_ID || process.env.NOTION_CV_DATABASE_ID;
  const notionVersion = process.env.NOTION_VERSION || process.env.VITE_NOTION_VERSION || '2022-06-28';

  if (!notionToken || !databaseId) {
    return res.status(500).json({ error: 'CV configuration missing on the server.' });
  }

  try {
    // Query the CV database for the latest entry
    const response = await axios.post(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      page_size: 1
    }, {
      headers: {
        'Authorization': `Bearer ${notionToken}`,
        'Notion-Version': notionVersion,
        'Content-Type': 'application/json'
      }
    });

    const page = response.data.results[0];
    if (!page) {
      return res.status(404).json({ error: 'No CV found in the database.' });
    }

    // Find the first "file" property that contains a file
    let fileUrl = null;
    Object.values(page.properties).forEach(prop => {
      if (prop.type === 'files' && prop.files?.[0]) {
        fileUrl = prop.files[0].file?.url || prop.files[0].external?.url;
      }
    });

    if (!fileUrl) {
      return res.status(404).json({ error: 'No file attachment found in the CV entry.' });
    }

    // Redirect the user to the secure (temporary) Notion file URL
    res.redirect(302, fileUrl);
  } catch (error) {
    console.error('CV Fetch Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to retrieve the CV' });
  }
}
