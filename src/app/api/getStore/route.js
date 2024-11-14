// src/app/api/getStore/route.js
import BigCommerce from "node-bigcommerce";

// Initialize the BigCommerce instance with your credentials
const bigCommerce = new BigCommerce({
  clientId: process.env.CLIENT_ID,
  accessToken: process.env.ACCESS_TOKEN,
  secret: process.env.CLIENT_SECRET,
  storeHash: process.env.STORE_HASH,
  responseType: "json",
  apiVersion: "v3",
});

// Define the API handler to process requests
export async function POST(req) {
  try {
    // Extract the query parameters from the request body
    const { code, context } = await req.json();

    // Check if both code and context are present in the request
    if (!code || !context) {
      return new Response(
        JSON.stringify({ error: 'Missing code or context' }),
        { status: 400 }
      );
    }

    // Authorize and retrieve store data from BigCommerce
    const data = await bigCommerce.authorize({ code, context });
    console.log('Store data retrieved:', data);

    // Return the store data as a JSON response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error authorizing and retrieving store data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve store data' }),
      { status: 500 }
    );
  }
}
