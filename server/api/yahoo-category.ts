import { defineEventHandler, getQuery } from "h3";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const categoryIds = [
    13457, 2498, 2505, 2511, 2513, 2501, 2500, 2502, 2504, 2506, 2507, 2508,
    2503, 2509, 2510, 2497, 2512, 2514, 2516, 2517, 10002,
  ];

  const results: Array<{
    currentCategory: any;
    childrenCategories: any;
  }> = [];

  for (const id of categoryIds) {
    const res = await axios.get(
      "https://shopping.yahooapis.jp/ShoppingWebService/V1/categorySearch",
      {
        params: {
          appid: config.public.YAHOO_API_APPID,
          category_id: id,
          output: "json",
        },
      }
    );
    const data = res.data.ResultSet["0"].Result.Categories;
    results.push({
      currentCategory: data.Current,
      childrenCategories: data.Children,
    });
  }

  return results;
});
