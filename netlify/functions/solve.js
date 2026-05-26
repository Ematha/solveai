// netlify/functions/solve.js
export const handler = async (event, context) => {
    // 1. Only allow POST requests for security
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { parts } = JSON.parse(event.body);

        // 2. The API request happens on the server, keeping your key safe
        const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // This pulls the key from your Netlify Environment Variables
                "x-goog-api-key": process.env.GEMINI_API_KEY
            },
            body: JSON.stringify({ contents: [{ parts: parts }] })
        });

        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
