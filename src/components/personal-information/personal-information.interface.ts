import dayjs from "dayjs";
import { IRegisterForm } from "../../pages/register/register.interface";

export interface PersonalInformationProps {
  onNext: () => void;
  formData: IRegisterForm | undefined;
  setFormData: (data: IRegisterForm) => void;
}

export interface IPersonalInformationForm {
  fullName: string;
  email: string;
  dob: dayjs.Dayjs;
}
