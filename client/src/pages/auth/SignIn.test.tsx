import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import SignIn from "./SignIn"

// Description of the test suite for the "SignIn" component
describe("SignIn Component", () => {
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

  // Test to verify rendering of the sign-in form with correct fields and states
  it("renders the Sign In form with correct fields and states", () => {
    render(<SignIn {...defaultProps} />)
    expect(screen.getByTestId("title-signIn")).toBeInTheDocument() // Check that the "Sign In" title is present
    expect(screen.getByLabelText(/email/i)).toHaveValue("") // Check that the email field is empty
    expect(screen.getByLabelText(/password/i)).toHaveValue("") // Check that the password field is empty
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDisabled() // The "Sign In" button should be disabled
  })

  // Test to verify the authHandler function is called on form submission
  it("calls the authHanlder function on form submission", async () => {
    const {getByLabelText, getByRole, rerender, container } = render(<SignIn {...defaultProps} />)
    const emailField = getByLabelText("Email")
    const passwordField = getByLabelText("Password")
    const signInButton = getByRole("button", { name: /sign in/i })

    // Change values of email and password fields
    await waitFor(() => {
      fireEvent.change(emailField, { target: { value: "test@example.com" } })
      fireEvent.change(passwordField, { target: { value: "password123" } })
    })

    // Check that error messages are not displayed
    expect(container.innerHTML).not.toMatch("Email address is required")
    expect(container.innerHTML).not.toMatch("Invalid email address")
    expect(signInButton).toBeEnabled() // Check that the button is enabled

    // Click the "Sign In" button
    fireEvent.click(signInButton)

    // Verify that mockAuthHandler is called with the correct arguments
    await waitFor(() => {
      expect(mockAuthHandler).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      })
    })

    // Rerender the component with loading state
    rerender(<SignIn {...defaultProps} isLoading={true} />)
    await waitFor(() => {
      expect(screen.getByTestId("circular-progress")).toBeInTheDocument() // Check that the loading indicator is present
      expect(signInButton).not.toBeInTheDocument() // Check that the button is not displayed
    })

    // Rerender the component with loading state disabled
    rerender(<SignIn {...defaultProps} isLoading={false} />)
    await waitFor(() => {
      expect(mockAuthHandler).toHaveBeenCalledTimes(1) // Verify that mockAuthHandler was called once
      expect(emailField).toHaveValue("") // Check that the email field is cleared
      expect(passwordField).toHaveValue("") // Check that the password field is cleared
      expect(document.activeElement).not.toBe(signInButton) // Check that the button is not focused
    })
  })

  // Test to verify correct handling of email validation errors
  it("handles email validation errors correctly", async () => {
    const { container } = render(<SignIn {...defaultProps} />)
    const emailField = screen.getByLabelText("Email")
    const signInButton = screen.getByRole("button", { name: /sign in/i })

    // Check validation for empty email value
    await waitFor(async () => {
      fireEvent.blur(emailField)
    })
    expect(container.innerHTML).toMatch("Email address is required") // Expect "Email address is required" error message
    expect(signInButton).toBeDisabled() // The button should be disabled

    // Check validation for invalid email format
    await waitFor(async () => {
      fireEvent.change(emailField, { target: { value: "invalid-email" } })
    })
    expect(container.innerHTML).toMatch("Invalid email address") // Expect "Invalid email address" error message
  })

  // Test to verify correct handling of password validation errors
  it("handles password validation errors correctly", async () => {
    const { container } = render(<SignIn {...defaultProps} />)
    const passwordField = screen.getByLabelText("Password")
    const signInButton = screen.getByRole("button", { name: /sign in/i })

    // Check validation for empty password value
    await waitFor(async () => {
      fireEvent.blur(passwordField)
    })
    expect(container.innerHTML).toMatch("Password is required") // Expect "Password is required" error message
    expect(signInButton).toBeDisabled() // The button should be disabled
  })
})
