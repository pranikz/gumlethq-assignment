"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Apiresponse, Video } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {};

const baseUrl = "https://gumlethq-assignment.vercel.app/api/hello";

//use this url for local http://localhost:3000/api/hello

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
const limit = 40;
const period = 365;

const Dashboard = (props: Props) => {
  const [data, setData] = useState<Video>();
  const [timePeriod, setTimePeriod] = useState<number>(period);
  useEffect(() => {
    fetchData(page, limit, timePeriod)
      .then((data) => {
        setData(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [timePeriod]);
  const bandwidthData = data?.bandwidth_consumption;
  const storageData = data?.storage_units;
  const assetDurationData = data?.asset_duration;
  const assetData = data?.top_assets;
  return (
    <div>
      {/* headerdata */}
      <div className="">
        <div className="mx-5 lg:mx-auto">
          <select
            onChange={(e) => setTimePeriod(parseInt(e.target.value))}
            id="underline_select"
            className="bg-gray-50 lg:ml-5 lg:max-w-md border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="365">Last 7 days</option>
            <option value="375">Last 10 days</option>
            <option value="385">last 20 days</option>
            <option value="395">last 30 days</option>
            <option value="500">All data</option>
          </select>
        </div>
        <div className=" grid  gap-4 p-4 grid-cols-1 lg:grid-cols-3 mx-auto ">
          <div className="max-w-full lg:max-w-lg rounded-lg  px-6 pt-6 pb-10 dark:bg-[#1b1b1b] bg-gray-200 ">
            <p className="text-sm font-medium text-purple-500 dark:text-purple-300 ">
              Top Duration
            </p>
            <p className="text-2xl lg:text-4xl font-medium text-gray-800 dark:text-gray-200">
              {data?.total_data_top_duration.toFixed(2)}&nbsp;Hours
            </p>
          </div>
          <div className="max-w-full lg:max-w-lg  rounded-lg  px-6 pt-6 pb-10 dark:bg-[#1b1b1b] bg-gray-200 ">
            <p className="text-sm font-medium text-purple-500 dark:text-purple-300 ">
              Storage Unit
            </p>
            <p className="text-2xl lg:text-4xl font-medium text-gray-800 dark:text-gray-200">
              {data?.total_storage_unit_consumption.toFixed(2)}&nbsp;Hours
            </p>
          </div>
          <div className="w-full lg:max-w-lg  rounded-lg  px-6 pt-6 pb-10 dark:bg-[#1b1b1b] bg-gray-200 ">
            <p className="text-sm font-medium text-purple-500 dark:text-purple-300 ">
              Total Bandwidth
            </p>
            <p className="text-2xl lg:text-4xl font-medium text-gray-800 dark:text-gray-200">
              {data?.total_bandwidth_consumption.toFixed(2)}&nbsp;Hours
            </p>
          </div>
        </div>
      </div>

      {/* chart data */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 w-[98%] mx-auto mb-20 ">
        <div className=" dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md ">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Bandwidth Usage
          </h2>
          <div>
            <ResponsiveContainer width="95%" height={400}>
              <LineChart
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
            </ResponsiveContainer>
          </div>
        </div>
        <div className="dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Asset Usage
          </h2>
          <div>
            <ResponsiveContainer width="95%" height={400}>
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
            </ResponsiveContainer>
          </div>
        </div>
        <div className="dark:bg-[#1b1b1b] bg-gray-200  p-4 rounded-md ">
          <h2 className="text-purple-500 dark:text-purple-300  text-lg font-semibold pb-4">
            Storage Usage
          </h2>
          <div>
            <ResponsiveContainer width="95%" height={400}>
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
            </ResponsiveContainer>
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
