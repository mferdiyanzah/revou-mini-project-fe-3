import dayjs from "dayjs";

export interface IRegisterForm {
  fullName?: string;
  email?: string;
  dob?: dayjs.Dayjs;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}
