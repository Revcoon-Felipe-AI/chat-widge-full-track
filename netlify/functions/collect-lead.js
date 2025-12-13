exports.handler = async function (event, context) {
    console.log("--- COLLECT LEAD FUNCTION HIT ---");
    console.log("Event Body:", event.body);
    // --- CORS Headers ---
    const headers = {
        'Access-Control-Allow-Origin': '*', // Allow any domain
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // --- Handle Preflight (OPTIONS) ---
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // --- Handle POST ---
    if (event.httpMethod === 'POST') {
        try {
            // 1. Determine Type (lead vs survey vs validation)
            const type = event.queryStringParameters.type || 'lead';
            let n8nUrl;

            if (type === 'survey') {
                n8nUrl = process.env.N8N_WEBHOOK_SURVEY_URL;
            } else if (type === 'validation') {
                n8nUrl = process.env.N8N_WEBHOOK_VALIDATION_URL;
            } else {
                n8nUrl = process.env.N8N_WEBHOOK_LEAD_URL;
            }

            if (!n8nUrl) {
                console.error(`Missing Environment Variable for type: ${type}`);
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ error: 'Server Configuration Error' })
                };
            }

            // 2. Parse Incoming Data
            const data = JSON.parse(event.body);

            // 3. Forward to n8n
            const response = await fetch(n8nUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            // 4. Return n8n Response
            const n8nData = await response.json();

            if (response.ok) {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(n8nData)
                };
            } else {
                console.error("n8n Error:", response.status, n8nData);
                return {
                    statusCode: 502,
                    headers,
                    body: JSON.stringify({ error: 'Upstream Error', details: n8nData })
                };
            }

        } catch (error) {
            console.error("Error processing request:", error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Internal Server Error' })
            };
        }
    }

    // --- Method Not Allowed ---
    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method Not Allowed' })
    };
};
