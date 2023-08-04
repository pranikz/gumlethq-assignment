// Notice from where NextResponse is imported:
import { NextResponse } from "next/server";
import data from "./data/data.json";
import { Apiresponse, Video } from "@/app/types";



export async function GET(
  request: Request
): Promise<NextResponse<Apiresponse<Video>>> {
  // ...

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  console.log(page);
  const limit = Number(searchParams.get("limit"));
  console.log(limit);
  const period = Number(searchParams.get("period"));
  console.log(period);

  if (!page || !limit || !period) {
    return NextResponse.json({
      success: false,
      error: "Missing query parameters",
    });
  }
  if (
    isNaN(page) ||
    isNaN(limit) ||
    isNaN(period) ||
    page < 1 ||
    limit < 1 ||
    period < 1
  ) {
    return NextResponse.json({
      success: false,
      error: "Query parameters must be numbers",
    });
  }

  const timestampThreshold =
    Math.floor(Date.now() / 1000) - period * 24 * 60 * 60;

  const filtered_bandwidth_consumption = data.bandwidth_consumption.filter(
    (item) => item.timestamp >= timestampThreshold
  );
  const filtered_top_assets = data.top_assets;
  const filtered_top_duration = data.asset_duration.filter(
    (item) => item.timestamp >= timestampThreshold
  );
  const filtered_storage_units = data.storage_unit.filter(
    (item) => item.timestamp >= timestampThreshold
  );

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const filtered_data_bandwidth_consumption =
    filtered_bandwidth_consumption.slice(startIndex, endIndex);
  const total_bandwidth_consumption =
    filtered_data_bandwidth_consumption.reduce(
      (acc, data) => acc + data.units,
      0
    ) / 3600;

  const filtered_data_top_duration = filtered_top_duration.slice(
    startIndex,
    endIndex
  );
  const total_data_top_duration =
    filtered_data_top_duration.reduce((acc, data) => acc + data.units, 0) /
    3600;
  const filtered_data_storage_units = filtered_storage_units.slice(
    startIndex,
    endIndex
  );
  const total_storage_unit_consumption =
    filtered_data_storage_units.reduce((acc, data) => acc + data.units, 0) /
    3600;

  return NextResponse.json({
    success: true,
    data: {
      bandwidth_consumption: filtered_data_bandwidth_consumption,
      top_assets: filtered_top_assets,
      asset_duration: filtered_data_top_duration,
      storage_units: filtered_data_storage_units,
      total_bandwidth_consumption: total_bandwidth_consumption,
      total_storage_unit_consumption: total_storage_unit_consumption,
      total_data_top_duration: total_data_top_duration,
    },
  });
}
