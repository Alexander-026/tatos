import { Paper, Typography } from "@mui/material"
import StyledBox from "../../../components/common/StyledBox"
import { useParams } from "react-router-dom"
import { useLazyGetCompanyQuery } from "../../../app/api/companyApiSlice"
import { useCallback, useEffect } from "react"
import LoaderWrapper from "../../../components/LoaderWrapper"
import FormCompany from "./FormCompany"
import type {  IFullCompany } from "../../../types/company"

const Company = () => {
  const { id } = useParams()
  const [getCompany, { data: company, isError, error, isLoading }] =
    useLazyGetCompanyQuery()

  const getCompanyHanlder = useCallback(() => {
    if (id) {
      getCompany({ companyId: id })
    }
  }, [getCompany, id])

  useEffect(() => {
    getCompanyHanlder()
  }, [getCompanyHanlder])

  return (
    <StyledBox sx={{ padding: "0.5rem" }} flexGrow={1}>
      <LoaderWrapper<IFullCompany> data={company} loading={isLoading}>
        {(companyData) => <FormCompany companyData={companyData} />}
      </LoaderWrapper>
    </StyledBox>
  )
}

export default Company
