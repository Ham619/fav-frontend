"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Skeleton } from "antd";
import { fetchCustomers } from "../utils/api";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "Customer ID",
    dataIndex: "customerId",
    key: "customerId",
    width: 120,
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName",
    width: 200,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    width: 150,
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: "Email Status",
    dataIndex: "emailStatus",
    key: "emailStatus",
    width: 130,
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    width: 100,
  },
  {
    title: "First Seen Date",
    dataIndex: "firstSeenDate",
    key: "firstSeenDate",
    width: 130,
  },
  {
    title: "First Order Placed",
    dataIndex: "firstOrderPlaced",
    key: "firstOrderPlaced",
    width: 130,
  },
  {
    title: "Last Order Placed",
    dataIndex: "lastOrderPlaced",
    key: "lastOrderPlaced",
    width: 130,
  },
  {
    title: "First Contacted",
    dataIndex: "firstContacted",
    key: "firstContacted",
    width: 130,
  },
  {
    title: "Signed Up",
    dataIndex: "signedUp",
    key: "signedUp",
    width: 130,
  },
  {
    title: "Total Orders",
    dataIndex: "totalOrderPlaced",
    key: "totalOrderPlaced",
    width: 120,
    ellipsis: true,
  },
  {
    title: "Order Value",
    dataIndex: "totalOrderValue",
    key: "totalOrderValue",
    width: 120,
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (_, record) => (
      <Tag color={record.totalOrderPlaced ? "green" : "red"} key={record.id}>
        {record.totalOrderPlaced ? "Active" : "Inactive"}
      </Tag>
    ),
  },
];

const NewCustomerTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // const response = await fetch(`https://favcrm.softwareexato.com/api/CustomerList/${storeId}`);
        // const result = await response.json();

        const result = await fetchCustomers();

        if (result.message === "Request success") {
          const formattedData = result.data.map((item) => {
            const formatDate = (date) =>
              date ? new Date(date).toLocaleDateString("en-GB") : "N/A";
            
            return {
              key: item.Id,
              id: item.Id,
              customerId: item.CustomerId || "N/A",
              customerName: `${item.FirstName} ${item.LastName}`,
              company: item.Company || "N/A",
              phone: item.Phone || "N/A",
              email: item.EmailId,
              emailStatus: item.EmailStatus || "N/A",
              country: item.Country || "N/A",
              firstSeenDate: formatDate(item.FirstSeenDate),
              firstOrderPlaced: formatDate(item.FirstOrderPlaced),
              lastOrderPlaced: formatDate(item.LastOrderPlaced),
              firstContacted: formatDate(item.FirstContacted),
              signedUp: formatDate(item.SignedUp),
              totalOrderPlaced: item.TotalOrderPlaced || 0,
              totalOrderValue: item.TotalOrderValue || 0,
              status: item.TotalOrderPlaced ? "Active" : "Inactive",
            };
          });
          setData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched or an error occurs
      }
    };

    fetchCustomerData();
  }, []);

  return (
    <Skeleton loading={loading} active>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content', y: 400 }}
        style={{ width: "100%" }}
      />
    </Skeleton>
  );
};

export default NewCustomerTable;

