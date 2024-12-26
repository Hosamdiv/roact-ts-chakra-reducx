import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DashboardProduct } from "../../interfaces";

type GetDashboardProductsResponse = {
  products: DashboardProduct[];
  total: number;
  skip: number;
  limit: number;
};

type GetDashboardProductsArgs = {
  page: number;
};

export const ProductsApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: build => ({
    getDashboardProducts: build.query<
      GetDashboardProductsResponse,
      GetDashboardProductsArgs
      // ** DET PRODUCT
    >({
      query: ({ page }) => ({
        url: `products?limit=5&skip=${page}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    // ** UPDATE PRODUCT
    updateDashboardProducts: build.mutation({
      query: ({ id, body }) => ({
        url: `products/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ProductsApiSlice.util.updateQueryData(
            "getDashboardProducts",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (id) => [{ type: "Products", id }],
    }),
    // ** DELETE PRODUCT
    deleteDashboardProducts: build.mutation({
      query(id) {
        return {
          url: `products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (id) => [{ type: "Products", id }],
    }),
    // ** CREATE PRODUCT
    createDashboardProducts: build.mutation({
      query: ({ body }) => ({
        url: `products`,
        method: "POST",
        body,
      }),
      async onQueryStarted({ body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ProductsApiSlice.util.updateQueryData(
            "getDashboardProducts",
            { page: 0 },
            (draft) => {
              draft.products.push(body);
              draft.total += 1;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: () => [{ type: "Products", id: "LIST" }],
    }),
  }),
});
export const {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductsMutation,
  useUpdateDashboardProductsMutation,
  useCreateDashboardProductsMutation,
} = ProductsApiSlice;










