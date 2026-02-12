import { apiSlice } from "./apiSlice";

const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),

    getAllTasks: builder.query({
      query: (pageNo) => ({
        url: `tasks/paged-tasks`,
        params: { pageNo },
      }),
      providesTags: ["Tasks"],
    }),

    getTaskById: builder.query({
      query: (id) => ({
        url: `tasks/task/${id}`,
      }),
      providesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useDeleteTaskMutation,
} = taskApiSlice;
