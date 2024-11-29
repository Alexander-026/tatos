import type {
  EmailStatus,
  LoginUser,
  RegisterUser,
  User,
} from "../../types/user"
import { apiSlice } from "./apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<User, RegisterUser>({
      query: data => ({
        url: `${import.meta.env.VITE_USERS_URL}/registration`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<User, LoginUser>({
      query: data => ({
        url: `${import.meta.env.VITE_USERS_URL}/login`, // for develop
        method: "POST",
        body: data,
      }),
    }),
    confirmEmail: builder.query<
      { emailStatus: EmailStatus },
      { activationId: string }
    >({
      query: ({ activationId }) => ({
        url: `${import.meta.env.VITE_USERS_URL}/confirmEmail/${activationId}`,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${import.meta.env.VITE_USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    // updateUser: builder.mutation<User, UpdateUser>({
    //   query: data => ({
    //     url: `${import.meta.env.VITE_USERS_URL}/update`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
    // setConfirmMailer: builder.mutation<{message: string}, void>({
    //   query: () => ({
    //     url: `${import.meta.env.VITE_USERS_URL}/setConfirmMailer`,
    //     method: "POST",
    //   }),
    // }),

    refresh: builder.mutation<User, {refreshToken: string}>({
      query: (body) => ({
        url: `${import.meta.env.VITE_USERS_URL}/refresh`,
        method: "POST",
        body
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyConfirmEmailQuery,
  // useUpdateUserMutation,
  useRefreshMutation,
  useLogoutMutation,
} = userApiSlice
