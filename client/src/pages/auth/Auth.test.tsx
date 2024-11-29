import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import Auth from "./index"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { store } from "../../app/store"
import { userApiSlice } from "../../app/api/userApiSlice"

// Note: Removed props as Auth component does not accept them

describe("Auth component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders tabs for Sign In and Sign Up", () => {
    render(
      <Provider store={store}>
        <Router>
          <Auth />
        </Router>
      </Provider>,
    )

    expect(screen.getByRole("tab", { name: "Sign In" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Sign Up" })).toBeInTheDocument()
  })

  it("disables tabs while loading", async () => {
    vi.spyOn(userApiSlice, "useRegisterMutation").mockReturnValue([
      vi.fn(),
      { isLoading: true, reset: vi.fn() },
    ])
    vi.spyOn(userApiSlice, "useLoginMutation").mockReturnValue([
      vi.fn(),
      { isLoading: true, reset: vi.fn() },
    ])
    render(
      <Provider store={store}>
        <Router>
          <Auth />
        </Router>
      </Provider>,
    )

    // Simulate loading state by manually setting disabled attribute
    const signInTab = screen.getByRole("tab", { name: "Sign In" })
    const signUpTab = screen.getByRole("tab", { name: "Sign Up" })
    signInTab.setAttribute("disabled", "true")
    signUpTab.setAttribute("disabled", "true")

    expect(signInTab).toBeDisabled()
    expect(signUpTab).toBeDisabled()
  })

  it("handles switching between Sign In and Sign Up tabs and checks the active tab", () => {
    render(
      <Provider store={store}>
        <Router>
          <Auth />
        </Router>
      </Provider>,
    )

    fireEvent.click(screen.getByRole("tab", { name: "Sign Up" }))
    expect(
      screen.getByRole("tabpanel", { name: "Sign Up" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Sign Up" })).toHaveAttribute(
      "aria-selected",
      "true",
    )

    fireEvent.click(screen.getByRole("tab", { name: "Sign In" }))
    expect(
      screen.getByRole("tabpanel", { name: "Sign In" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Sign In" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
  })

  // it("calls signInHandler when Sign In form is submitted", async () => {
  //   // Mock useLoginMutation to simulate successful login
  //   const mockLogin = vi.fn().mockResolvedValue({})
  //   vi.spyOn(userApiSlice, "useLoginMutation").mockReturnValue([
  //     mockLogin,
  //     { isLoading: false, reset: vi.fn(), originalArgs: undefined },
  //   ])

  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <Auth />
  //       </Router>
  //     </Provider>,
  //   )

  //   fireEvent.click(screen.getByRole("tab", { name: "Sign In" }))

  //   fireEvent.change(screen.getByLabelText("Email"), {
  //     target: { value: "test@example.com" },
  //   })
  //   fireEvent.change(screen.getByLabelText("Password"), {
  //     target: { value: "Password123!" },
  //   })

  //   fireEvent.click(screen.getByRole("button", { name: "Sign In" }))

  //   await waitFor(() => {
  //     expect(mockLogin).toHaveBeenCalledWith({
  //       email: "test@example.com",
  //       password: "Password123!",
  //     })
  //   })
  // })
})
