import { Navigate, Outlet, useParams } from "react-router-dom"
import { useCallback, useEffect } from "react"
import LoaderWrapper from "./LoaderWrapper"
import { useLazyConfirmEmailQuery } from "../app/api/userApiSlice"
import { useAppSelector } from "../app/hooks"
import type ApiError from "../types/errors"

const ActivatedRouter = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAppSelector(state => state.user)
  const [confirmEmail, { error, isLoading, data }] = useLazyConfirmEmailQuery()

  const confirmHandler = useCallback(() => {
    if (id) {
      confirmEmail({ activationId: id })
    }
  }, [confirmEmail, id])

  useEffect(() => {
    confirmHandler()
  }, [confirmHandler])

  if (error && user) {
    return <Navigate to="/company" state={error as ApiError} replace />
  } else if (error) {
    return <Navigate to="/" state={error as ApiError} replace />
  }

  return (
    <LoaderWrapper loading={isLoading} data={data} error={error}>
      {emailStatus =>
        emailStatus?.emailStatus === "confirmed" ? (
          <Outlet />
        ) : (
          <Navigate to="/company" replace />
        )
      }
    </LoaderWrapper>
  )
}

export default ActivatedRouter
