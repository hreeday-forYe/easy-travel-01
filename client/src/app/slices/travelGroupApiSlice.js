import { travelGroup_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const travelGroupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTravelGroup: builder.mutation({
      query: (data) => ({
        url: `${travelGroup_url}/`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    updateJournal: builder.mutation({
      query: (data) => ({
        url: `${travelGroup_url}/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    // Gets all the journals of the user
    getTravelGroup: builder.query({
      query: () => ({
        url: `${travelGroup_url}/`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getTravelGroupId: builder.query({
      query: (id) => ({
        url: `${travelGroup_url}/all-expenses?id=${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    deleteJournal: builder.mutation({
      query: (journalId) => ({
        url: `${travelGroup_url}/${journalId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    getSingleJournal: builder.query({
      query: () => ({
        url: `${travelGroup_url}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateTravelGroupMutation,
  useUpdateJournalMutation,
  useGetTravelGroupQuery,
  useGetTravelGroupIdQuery,
  useDeleteJournalMutation,
  useGetSingleJournalQuery,
} = travelGroupApiSlice;
