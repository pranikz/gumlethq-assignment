// pages/api/usage.ts
import { NextApiRequest, NextApiResponse } from "next";
import data from "./data.json";

const getFilteredUsage = (usageType: string, days: number) => {
  const currentDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - days);

  return data.filter((item: any) => {
    const usageDate = new Date(item.date);
    return (
      item.type === usageType &&
      usageDate >= sevenDaysAgo &&
      usageDate <= currentDate
    );
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, days } = req.query;

  if (!type || !days) {
    return res.status(400).json({ error: "Missing type or days parameter" });
  }

  const parsedDays = parseInt(days as string);
  if (isNaN(parsedDays) || parsedDays <= 0) {
    return res.status(400).json({ error: "Invalid days parameter" });
  }

  let filteredData = [];

  switch (type) {
    case "streaming":
      filteredData = getFilteredUsage("Streaming usage", parsedDays);
      break;
    case "transcoding":
      filteredData = getFilteredUsage("Transcoding usage", parsedDays);
      break;
    case "storage":
      filteredData = getFilteredUsage("Storage usage", parsedDays);
      break;
    default:
      return res.status(400).json({ error: "Invalid usage type" });
  }

  return res.json(filteredData);
}
