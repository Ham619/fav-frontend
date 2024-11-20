"use client";

import { useEffect, useState } from "react";
import {
  fetchCustomers,
  fetchOrders,
  fetchCustomerAttribute,
} from "../utils/api";
import RightSidebar from "../components/RightSidebar.js";
import MainContent from "../components/MainContent.js";
import LeftSidebar from "../components/LeftSidebar.js";

export default function Inbox() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customerAttribute, setCustomerAttribute] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [refreshChat, setRefreshChat] = useState(false);

  // State for latest email
  const [latestEmail, setLatestEmail] = useState(0);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        const result = await fetchCustomers();
        setCustomers(Array.isArray(result.data) ? result.data : []);
        console.log("customersArray", customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    getCustomers();
  }, []);

  const getCustomerAttribute = async (customerId) => {
    try {
      setLoading(true);
      const result = await fetchCustomerAttribute(customerId);
      console.log("Customer Attributes data:", result);

      const customerAttributesArray = result.data || [];
      setCustomerAttribute(customerAttributesArray);
      return customerAttributesArray;
    } catch (error) {
      console.error("Error fetching customer attributes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerClick = async (customer) => {
    setSelectedCustomer(customer);
    setLoading(true);

    try {
      // Fetch orders for the selected customer
      const ordersResult = await fetchOrders(customer.CustomerId);
      setOrders(ordersResult.data?.orderData || []);

      // Fetch and update customer attributes
      const customerAttributes = await getCustomerAttribute(customer.Id);
      if (customerAttributes) {
        // Merge selected customer with additional attributes
        setSelectedCustomer((prev) => ({
          ...prev,
          customerEmails: customerAttributes.customerEmails || [],
          data: {
            ...prev.data,
            EmailId: customerAttributes.data?.EmailId,
          },
        }));

        const emails = customerAttributes.customerEmails || [];
        setLatestEmail(emails.length > 0 ? emails[0]?.EmailId : 1);
      }
    } catch (error) {
      console.error("Error handling customer click:", error);
    } finally {
      setLoading(false);
    }
  };


  console.log("Latest Email", latestEmail);

  return (
    <div className="flex flex-grow flex-col">
      {/* Top Bar with Customers and Profile Overview */}
      <div className="flex justify-between items-center p-1 mt-4 ml-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Customers</h1>
          <p className="text-[#16C098] text-base font-normal">Profile Overview</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-grow space-x-4 p-2 px-4">
        {/* Left Sidebar */}
        <LeftSidebar
          customers={customers}
          loading={loading}
          handleCustomerClick={handleCustomerClick}
        />

        {/* Main Content */}
        <MainContent
        selectedCustomer={selectedCustomer}
        refreshChat={refreshChat}
        setRefreshChat={setRefreshChat}
        getCustomerAttribute={getCustomerAttribute}
        latestEmail={latestEmail}
        setLatestEmail={setLatestEmail}
        />

        {/* Right Sidebar */}
        <RightSidebar
          selectedCustomer={selectedCustomer}
          customerAttribute={customerAttribute}
          orders={orders}
        />
      </div>
    </div>
  );
}
