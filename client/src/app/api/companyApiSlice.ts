import type {
  ICompany,
  ICompanyUpdateBody,
  IFullCompany,
  UpdatedCompany,
} from "../../types/company"
import { apiSlice } from "./apiSlice"

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCompany: builder.query<IFullCompany, { companyId: string }>({
      query: ({ companyId }) => ({
        url: `${import.meta.env.VITE_COMPANY_URL}/getCompany/${companyId}`,
      }),
      providesTags: ["company"],
    }),
    getMyCompanies: builder.query<ICompany[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_COMPANY_URL}/getMyCompanies`,
      }),
    }),
    updateCompany: builder.mutation<UpdatedCompany, ICompanyUpdateBody>({
      query: ({ companyId, body }) => ({
        url: `${import.meta.env.VITE_COMPANY_URL}/update/${companyId}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["company"],
    }),
  }),
})

export const {
  useLazyGetCompanyQuery,
  useGetMyCompaniesQuery,
  useLazyGetMyCompaniesQuery,
  useUpdateCompanyMutation
} = companyApiSlice
