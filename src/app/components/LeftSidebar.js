"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "antd";
import { faMagnifyingGlass, faArrowUp, faFilter, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const LeftSidebar = ({ customers, loading, handleCustomerClick }) => {
  // State to track search input and filtered customers
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Effect to filter customers based on search term
  useEffect(() => {
    const filtered = customers.filter((customer) => {
      const fullName = `${customer?.FirstName} ${customer?.LastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  // Function to handle sorting by first letter of first name
  const sortCustomersByFirstLetter = () => {
    const sorted = [...filteredCustomers].sort((a, b) => {
      const firstLetterA = a?.FirstName[0].toLowerCase();
      const firstLetterB = b?.FirstName[0].toLowerCase();
      return firstLetterA.localeCompare(firstLetterB);
    });
    setFilteredCustomers(sorted);
  };

  return (
    <div className="bg-white w-1/4 overflow-scroll h-[87vh] p-6 rounded-lg shadow-lg">
      {/* Search Conversation Card */}
      <div className="bg-gray-100 p-4 rounded-sm shadow-md mb-6">
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 pl-10 pr-4 border rounded-md"
            placeholder="Search Customer..."
            value={searchTerm} // Bind input value to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm when user types
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon
              className="text-gray-500"
              icon={faMagnifyingGlass}
            />
          </div>
        </div>
      </div>

      {/* Dropdown and Icons Section Card */}
      <div className="p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <select
            className="text-gray-700 border-gray-400 px-2 py-1 focus:outline-none rounded-md"
            defaultValue="Open"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="flex items-center space-x-1 ml-2">
            <span
              className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded cursor-pointer"
              onClick={sortCustomersByFirstLetter} // Trigger sorting when clicked
            >
              <FontAwesomeIcon icon={faArrowUp} size="sm" />
            </span>
            <span className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded">
              <FontAwesomeIcon icon={faFilter} size="sm" />
            </span>
          </div>
        </div>

        {/* Conditionally render skeleton, customer data, or no-customer message */}
        {loading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 shadow rounded mb-6 cursor-pointer"
              onClick={() => handleCustomerClick(customer)}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 text-black">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </div>

                <div className="ml-4 mr-2 flex-wrap">
                  <h2 className="font-semibold text-black">
                    {customer?.FirstName} {customer?.LastName}
                  </h2>
                  <p className="text-[0.5rem] text-gray-500 mb-1 text-wr">
                    {customer?.EmailId}
                  </p>
                  <p className="text-[0.65rem] text-gray-500">
                    {customer?.FirstName} is a long-time customer with a
                    history of high-value purchases.
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center mt-4">
            No customer available
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
