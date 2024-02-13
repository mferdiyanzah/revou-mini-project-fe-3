import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AccountInformation from "../../components/account-information";
import userEvent from "@testing-library/user-event";

const mockFormData = {};
describe("AccountInformation", () => {
  const setFormData = jest.fn();

  test("renders the form correctly", () => {
    render(
      <AccountInformation
        formData={mockFormData}
        setFormData={setFormData}
        onPrevious={() => {}}
      />
    );

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();

    // Assert that the Previous and Finish buttons are rendered
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Finish")).toBeInTheDocument();
  });

  test("disables the Finish button when form is empty", () => {
    render(
      <AccountInformation
        formData={mockFormData}
        setFormData={setFormData}
        onPrevious={() => {}}
      />
    );

    // Assert that the Finish button is initially disabled
    expect(screen.getByText("Finish")).toBeDisabled();
  });

  test("enables the Finish button when form is filled", async () => {
    render(
      <AccountInformation
        formData={mockFormData}
        setFormData={setFormData}
        onPrevious={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john.doe" },
    });
    expect(screen.getByLabelText("Username")).toHaveValue("john.doe");

    await userEvent.type(screen.getByLabelText("Password"), "Password123!");

    await waitFor(() => {
      expect(screen.getByLabelText("Password")).toHaveValue("Password123!");
    });

    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "Password123!" },
    });
    expect(screen.getByLabelText("Confirm Password")).toHaveValue(
      "Password123!"
    );

    await waitFor(() => {
      expect(screen.getByText("Finish")).toBeEnabled();
    });

    screen.getByText("Finish").click();
    await waitFor(() => {
      // Assert that the success modal is displayed
      expect(screen.getByText("Success")).toBeInTheDocument();
      expect(
        screen.getByText("Your account has been created! Hi, john.doe!")
      ).toBeInTheDocument();
    });
  });

  test("disables the Finish button when passwords do not match", async () => {
    render(
      <AccountInformation
        formData={mockFormData}
        setFormData={setFormData}
        onPrevious={() => {}}
      />
    );

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john.doe" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "DifferentPassword123!" },
    });

    expect(screen.getByText("Finish")).toBeDisabled();
  });

  test("calls the onPrevious function when Previous button is clicked", () => {
    const onPreviousMock = jest.fn();
    render(
      <AccountInformation
        formData={mockFormData}
        setFormData={setFormData}
        onPrevious={onPreviousMock}
      />
    );

    screen.getByText("Previous").click();

    expect(onPreviousMock).toHaveBeenCalled();
  });
});
