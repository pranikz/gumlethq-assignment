"use client";
import React, { useEffect, useState } from "react";

type Props = {};

import axios, { AxiosResponse } from "axios";
import { Apiresponse, Video } from "../types";

const baseUrl = "http://localhost:3000/api/hello";

async function fetchData(
  page: number,
  limit: number,
  period: number
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.get(baseUrl, {
      params: {
        page: page,
        limit: limit,
        period: period,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
const page = 1;
const limit = 20;
const period = 380;

// Call the fetchData function with the specified parameters

const Dashboard = (props: Props) => {
  const [data, setData] = useState<Video>();
  useEffect(() => {
    fetchData(page, limit, period)
      .then((data) => {
        setData(data?.data);
        console.log("API response:", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {/* headerdata */}
      <div className="">
        <div className=" grid  gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 mx-auto ">
          <div className="max-w-lg rounded-lg  px-6 pt-6 pb-10 dark:bg-[#1b1b1b] bg-gray-200 ">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-100">
              Top Duration
            </p>
            <p className="text-4xl font-medium text-gray-800 dark:text-gray-200">
              {data?.total_data_top_duration.toFixed(3)}&nbsp;Hours
            </p>
          </div>

          <div className="max-w-lg rounded-lg  px-6 pt-6 pb-10 dark:bg-[#1b1b1b] bg-gray-200 ">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-100">
              Storage Unit
            </p>
            <p className="text-4xl font-medium text-gray-800 dark:text-gray-200">
              {data?.total_storage_unit_consumption.toFixed(3)}&nbsp;Hours
            </p>
          </div>

          <div className="max-w-lg rounded-lg  px-6 pt-6 pb-10 dark:bg-[#1b1b1b] bg-gray-200 ">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-100">
              Total Bandwidth
            </p>
            <p className="text-4xl font-medium text-gray-800 dark:text-gray-200">
              {data?.total_bandwidth_consumption.toFixed(3)}&nbsp;Hours
            </p>
          </div>
        </div>
      </div>

      {/* chart data */}
      <div className="grid gap-4 grid-cols-2 w-[98%] mx-auto ">
        <div className=" dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md ">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Streaming Usage
          </h2>
          <div>Hello</div>
        </div>
        <div className="dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Transcoding Usage
          </h2>
          <div>Hello</div>
        </div>
        <div className="dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md ">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Storage Usage
          </h2>
          <div>Hello</div>
        </div>
        <div className="dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Top assets
          </h2>
          <div>Hello</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
