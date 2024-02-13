import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PersonalInformation from "../../components/personal-information";
import * as dayjs from "dayjs";
import { IRegisterForm } from "../../pages/register/register.interface";

const mockFormData: IRegisterForm = {};

describe("PersonalInformation", () => {
  const setFormData = jest.fn();
  test("renders the form correctly", () => {
    render(
      <PersonalInformation
        onNext={() => {}}
        formData={mockFormData}
        setFormData={setFormData}
      />
    );

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();

    // Assert that the Next button is rendered
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("disables the Next button when form is empty", () => {
    render(
      <PersonalInformation
        onNext={() => {}}
        formData={mockFormData}
        setFormData={setFormData}
      />
    );

    // Assert that the Next button is initially disabled
    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("enables the Next button when form is filled", async () => {
    const onNextMock = jest.fn();
    render(
      <PersonalInformation
        onNext={onNextMock}
        formData={mockFormData}
        setFormData={setFormData}
      />
    );

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });

    const today = dayjs().subtract(18, "year").format("DD MMMM YYYY");

    const datepicker = screen.getByLabelText("Date of Birth");
    expect(datepicker).toBeVisible();

    datepicker.click();

    const eighteenthYearAgo = dayjs().subtract(18, "year").date();
    await waitFor(() => {
      expect(screen.getByText(eighteenthYearAgo)).toBeVisible();
    });

    screen.getByText(eighteenthYearAgo).click();
    await waitFor(() => {
      expect(datepicker).toHaveValue(today);
    });

    await waitFor(() => {
      expect(screen.getByText("Next")).toBeEnabled();
    });

    screen.getByText("Next").click();
    await waitFor(() => {
      expect(onNextMock).toHaveBeenCalled();
    });
  });
});
