import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Layout from "./layout/Layout"
import Auth from "./pages/auth"
import Activated from "./pages/private/Activated"
import PrivateRouter from "./components/PrivateRouter"
import ActivatedRouter from "./components/ActivatedRouter"
import Company from "./pages/private/Company/Company"
import { ThemeContextProvider } from "./context/ThemeContext"
import Messages from "./pages/private/Messages"
import Diagrams from "./pages/private/Diagrams"
import Tasks from "./pages/private/Tasks"
import Calendar from "./pages/private/Calendar"
import Files from "./pages/private/Files"
import { CssBaseline } from "@mui/material"
import Home from "./pages/Home"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="" element={<Layout />}>
            <Route path="company" element={<Company />} />
            <Route path="company/messages" element={<Messages />} />
            <Route path="company/diagrams" element={<Diagrams />} />
            <Route path="company/tasks" element={<Tasks />} />
            <Route path="company/calendar" element={<Calendar />} />
            <Route path="company/files" element={<Files />} />
            <Route path="*" element={<>NotFount</>} />
          </Route>
        </Route>
        <Route path="" element={<ActivatedRouter />}>
          <Route path="/activated/:id" element={<Activated />} />
        </Route>

        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<>Not Found</>} />
      </>,
    ),
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    },
  )
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <RouterProvider
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </ThemeContextProvider>
  )
}

export default App
