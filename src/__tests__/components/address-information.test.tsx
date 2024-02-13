import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddressInformation from "../../components/address-information";

const mockFormData = {};
describe("AddressInformation", () => {
  const setFormData = jest.fn();
  test("renders the form correctly", () => {
    render(
      <AddressInformation
        formData={mockFormData}
        setFormData={setFormData}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText("Street Address")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("State")).toBeInTheDocument();
    expect(screen.getByLabelText("ZIP Code")).toBeInTheDocument();

    // Assert that the Previous and Next buttons are rendered
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("disables the Next button when form is empty", () => {
    render(
      <AddressInformation
        formData={mockFormData}
        setFormData={setFormData}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    // Assert that the Next button is initially disabled
    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("enables the Next button when form is filled", async () => {
    const onPreviousMock = jest.fn();
    const onNextMock = jest.fn();
    render(
      <AddressInformation
        formData={mockFormData}
        setFormData={setFormData}
        onPrevious={onPreviousMock}
        onNext={onNextMock}
      />
    );

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("Street Address"), {
      target: { value: "123 Main St" },
    });

    fireEvent.mouseDown(screen.getByLabelText("City"));
    await waitFor(() => {
      expect(screen.getByText("New York")).toBeVisible();
    });
    fireEvent.click(screen.getByText("New York"));

    fireEvent.mouseDown(screen.getByLabelText("State"));
    await waitFor(() => {
      expect(screen.getByText("Buffalo")).toBeVisible();
    });
    fireEvent.click(screen.getByText("Buffalo"));

    fireEvent.mouseDown(screen.getByLabelText("ZIP Code"));
    await waitFor(() => {
      expect(screen.getByText("10001")).toBeVisible();
    });
    fireEvent.click(screen.getByText("10001"));

    await waitFor(() => {
      expect(screen.getByText("Next")).toBeEnabled();
    });

    screen.getByText("Next").click();
    await waitFor(() => {
      expect(onNextMock).toHaveBeenCalled();
    });
  });

  test("calls the onPrevious function when Previous button is clicked", () => {
    const onPreviousMock = jest.fn();
    render(
      <AddressInformation
        formData={mockFormData}
        setFormData={setFormData}
        onPrevious={onPreviousMock}
        onNext={() => {}}
      />
    );

    screen.getByText("Previous").click();
    expect(onPreviousMock).toHaveBeenCalled();
  });
});
