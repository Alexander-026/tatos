import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useLocalStorage from "./useLocalStorage";
import { userSlice } from "../features/user/userSlice";
import { useLogoutMutation, useRefreshMutation } from "../app/api/userApiSlice";
import { useCallback, useEffect, useRef } from "react";
import type { User } from "../types/user";

const useAuth = (): User["user"] | null => {
  const { user, refreshed } = useAppSelector((state) => state.user);
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage("accessToken");
  const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage("refreshToken");
  const [, , removeCompanyId] = useLocalStorage("companyId")
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { onUser, logOut } = userSlice.actions;
  const [refresh] = useRefreshMutation();
  const [logOutApiCall] = useLogoutMutation();

  // Ref to prevent multiple refresh calls
  const refreshCalled = useRef(refreshed);

  const logOutHandler = useCallback(async () => {
    try {
      dispatch(logOut());
      removeAccessToken();
      removeRefreshToken();
      removeCompanyId();
      await logOutApiCall();
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [dispatch, logOut, removeAccessToken, removeRefreshToken, removeCompanyId, logOutApiCall, navigate]);

  const refreshHandler = useCallback(async () => {
    if (refreshCalled.current) return; // Prevent multiple refresh calls
    refreshCalled.current = true;
   

    try {
      if (accessToken && refreshToken) {
        const res = await refresh({ refreshToken }).unwrap();
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        dispatch(onUser(res.user));
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      await logOutHandler(); // Logout if refresh fails
    }
  }, [accessToken, refreshToken, refresh, setAccessToken, setRefreshToken, dispatch, onUser, logOutHandler]);

  useEffect(() => {
    refreshHandler(); // Call refresh only once on mount
  }, [refreshHandler]);

  return user;
};

export default useAuth;
