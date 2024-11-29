import StyledBox from "../../../components/common/StyledBox"
import { useContext } from "react"
import FormCompany from "./FormCompany"
import { CompanyContext } from "../../../context/CompanyContext"
import { useAppSelector } from "../../../app/hooks"
import ReadonlyCompanyData from "./ReadonlyCompanyData"
import { type User, UserRole } from "../../../types/user"
import type { IFullCompany } from "../../../types/company"

export const CompanyContent = ({
  user,
  companyData,
}: {
  user: User["user"] | null
  companyData: IFullCompany
}) => {
  if (!user?.role) return null

  switch (user.role) {
    case UserRole.director:
    case UserRole.manager:
      return <FormCompany companyData={companyData} />
    case UserRole.employee:
      return <ReadonlyCompanyData employees={companyData.employees} />
    default:
      return null
  }
}

const Company = () => {
  const { user } = useAppSelector(state => state.user)
  const { companyData } = useContext(CompanyContext)

        
  console.log("companyData", companyData)

  return (
    <StyledBox sx={{ padding: "0.5rem", width: "100%" }} flexGrow={1}>
      <CompanyContent user={user} companyData={companyData} />
    </StyledBox>
  )
}

export default Company
