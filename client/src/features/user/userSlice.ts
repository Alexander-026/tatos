import { localUser } from "./../../utils/checkAuth"
import { onUser, logOut } from "./userReducers"
import { createSlice } from "@reduxjs/toolkit"
import type { User } from "./../../types/user"
import type {IFullCompany } from "../../types/company"

export interface IUserState {
  user: User["user"] | null
  refreshed: boolean
  company: IFullCompany | null
}

export const initialUserState: IUserState = {
  user: localUser(),
  refreshed: false,
  company: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    onUser,
    logOut,
  },
})

// export const {} = userSlice.actions

export default userSlice.reducer
