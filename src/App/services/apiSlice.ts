import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DashboardProduct } from "../../interfaces";

type GetDashboardProductsArgs = {
  page: number;
};

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (build) => ({
    getDashboardProducts: build.query<
      DashboardProduct,
      GetDashboardProductsArgs
    >({
      query: ({ page }) => ({
        url: `products?limit=10&skip=${(page - 1) * 10}`,
      }),
    }),
  }),
});

export const { useGetDashboardProductsQuery } = apiSlice;
