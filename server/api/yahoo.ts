import { defineEventHandler, getQuery } from "h3";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();

  // 空のパラメータを除外
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );

  try {
    const res = await axios.get(
      "https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch",
      {
        params: {
          appid: config.public.YAHOO_API_APPID,
          ...cleanedQuery,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error("Yahoo API Error:", error.response?.data || error.message);
    return {
      error: true,
      status: error.response?.status || 500,
      message: error.response?.data?.Message || error.message,
    };
  }
});
