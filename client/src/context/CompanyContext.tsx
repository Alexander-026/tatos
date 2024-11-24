import type { FC, PropsWithChildren } from "react"
import { createContext, useCallback, useEffect, useState } from "react"
import type { CompanyContextType, IFullCompany } from "../types/company"
import useLocalStorage from "../hooks/useLocalStorage"
import { useLazyGetCompanyQuery } from "../app/api/companyApiSlice"
import type { SnackbarCloseReason } from "@mui/material"
import LoaderWrapper from "../components/LoaderWrapper"

export const CompanyContext = createContext<CompanyContextType>(
  {} as CompanyContextType,
)

const CompanyContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [companyId] = useLocalStorage("companyId")
  const [getCompany, { data: company, isError, error, isLoading }] =
    useLazyGetCompanyQuery()

  const getCompanyHanlder = useCallback(() => {
    if (companyId) {
      getCompany({ companyId })
    }
  }, [getCompany, companyId])

  useEffect(() => {
    getCompanyHanlder()
  }, [getCompanyHanlder])

  return (
    <LoaderWrapper<IFullCompany>
      data={company}
      loading={isLoading}
      error={error}
    >
      {companyData => (
        <CompanyContext.Provider value={{ companyData }}>
          {children}
        </CompanyContext.Provider>
      )}
    </LoaderWrapper>
  )
}

export default CompanyContextProvider
