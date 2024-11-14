"use client";
import { useEffect } from "react";
import axios from "axios";
import { redirect } from 'next/navigation'

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

    const { access_token: AccessToken, context, user } = storeData;

    const StoreHash = context.split("/")[1];
    const CustomerEmail = user?.email;

    const reqData = {
      StoreHash,
      AccessToken,
      CustomerEmail,
    };
    // Send the store data to the external API for further processing
    const data = await axios.post(
      "https://favcrm.softwareexato.com/api/StoreSettings",
      reqData,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer YOUR_API_TOKEN",
        },
      }
    );
    const savedData = data.data.data;
    console.log("data",savedData);

    if (data) {
      localStorage.setItem("store_id", savedData.StoreId);
      console.log("Store ID saved to localStorage:", savedData.StoreId);
      redirect('/')
    }

    
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
