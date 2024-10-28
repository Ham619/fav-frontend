"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = {
  CUSTOMER: "customer",
};

const initialData = {
  stages: {
    "stage-1": {
      id: "stage-1",
      title: "Visitor",
      customerIds: ["customer-1", "customer-2", "customer-3"],
    },
    "stage-2": {
      id: "stage-2",
      title: "Lead",
      customerIds: ["customer-4", "customer-5"],
    },
    "stage-3": {
      id: "stage-3",
      title: "Prospect",
      customerIds: [],
    },
    "stage-4": {
      id: "stage-4",
      title: "Customer",
      customerIds: ["customer-6"],
    },
    "stage-5": {
      id: "stage-5",
      title: "Loyal",
      customerIds: [],
    },
    "stage-6": {
      id: "stage-6",
      title: "Inactive",
      customerIds: [],
    },
  },
  customers: {
    "customer-1": { id: "customer-1", name: "John Doe", status: "New", source: "Web" },
    "customer-2": { id: "customer-2", name: "Jane Smith", status: "Lead", source: "Email" },
    "customer-3": { id: "customer-3", name: "Alice Johnson", status: "Active", source: "Referral" },
    "customer-4": { id: "customer-4", name: "Bob Brown", status: "Lead", source: "Social Media" },
    "customer-5": { id: "customer-5", name: "Carol White", status: "Potential", source: "Web" },
    "customer-6": { id: "customer-6", name: "David Black", status: "Regular", source: "Referral" },
  },
  stageOrder: ["stage-1", "stage-2", "stage-3", "stage-4", "stage-5", "stage-6"],
};

export default function Pipeline() {
  const [data, setData] = useState(initialData);

  const moveCustomer = (customerId, sourceStageId, targetStageId, targetIndex) => {
    if (sourceStageId === targetStageId) {
      const stage = data.stages[sourceStageId];
      const newCustomerIds = Array.from(stage.customerIds);
      const currentIndex = newCustomerIds.indexOf(customerId);
      newCustomerIds.splice(currentIndex, 1);
      newCustomerIds.splice(targetIndex, 0, customerId);

      const newStage = {
        ...stage,
        customerIds: newCustomerIds,
      };

      setData((prevData) => ({
        ...prevData,
        stages: {
          ...prevData.stages,
          [newStage.id]: newStage,
        },
      }));
    } else {
      const sourceStage = data.stages[sourceStageId];
      const targetStage = data.stages[targetStageId];

      const newSourceCustomerIds = Array.from(sourceStage.customerIds);
      newSourceCustomerIds.splice(newSourceCustomerIds.indexOf(customerId), 1);

      const newTargetCustomerIds = Array.from(targetStage.customerIds);
      newTargetCustomerIds.splice(targetIndex, 0, customerId);

      setData((prevData) => ({
        ...prevData,
        stages: {
          ...prevData.stages,
          [sourceStage.id]: { ...sourceStage, customerIds: newSourceCustomerIds },
          [targetStage.id]: { ...targetStage, customerIds: newTargetCustomerIds },
        },
      }));
    }
  };

  const Stage = ({ stage, customers }) => {
    const [, drop] = useDrop({
      accept: ItemType.CUSTOMER,
      drop: (item, monitor) => {
        if (item.stageId !== stage.id) {
          moveCustomer(item.id, item.stageId, stage.id, customers.length);
        }
      },
    });

    return (
      <div
        ref={drop}
        className="bg-white rounded shadow p-4"
        style={{ width: '15vw' }} // Set width for the stage
      >
        <div className="text-center text-gray-600 font-medium mb-2">{stage.title}</div>
        <div
          className="flex-grow overflow-y-auto" // Enable y-axis scrolling
          style={{ height: '60vh' }} // Set fixed height for scrolling
        >
          {customers.map((customer, index) => (
            <Customer key={customer.id} customer={customer} index={index} stageId={stage.id} />
          ))}
          <button className="border border-dashed border-pink-500 text-pink-500 rounded px-4 py-2 w-full">+ Add</button>
        </div>
      </div>
    );
  };

  const Customer = ({ customer, index, stageId }) => {
    const [, drag] = useDrag({
      type: ItemType.CUSTOMER,
      item: { id: customer.id, stageId },
    });

    return (
      <div ref={drag} className="bg-gray-100 py-2 px-2 my-2 rounded shadow w-full">
        <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 mr-4">
                <FontAwesomeIcon icon={faUser} size="1x" className="text-gray-700" />
              </div>
          <div>
            <div className="text-base font-medium">{customer.name}</div>
            <div className="text-sm text-gray-500">{customer.status}</div>
          </div>
        </div>
        <div className="text-sm text-gray-500">{customer.source}</div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[95vw]"> {/* Set fixed width for the entire screen */}
        {/* Top Bar with Customers and Profile Overview */}
        <div className="flex justify-between items-center p-1 mt-4 ml-4">
          <div>
            <h1 className="text-2xl font-bold">Sales Pipeline</h1>
            <p className="text-[#37e691] text-base">Default Version</p>
          </div>
        </div>
        <div className="px-4 py-1 bg-gray-100">
          <div className="flex items-center w-[93vw] justify-between mb-4 py-4 px-2 bg-white rounded shadow">
            <div className="flex space-x-2">
              <button className="bg-white text-pink-500 border border-pink-500 rounded px-4 py-2">View: Pipeline</button>
              <button className="bg-white text-pink-500 border border-pink-500 rounded px-4 py-2">Type: B2C</button>
            </div>
            <input type="text" placeholder="Search Here..." className="border border-gray-300 rounded px-4 py-2 w-2/3" />
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded px-4 py-2">Edit Pipeline</button>
          </div>
          <div className="flex space-x-4 overflow-x-auto"> {/* Enable horizontal scrolling */}
            <div className="flex space-x-4">
              {data.stageOrder.map((stageId) => {
                const stage = data.stages[stageId];
                const customers = stage.customerIds.map((customerId) => data.customers[customerId]);

                return <Stage key={stage.id} stage={stage} customers={customers} />;
              })}
              <div className="bg-white rounded shadow p-4 flex items-center" style={{ width: '15vw', height: '69vh' }}>
                <button className="border border-dashed border-pink-500 text-pink-500 rounded px-4 py-2 w-full">+ Add Stage</button>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 bg-gray-200 rounded-l">{"<"}</button>
            {[1, 2, '...', 9, 10].map((page, index) => (
              <button key={index} className={`px-4 py-2 ${page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{page}</button>
            ))}
            <button className="px-4 py-2 bg-gray-200 rounded-r">{">"}</button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
