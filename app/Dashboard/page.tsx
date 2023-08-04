"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Apiresponse, Video } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
type Props = {};

const chartdata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const baseUrl = "https://gumlethq-assignment.vercel.app/api/hello";

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
  const bandwidthData = data?.bandwidth_consumption;
  const storageData = data?.storage_units;
  const assetDurationData = data?.asset_duration;
  const assetData = data?.top_assets;
  return (
    <div>
      {/* headerdata */}
      <div className="">
        <div className=" grid  gap-4 p-4 grid-cols-1 lg:grid-cols-3 mx-auto ">
          <div className="max-w-full lg:max-w-lg rounded-lg  px-6 pt-6 pb-10 dark:bg-[#1b1b1b] bg-gray-200 ">
            <p className="text-sm font-medium text-purple-500 dark:text-purple-300 ">
              Top Duration
            </p>
            <p className="text-4xl font-medium text-gray-800 dark:text-gray-200">
              {data?.total_data_top_duration.toFixed(3)}&nbsp;Hours
            </p>
          </div>

          <div className="max-w-full lg:max-w-lg  rounded-lg  px-6 pt-6 pb-10 dark:bg-[#1b1b1b] bg-gray-200 ">
            <p className="text-sm font-medium text-purple-500 dark:text-purple-300 ">
              Storage Unit
            </p>
            <p className="text-4xl font-medium text-gray-800 dark:text-gray-200">
              {data?.total_storage_unit_consumption.toFixed(3)}&nbsp;Hours
            </p>
          </div>

          <div className="w-full lg:max-w-lg  rounded-lg  px-6 pt-6 pb-10 dark:bg-[#1b1b1b] bg-gray-200 ">
            <p className="text-sm font-medium text-purple-500 dark:text-purple-300 ">
              Total Bandwidth
            </p>
            <p className="text-4xl font-medium text-gray-800 dark:text-gray-200">
              {data?.total_bandwidth_consumption.toFixed(3)}&nbsp;Hours
            </p>
          </div>
        </div>
      </div>

      {/* chart data */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 w-[98%] mx-auto ">
        <div className=" dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md ">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Bandwidth Usage
          </h2>
          <div>
            {" "}
            <LineChart
              width={700}
              height={500}
              data={bandwidthData}
              margin={{
                top: 5,
                bottom: 5,
                left: 10,
              }}
            >
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="units"
                stroke="#8884d8"
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </div>
        </div>
        <div className="dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Asset Usage
          </h2>
          <div>
            {" "}
            <LineChart
              width={700}
              height={500}
              data={assetDurationData}
              margin={{
                top: 5,
                bottom: 5,
                left: 10,
              }}
            >
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="units"
                stroke="#8884d8"
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </div>
        </div>
        <div className="dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md ">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Storage Usage
          </h2>
          <div>
            {" "}
            <LineChart
              width={700}
              height={500}
              data={storageData}
              margin={{
                top: 5,
                bottom: 5,
                left: 10,
              }}
            >
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="units"
                stroke="#8884d8"
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </div>
        </div>
        <div className="dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Top assets
          </h2>
          <div className="w-full">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light ">
                      <thead className="border-b font-medium dark:border-neutral-500 bg-purple-500 dark:bg-purple-950 rounded-full ">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Asset Name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Units Consumed
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {assetData?.map((asset) => (
                          <tr
                            key={asset.collection_id}
                            className="border-b dark:border-neutral-500"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {asset.asset_id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {asset.collection_name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {asset.units}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
