import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AccountInformation from "../../components/account-information";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

describe("AccountInformation", () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AccountInformation />
      </BrowserRouter>
    );
  };

  test("renders the form correctly", () => {
    renderComponent();

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText("username")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByLabelText("confirmPassword")).toBeInTheDocument();

    // Assert that the Previous and Finish buttons are rendered
    expect(screen.getByText("prevButton")).toBeInTheDocument();
    expect(screen.getByText("finishButton")).toBeInTheDocument();
  });

  test("disables the Finish button when form is empty", () => {
    renderComponent();

    // Assert that the Finish button is initially disabled
    expect(screen.getByText("finishButton")).toBeDisabled();
  });

  test("enables the Finish button when form is filled", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "john.doe" },
    });
    expect(screen.getByLabelText("username")).toHaveValue("john.doe");

    await userEvent.type(screen.getByLabelText("password"), "Password123!");

    await waitFor(() => {
      expect(screen.getByLabelText("password")).toHaveValue("Password123!");
    });

    fireEvent.change(screen.getByLabelText("confirmPassword"), {
      target: { value: "Password123!" },
    });
    expect(screen.getByLabelText("confirmPassword")).toHaveValue(
      "Password123!"
    );

    await waitFor(() => {
      expect(screen.getByText("finishButton")).toBeEnabled();
    });

    screen.getByText("finishButton").click();
    await waitFor(() => {
      // Assert that the success modal is displayed
      expect(screen.getByText("successTitle")).toBeInTheDocument();
    });
  });

  test("disables the Finish button when passwords do not match", async () => {
    renderComponent();

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "john.doe" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("confirmPassword"), {
      target: { value: "DifferentPassword123!" },
    });

    expect(screen.getByText("finishButton")).toBeDisabled();
  });
});
