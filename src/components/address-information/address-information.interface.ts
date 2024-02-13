import { IRegisterForm } from "../../pages/register/register.interface";

export interface AddressInformationProps {
  onPrevious: () => void;
  onNext: () => void;
  formData: IRegisterForm | undefined;
  setFormData: (data: IRegisterForm) => void;
}

export interface IAddressInformationForm {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface IStateCityZip {
  name: string;
  cities: {
    name: string;
    zip: string[];
  }[];
}

export interface IStateData {
  name: string;
  zip: string[];
}
