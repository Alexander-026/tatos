import {
    Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RxExit } from "react-icons/rx"
import MyAvatar from "./MyAvatar"
import { useState } from "react"
import { useLogoutMutation } from "../app/api/userApiSlice"
import useLocalStorage from "../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import { userSlice } from "../features/user/userSlice"
import { apiSlice } from "../app/api/apiSlice"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
}

const ProfileMenu = ({ open }: { open: boolean }) => {
  const { user } = useAppSelector(state => state.user)
  const [, , removeToken] = useLocalStorage("accessToken")
  const [, , removeRefreshToken] = useLocalStorage("refreshToken")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { logOut } = userSlice.actions
  const [openModel, setOpenModel] = useState<boolean>(false)

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall()
      setOpenModel(false)
      dispatch(logOut())
      dispatch(apiSlice.util.resetApiState())
      removeToken()
      removeRefreshToken()
      navigate("/", { replace: true })
    } catch (err) {
      console.error(err)
    }
  }

  if (!user) {
    return <></>
  }

  const { email, firstName, lastName, image } = user

  return (
    <Stack
      flexDirection={"row"}
      justifyContent="space-between"
      alignItems="center"
    >
      <Modal
        open={openModel}
        onClose={() => setOpenModel(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to log out?
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            If you log out, you will need to sign in again to access your
            account.
          </Typography>

          <Stack flexDirection={"row"} justifyContent={"space-around"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModel(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" color="info" onClick={logoutHandler}>
              Log Out
            </Button>
          </Stack>
        </Paper>
      </Modal>
      <MyAvatar user={{ email, firstName, lastName, image }} />
      <Box
        sx={{
            display: "flex", 
            flexDirection: "column",
            transform: open ? "scale(1)" : "scale(0.8)",
            opacity: open ? 1 : 0, 
            transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
            visibility: open ? "visible" : "hidden",
            maxWidth: open ? "9rem" : 0
        }}
       
      >
        <Typography noWrap>
          {firstName} {lastName}
        </Typography>
        <Typography noWrap sx={{ fontSize: "0.6rem" }}>
          {email}
        </Typography>
      </Box>
      <IconButton size="small" onClick={() => setOpenModel(true)}>
        <RxExit />
      </IconButton>
    </Stack>
  )
}

export default ProfileMenu
