import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const checkNotionData = async () => {
    console.log('--- Starting Weekly Notion Data Check ---');
    
    const notionToken = process.env.VITE_NOTION_TOKEN;
    const notionVersion = process.env.VITE_NOTION_VERSION || '2022-06-28';
    
    const databases = {
        'GCP': process.env.VITE_NOTION_GCP_DATABASE_ID,
        'AWS': process.env.VITE_NOTION_AWS_DATABASE_ID,
        'MS': process.env.VITE_NOTION_MS_DATABASE_ID,
        'OTHER': process.env.VITE_NOTION_OTHER_DATABASE_ID
    };

    const activeDbs = Object.entries(databases).filter(([_, id]) => Boolean(id));

    if (!notionToken) {
        console.error('❌ Error: VITE_NOTION_TOKEN is missing from Environment Variables.');
        process.exit(1);
    }

    if (activeDbs.length === 0) {
        console.error('❌ Error: No Notion Database IDs found (GCP, AWS, MS, or OTHER).');
        process.exit(1);
    }

    console.log(`Using Notion Version: ${notionVersion}`);

    try {
        for (const [name, dbId] of activeDbs) {
            console.log(`Checking [${name}] Database: ${dbId}...`);
            const response = await axios.post(`https://api.notion.com/v1/databases/${dbId}/query`, {}, {
                headers: {
                    'Authorization': `Bearer ${notionToken}`,
                    'Notion-Version': notionVersion,
                    'Content-Type': 'application/json'
                }
            });
            console.log(`✅ Success! Found ${response.data.results.length} entries.`);
        }
        console.log('--- Weekly Check Completed Successfully ---');
    } catch (error) {
        const errorData = error.response?.data;
        console.error('❌ Error during Notion data check:');
        if (errorData) {
            console.error(JSON.stringify(errorData, null, 2));
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
};

checkNotionData();
