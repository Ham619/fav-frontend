"use client";
import { useEffect } from "react";
import axios from "axios";

async function getStore(query) {
  try {
    console.log("getStore is being called with:", query);

    if (!query.code || !query.context) {
      throw new Error("Missing code or context");
    }

    // Send a POST request to the server API route to get store data securely
    const response = await axios.post("/api/getStore", query);
    const storeData = response.data;

    console.log("Store data received from server:", storeData);

    // Save the store ID in localStorage
    if (storeData.store_id) {
      localStorage.setItem("store_id", storeData.store_id);
      console.log("Store ID saved to localStorage:", storeData.store_id);
    }

    // Send the store data to the external API for further processing
    await axios.post(
      "https://favcrm.softwareexato.com/api/StoreImapDetails",
      storeData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_TOKEN", // Replace with actual token if required
        },
      }
    );

    console.log("Store data sent to favcrm API successfully");
  } catch (error) {
    console.error("Error fetching store data:", error.message);
  }
}

export default function Auth({ query }) {
  useEffect(() => {
    console.log("useEffect triggered with query:", query);

    if (query && query.code && query.context) {
      getStore(query);
    }
  }, [query]);

  return <div></div>;
}
