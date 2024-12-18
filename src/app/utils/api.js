const BASE_URL = "https://favcrm.softwareexato.com/api";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Fetch customers list with dynamic storeId
export const fetchCustomers = async () => {
    const storeId = localStorage.getItem("store_id");
  
    if (!storeId) {
      throw new Error("Store ID not found in local storage.");
    }
  
    const response = await fetch(`${BASE_URL}/CustomerList/${storeId}`, {
      method: "GET",
      headers,
    });
    if (!response.ok) throw new Error("Failed to fetch customers");
    return response.json();
  };

// Fetch orders by customer ID
export const fetchOrders = async (customerId) => {
  const response = await fetch(`${BASE_URL}/OrderSummary/${customerId}`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
};

// Send an email
export const sendEmail = async (emailData) => {
  const response = await fetch(`${BASE_URL}/SendEmail`, {
    method: "POST",
    headers,
    body: JSON.stringify(emailData),
  });
  if (!response.ok) throw new Error("Failed to send email");
  return response.json();
};

// Save a note
export const saveNote = async (noteData) => {
  const response = await fetch(`${BASE_URL}/AddNote`, {
    method: "POST",
    headers,
    body: JSON.stringify(noteData),
  });
  if (!response.ok) throw new Error("Failed to save note");
  return response.json();
};

// Fetch customer details by ID
export const fetchCustomerAttribute = async (Id) => {
  const response = await fetch(`${BASE_URL}/CustomerDetails/${Id}`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch customer details");
  return response.json();
};
