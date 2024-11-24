import type { User } from "../../types/user"
import type { IUserState } from "./userSlice"
import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

export const onUser: CaseReducer<IUserState, PayloadAction<User["user"]>> = (
  state,
  action,
) => {
  if (action.payload) {
    state.user = action.payload
    state.refreshed = true
  }
}

export const logOut: CaseReducer<IUserState> = state => {
  state.user = null
  state.refreshed = false
}


