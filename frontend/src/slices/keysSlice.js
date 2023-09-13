import { apiSlice } from "./apiSlice";

const KEYS_URL = "/api/keys";

export const keysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutations
    createKey: builder.mutation({
      query: (data) => ({
        url: `${KEYS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    getKeys: builder.mutation({
      query: (data) => ({
        url: `${KEYS_URL}/user/${data.userId}`,
        method: "GET",
        body: data,
      }),
    }),
    updateKey: builder.mutation({
      query: (data) => ({
        url: `${KEYS_URL}/user/${data.userId}/note/${data.keyId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteKey: builder.mutation({
      query: (data) => ({
        url: `${KEYS_URL}/user/${data.userId}/note/${data.keyId}`,
        method: "DELETE",
        body: data,
      }),
    }),
    shareKey: builder.mutation({
      query: (data) => ({
        url: `${KEYS_URL}/share`,
        method: "POST",
        body: data,
      }),
    }),
    getSharedKeys: builder.mutation({
      query: (data) => ({
        url: `${KEYS_URL}/shared/user/${data.userId}`,
        method: "GET",
        body: data,
      }),
    }),
    removeSharedKey: builder.mutation({
      query: (data) => ({
        url: `${KEYS_URL}/note/${data.keyId}/shared/${data.userIdToRemove}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateKeyMutation,
  useGetQRCodeMutation,
  useUpdateUserMutation,
  useDeleteKeyMutation,
  useShareKeyMutation,
  useGetKeysMutation,
  useRemoveSharedKeyMutation,
} = keysApiSlice;
