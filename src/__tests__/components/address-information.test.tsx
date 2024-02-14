/* eslint-disable */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddressInformation from "../../components/address-information";

describe("AddressInformation", () => {
  const renderComponent = () => {
    return (
      <BrowserRouter>
        <AddressInformation />
      </BrowserRouter>
    );
  };
  test("renders the form correctly", () => {
    render(renderComponent());

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText("address")).toBeInTheDocument();
    expect(screen.getByLabelText("city")).toBeInTheDocument();
    expect(screen.getByLabelText("state")).toBeInTheDocument();
    expect(screen.getByLabelText("zipCode")).toBeInTheDocument();

    // Assert that the Previous and Next buttons are rendered
    expect(screen.getByText("prevButton")).toBeInTheDocument();
    expect(screen.getByText("nextButton")).toBeInTheDocument();
  });

  test("disables the Next button when form is empty", () => {
    render(renderComponent());

    // Assert that the Next button is initially disabled
    expect(screen.getByText("nextButton")).toBeDisabled();
  });

  test("enables the Next button when form is filled", async () => {
    render(renderComponent());

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("address"), {
      target: { value: "123 Main St" },
    });

    const stateSelect = screen.getAllByRole("combobox")[0];
    fireEvent.mouseDown(stateSelect);
    await waitFor(() => {
      expect(screen.getByText("New York")).toBeVisible();
    });
    fireEvent.click(screen.getByText("New York"));

    const citySelect = screen.getAllByRole("combobox")[1];
    fireEvent.mouseDown(citySelect);
    await waitFor(() => {
      expect(screen.getByText("Buffalo")).toBeVisible();
    });
    fireEvent.click(screen.getByText("Buffalo"));

    const zipSelect = screen.getAllByRole("combobox")[2];
    fireEvent.mouseDown(zipSelect);
    await waitFor(() => {
      expect(screen.getByText("10001")).toBeVisible();
    });
    fireEvent.click(screen.getByText("10001"));

    await waitFor(() => {
      expect(screen.getByText("nextButton")).toBeEnabled();
    });
  });
});
