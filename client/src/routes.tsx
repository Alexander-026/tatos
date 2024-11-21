import type { RouteObject } from "react-router-dom"
import Layout from "./layout/Layout"
import Auth from "./pages/auth"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <>Home</>,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <>Not Found</>,
  },
]


export default routes