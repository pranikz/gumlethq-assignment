export type Apiresponse<Data> =
  | {
      success: true;
      data: Data;
    }
  | { success: false; error: string };

export type Video = {
  bandwidth_consumption: {
    timestamp: number;
    units: number;
  }[];
  top_assets: {
    collection_id: string;
    asset_id: string;
    units: number;
    collection_name: string;
  }[];
  asset_duration: {
    timestamp: number;
    units: number;
  }[];
  storage_units: {
    timestamp: number;
    units: number;
  }[];
  total_bandwidth_consumption: number;
  total_storage_unit_consumption: number;
  total_data_top_duration: number;
};
