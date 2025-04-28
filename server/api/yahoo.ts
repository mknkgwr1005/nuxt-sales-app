import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const {
    query,
    genre_category_id,
    price_from,
    price_to,
    results,
    start,
    sort,
  } = req.query;

  const YAHOO_API_URL =
    "https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch";
  const YAHOO_API_APPID = process.env.YAHOO_API_APPID;

  if (!YAHOO_API_APPID) {
    return res
      .status(500)
      .json({ error: "Yahoo API App ID is not set in environment variables." });
  }

  try {
    const params = {
      appid: YAHOO_API_APPID,
      query,
      genre_category_id,
      price_from,
      price_to,
      results,
      start,
      sort,
      image_size: 300,
    };

    const response = await axios.get(YAHOO_API_URL, { params });
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
