import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom"
// import { useLazyConfirmEmailQuery } from "../app/api/usersApiSlice"
import { useCallback, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import LoaderWrapper from "./LoaderWrapper"
import { useLazyConfirmEmailQuery } from "../app/api/userApiSlice"
import { useAppSelector } from "../app/hooks"


const ActivatedRouter = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAppSelector(state => state.user)
  const navigate = useNavigate()
  const [confirmEmail, { isError, error, isLoading, data }] =
    useLazyConfirmEmailQuery()


  
  if(user?.emailStatus === "confirmed") {
    navigate("/company", { replace: true })
  }




  const confirmHandler = useCallback(() => {
    if (id) {
      confirmEmail({userId:id})
    }
  }, [confirmEmail, id])

  useEffect(() => {
    confirmHandler()
  }, [confirmHandler])

  if (isError) {
    console.log("isError", error)
    return <Navigate to="/" replace/>
  }
  return (
    <LoaderWrapper loading={isLoading} data={data}>
      <>
       {data?.emailStatus === "confirmed" ?  <Outlet /> : <Navigate to="/" replace/>}
      </>
    </LoaderWrapper>
  )
}

export default ActivatedRouter
