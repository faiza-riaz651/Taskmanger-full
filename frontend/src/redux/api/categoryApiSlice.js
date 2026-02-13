import { apiSlice } from "./apiSlice";

const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/categorys",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Categorys"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categorys/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categorys"],
    }),

    getAllCat: builder.query({
      query: () => ({
        url: `categorys/allCat`,
      }),
      providesTags: ["Categorys"],
    }),

    getAllCategorys: builder.query({
      query: (pageNo) => ({
        url: "/categorys/all-category",
        params: { pageNo },
      }),
      providesTags: ["Categorys"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategorysQuery,
  useDeleteCategoryMutation,
  useGetAllCatQuery,
} = categorySlice;
