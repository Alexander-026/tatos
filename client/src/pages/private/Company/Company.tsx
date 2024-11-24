import StyledBox from "../../../components/common/StyledBox"
import { useContext } from "react"
import FormCompany from "./FormCompany"
import { CompanyContext } from "../../../context/CompanyContext"

const Company = () => {
  const { companyData } = useContext(CompanyContext)

  return (
    <StyledBox sx={{ padding: "0.5rem", width: "100%" }} flexGrow={1}>
      <FormCompany companyData={companyData} />
    </StyledBox>
  )
}

export default Company
