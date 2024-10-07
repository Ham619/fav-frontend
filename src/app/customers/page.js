"use client";
import React, { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faFilter,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import NewCustomerTable from "./NewCustomerTable";

export default function Customers() {
  const [showPaper, setShowPaper] = useState(false);
  return (
    // <div className="px-3 py-4 flex gap-5 items-center ">
      <div className="flex flex-col w-[90vw] h-[100vh] ml-4 overflow-y-auto">
        <div className=" w-full p-4 flex justify-between items-center">
          <div>
            <h1 className="font-bold text-black text-3xl">All Customers</h1>
            <h4 className="font-medium text-[#37e691] text-xl mt-1">
              Detailed View
            </h4>
          </div>
          <div className="flex gap-4 p-1">
            <button className="font-semibold text-xs flex items-center gap-3 py-1 bg-gradient-to-br  from-pink-500 to-purple-600 rounded-md px-2  text-white shadow-lg ">
              <span className=" flex items-center justify-center border-2 p-1 border-white rounded-[50%]">
                <FontAwesomeIcon className="w-[10px]" icon={faPlus} />
              </span>
              Add Customer
            </button>
            <button className=" font-semibold text-xs flex items-center gap-1 bg-gradient-to-br  from-pink-500 to-purple-600 rounded-md px-3 text-white shadow-lg ">
              <span className=" flex items-center m-0 p-0 justify-center ">
                <FileDownloadOutlinedIcon />
              </span>
              Import
            </button>
            <button className=" font-semibold text-xs flex items-center gap-1 bg-gradient-to-br from-pink-500 to-purple-600 rounded-md px-3 text-white shadow-lg ">
              <span className=" flex items-center justify-center py-1 ]">
                <FileUploadOutlinedIcon />
              </span>
              Export
            </button>
          </div>
        </div>

        {showPaper && (
          <div className=" w-full flex justify-between items-center px-10 mb-2">
            <div className="w-96 h-56 bg-white rounded-lg shadow-lg"></div>
            <div className="w-96 h-56 bg-white rounded-lg shadow-lg"></div>
            <div className="w-96 h-56 bg-white rounded-lg shadow-lg"></div>
          </div>
        )}

        <div className="rounded-3xl w-full bg-white p-10 flex flex-col gap-6">
          <div className="w-full flex items justify-between">
            <div className="flex items-center gap-3">
              <div className=" bg-[#f7f7f7] text-[#e8e8e8] flex items-center gap-1 p-1 rounded-md  ">
                <FontAwesomeIcon
                  className="w-[22px]"
                  icon={faSearch}
                  size="2xl"
                  color="#9c9a9a"
                />
                <input
                  className="focus:outline-none focus:border-none text-sm text-[#808080] bg-[#f7f7f7]"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div className="bg-[#f7f7f7] rounded-md p-1 ">
                <button className="flex items-center gap-2 text-sm text-[#808080]">
                  <FontAwesomeIcon
                    className="w-[22px]"
                    icon={faFilter}
                    size="2xl"
                    color="#f7f7f7"
                  />
                  Filter
                  <FontAwesomeIcon
                    className="w-[10px] mb-1"
                    icon={faSortDown}
                    size="2xl"
                    color="#adacac"
                  />
                </button>
              </div>
              <div className="bg-[#f7f7f7] rounded-md p-1 ">
                <button className="flex items-center gap-2 text-sm px-2 text-[#808080]">
                  Sort A-Z
                  <FontAwesomeIcon
                    className="w-[10px] mb-1"
                    icon={faSortDown}
                    size="2xl"
                    color="#adacac"
                  />
                </button>
              </div>
              <div className="bg-[#f7f7f7] rounded-md p-1 ">
                <button className="flex items-center gap-2 text-sm px-2 text-[#808080]">
                  Segment (Active)
                  <FontAwesomeIcon
                    className="w-[10px] mb-1"
                    icon={faSortDown}
                    size="2xl"
                    color="#adacac"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="flex items-center font-semibold text-xs gap-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-md p-2 text-white shadow-lg ">
                <LocalOfferOutlinedIcon className="rotate-90" />
                Show Attributes
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-md p-2 text-white shadow-lg ">
                <SettingsOutlinedIcon />
              </button>

              <button
                className="flex items-center gap-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-md p-2 text-white shadow-lg "
                onClick={() => setShowPaper(!showPaper)}
              >
                <FullscreenExitOutlinedIcon />
              </button>
            </div>
          </div>

          <NewCustomerTable />
          {/* <div className='w-fit w-max-[90%] overflow-x-autoauto mt-3 p-1 rounded-md shadow-xl'>
                  
              </div> */}
        </div>
      </div>
    // </div>
  );
}
