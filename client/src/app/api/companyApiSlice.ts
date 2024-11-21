import type { ICompany, IFullCompany } from "../../types/company"
import { apiSlice } from "./apiSlice"

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCompany: builder.query<IFullCompany, {companyId: string}>({
      query: ({companyId}) => ({
        url: `${import.meta.env.VITE_COMPANY_URL}/getCompany/${companyId}`,
      }),
    }),
    getMyCompanies: builder.query<ICompany[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_COMPANY_URL}/getMyCompanies`,
      }),
    }),
  }),
})

export const { useLazyGetCompanyQuery, useGetMyCompaniesQuery, useLazyGetMyCompaniesQuery } = companyApiSlice
