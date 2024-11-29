import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import SignUp from "./SignUp"
import { EmployeeLimit } from "../../types/company"
describe("Sign Up component", () => {
  // Mock function to simulate the authentication handler
  const mockAuthHandler = vi.fn()

  // Default props for the SignIn component
  const defaultProps = {
    authHanlder: mockAuthHandler, // Authentication handler function
    isLoading: false, // Initial loading state
  }

  // Before each test, reset all mocks to ensure a clean state
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders the SignUp form with correct fields and states", () => {
    render(<SignUp {...defaultProps} />)
    expect(screen.getByTestId("title-signUp")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toHaveValue("")
    expect(screen.getByLabelText("Company Name")).toHaveValue("")
    expect(screen.getByLabelText("Password")).toHaveValue("")
    expect(screen.getByLabelText("Repeat Password")).toHaveValue("")
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeDisabled()
  })

  it("handles validation errors correctly", async () => {
    const { container } = render(<SignUp {...defaultProps} />)
    fireEvent.blur(screen.getByLabelText("Email"))
    fireEvent.blur(screen.getByLabelText("Company Name"))
    fireEvent.blur(screen.getByLabelText("Password"))
    fireEvent.blur(screen.getByLabelText("Repeat Password"))

    await waitFor(() => {
      expect(screen.getByText("Email address is required")).toBeInTheDocument()
      expect(screen.getByText("Company name is required")).toBeInTheDocument()
      expect(screen.getByText("Password is required")).toBeInTheDocument()
      expect(
        screen.getByText("Repeat Password is required"),
      ).toBeInTheDocument()
    })

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "alexander" },
    })
    fireEvent.change(screen.getByLabelText("Company Name"), {
      target: { value: "Ta" },
    })
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "ss" },
    })
    fireEvent.change(screen.getByLabelText("Repeat Password"), {
      target: { value: "s" },
    })

    await waitFor(() => {
      expect(container.innerHTML).toMatch("Invalid email address")
      expect(container.innerHTML).toMatch("Must be at least 3 characters")
      expect(container.innerHTML).toMatch("Must contain an uppercase letter")
      expect(container.innerHTML).toMatch("Passwords do not match")
      expect(screen.getByRole("button", { name: "Sign Up" })).toBeDisabled()
      expect(screen.getByRole("button", { name: "Reset" })).toBeEnabled()
    })

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "s" },
    })

    await waitFor(() => {
      expect(container.innerHTML).not.toMatch("Passwords do not match")
    })
  })

  it("calls the authHandler function on form submission", async () => {
    render(<SignUp {...defaultProps} />)
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "alexander@gmail.com" },
    })
    fireEvent.change(screen.getByLabelText("Company Name"), {
      target: { value: "Tatos" },
    })
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Tatos2626%" },
    })
    fireEvent.change(screen.getByLabelText("Repeat Password"), {
      target: { value: "Tatos2626%" },
    })
    fireEvent.change(screen.getByTestId("Employee Limit"), {
      target: { value: EmployeeLimit.level3 },
    })

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Sign Up" })).toBeEnabled()
    })

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }))

    await waitFor(() => {
      expect(mockAuthHandler).toHaveBeenCalledWith({
        email: "alexander@gmail.com",
        companyName: "Tatos",
        employeeLimit: EmployeeLimit.level3,
        password: "Tatos2626%",
        repeatPassword: "Tatos2626%",
      })
    })

    render(<SignUp {...defaultProps} isLoading={true} />)

    await waitFor(() => {
      expect(screen.getByTestId("circular-progress")).toBeInTheDocument()
    })
  })
})
