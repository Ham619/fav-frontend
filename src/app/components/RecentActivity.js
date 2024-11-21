import { Timeline } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSort,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const RecentActivity = () => {
  const [isRecentActivityExpanded, setIsRecentActivityExpanded] =
    useState(true);

  const toggleRecentActivityExpand = () => {
    setIsRecentActivityExpanded(!isRecentActivityExpanded);
  };

  const activities = [
    {
      date: "25-07-23",
      activity: "Order #101 Completed",
      color: "bg-green-100",
    },
    { date: "26-07-23", activity: "Order #102 Shipped", color: "bg-blue-100" },
    {
      date: "27-07-23",
      activity: "Order #103 Processing",
      color: "bg-purple-100",
    },
    {
      date: "28-07-23",
      activity: "Order #104 Canceled",
      color: "bg-orange-100",
    },
    {
      date: "29-07-23",
      activity: "Order #105 Completed",
      color: "bg-green-100",
    },
    {
      date: "30-07-23",
      activity: "Order #106 Delivered",
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="max-w-sm mx-auto bg-white p-4 rounded-lg shadow-md mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-gray-600 mb-2">Recent Activity</h2>
        <FontAwesomeIcon
          icon={isRecentActivityExpanded ? faCaretUp : faCaretDown}
          className="cursor-pointer text-gray-600"
          onClick={toggleRecentActivityExpand}
        />
      </div>

      {isRecentActivityExpanded && (
        <>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Type here..."
              className="w-full p-2 border rounded-md text-black"
            />
            <div className="absolute right-2 top-2 flex space-x-2">
              <button className="p-1">
                <FontAwesomeIcon icon={faFilter} size="md" />
              </button>
              <button className="p-1">
                <FontAwesomeIcon icon={faSort} size="md" />
              </button>
            </div>
          </div>
          <Timeline>
            {activities.map((activity, index) => (
              <Timeline.Item
                key={index}
                dot={
                  <div className="w-4 h-4 bg-gray-300 rounded-full mt-2"></div>
                }
              >
                <div className="flex items-center">
                  <div className="text-gray-500 w-20 text-[0.7rem] font-mediumt-">
                    {activity.date}
                  </div>
                  <div className="flex-grow flex items-center">
                    <div
                      className={`flex-grow h-8 ${activity.color} rounded-md flex items-center justify-center text-[0.6rem] text-gray-500 font-medium px-3 py-2`}
                    >
                      {activity.activity}
                    </div>
                  </div>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </>
      )}
    </div>
  );
};

export default RecentActivity;
