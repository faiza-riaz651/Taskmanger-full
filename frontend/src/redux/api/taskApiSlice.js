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

    createTask: builder.mutation({
      query: (createData) => ({
        url: `/tasks`,
        method: "POST",
        body: createData,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation({
      query: ({ updateTask, id }) => ({
        url: `tasks/task/${id}`,
        method: "PATCH",
        body: updateTask,
      }),
      invalidatesTags: ["Tasks"],
    }),

    getTasksByCat: builder.query({
      query: () => ({
        url: `tasks/task/${category}`,
        method: "GET",
      }),
      providesTags: ["Tags"],
    }),

    getAllTasks: builder.query({
      query: (pageNo) => ({
        url: `tasks/paged-tasks`,
        params: { pageNo },
      }),
      providesTags: ["Tasks"],
    }),

    getVitalTask: builder.query({
      query: () => ({
        url: `tasks/vital-task`,
      }),
      providesTags: ["Tasks"],
    }),

    getTaskSummary: builder.query({
      query: () => ({
        url: "/tasks/all-task",
      }),
      providesTags: ["Tasks"],
    }),
    getUrgentTasks: builder.query({
      query: () => ({
        url: `tasks/urgent-task`,
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
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useGetVitalTaskQuery,
  useGetTaskSummaryQuery,
  useGetUrgentTasksQuery,
  useGetTasksByCatQuery,
} = taskApiSlice;
