import { Backdrop, CircularProgress } from "@mui/material"
import type { ReactNode } from "react"
import type React from "react"
import StyledBox from "./common/StyledBox"

type LoaderWrapperProps<T> = {
  loading: boolean
  data: T | undefined;
  children: (data: T) => ReactNode;
}

const LoaderWrapper = <T,>({ data, loading, children }: LoaderWrapperProps<T>) => {
  if (loading) {
    return (
      <StyledBox
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
      </StyledBox>
    );
  }

  if (data) {
    return <>{children(data)}</>;
  }

  return null;
}

export default LoaderWrapper
