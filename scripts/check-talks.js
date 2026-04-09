import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const checkNotionData = async () => {
    console.log('--- Starting Weekly Notion Data Check ---');
    const notionToken = process.env.VITE_NOTION_TOKEN;
    const dbIds = [
        process.env.VITE_NOTION_GCP_DATABASE_ID,
        process.env.VITE_NOTION_AWS_DATABASE_ID,
        process.env.VITE_NOTION_MS_DATABASE_ID,
        process.env.VITE_NOTION_OTHER_DATABASE_ID
    ].filter(Boolean);

    if (!notionToken || dbIds.length === 0) {
        console.error('Missing Notion Configuration in Environment Variables.');
        process.exit(1);
    }

    try {
        for (const dbId of dbIds) {
            console.log(`Checking Database: ${dbId}...`);
            const response = await axios.post(`https://api.notion.com/v1/databases/${dbId}/query`, {}, {
                headers: {
                    'Authorization': `Bearer ${notionToken}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json'
                }
            });
            console.log(`Success! Found ${response.data.results.length} entries.`);
        }
        console.log('--- Weekly Check Completed Successfully ---');
    } catch (error) {
        console.error('Error during Notion data check:', error.response?.data || error.message);
        process.exit(1);
    }
};

checkNotionData();
