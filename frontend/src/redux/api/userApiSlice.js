import { apiSlice } from "./apiSlice.js";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (registrationData) => ({
        url: `/users`,
        method: "POST",
        body: registrationData,
      }),
      invalidatesTags: ["Users"],
    }),

    login: builder.mutation({
      query: (loginData) => ({
        url: `users/login`,
        method: "POST",
        body: loginData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `users/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `users/user/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/user/${id}`,
        method: "DELETE",
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `users/admin/allusers`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    deleteUserByAdmin: builder.mutation({
      query: (id) => ({
        url: `users/user/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    updateUserByAdmin: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `users/user/admin/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useDeleteUserByAdminMutation,
  useUpdateUserByAdminMutation,
} = userApiSlice;
