import '@testing-library/jest-dom';
import type React from "react";
import jest from 'jest-mock';
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeRow from "./EmployeeRow";
import type { IFormEmployee, IFormCompany } from "../../../../types/company";
import { EmailStatus, UserRole } from "../../../../types/user";
import type { Control, FieldErrors} from "react-hook-form";
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';

const mockEmployee: IFormEmployee = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  birthDate: "1990-01-01",
  email: "john.doe@example.com",
  emailStatus: EmailStatus.unconfirmed,
  role: UserRole.employee,
  image: "none",
};

interface RenderWithControlProps {
  children: (control: Control<IFormCompany>) => React.ReactNode;
}

// Wrapper component to provide `control` prop from `react-hook-form`
const RenderWithControl: React.FC<RenderWithControlProps> = ({ children }) => {
  const { control } = useForm<IFormCompany>({
    defaultValues: {
        employees: [mockEmployee]
    }
  });
  return <>{children(control)}</>;
};

describe("EmployeeRow Component", () => {
  it("should render the employee input fields", () => {
    render(
      <RenderWithControl>
        {(control) => (
          <EmployeeRow
            employee={mockEmployee}
            index={0}
            control={control}
            errors={{}}
            remove={jest.fn()}
          />
        )}
      </RenderWithControl>
    );

    // Assert that the first name input field is rendered
    expect(screen.getByDisplayValue(mockEmployee.firstName)).toBeInTheDocument();
    // Assert that the last name input field is rendered
    expect(screen.getByDisplayValue(mockEmployee.lastName)).toBeInTheDocument();
    // Assert that the Birth Date input field is rendered
    expect(screen.getByDisplayValue(dayjs(mockEmployee.birthDate).format("DD.MM.YYYY"))).toBeInTheDocument();
    // Assert that the email input field is rendered
    expect(screen.getByDisplayValue(mockEmployee.email)).toBeInTheDocument();
    // Assert that the emailStatus select field is rendered
    expect(screen.getByDisplayValue(mockEmployee.emailStatus)).toBeInTheDocument();
     // Assert that the role select field is rendered
    expect(screen.getByDisplayValue(mockEmployee.role)).toBeInTheDocument();

  });

});
