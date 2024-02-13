import { IRegisterForm } from "../../pages/register/register.interface";

export interface AccountInformationProps {
  onPrevious: () => void;
  formData: IRegisterForm | undefined;
  setFormData: (data: IRegisterForm) => void;
}
