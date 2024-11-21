import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

const RedirectBack = () => {
  const navigate = useNavigate()
  useEffect(() => {
    console.log("navigate(-1)")
    navigate(-1)
  }, [navigate])

  return null

}

export default RedirectBack
