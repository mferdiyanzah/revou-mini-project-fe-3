import { DatePicker, Form, Input, Row } from "antd";
import * as dayjs from "dayjs";
import { useEffect, useState } from "react";
import { emailConfig, fullNameConfig } from "./personal-information.config";
import {
  IPersonalInformationForm,
  PersonalInformationProps,
} from "./personal-information.interface";

const PersonalInformation = ({
  onNext,
  setFormData,
  formData,
}: PersonalInformationProps) => {
  const [form] = Form.useForm<IPersonalInformationForm>();
  const formValues = Form.useWatch([], form);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    if (!formData) return;

    const initValues = {
      fullName: formData.fullName,
      email: formData.email,
      dob: formData.dob,
    };
    form.setFieldsValue(initValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((currentValues) => {
        setIsBtnDisabled(!Object.values(currentValues).length);
      })
      .catch(() => {
        setIsBtnDisabled(true);
      });

    const values = form.getFieldsValue();
    setFormData({
      ...formData,
      ...values,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const onClickNext = () => {
    const values = form.getFieldsValue();
    setFormData({ ...formData, ...values });
    onNext();
  };

  return (
    <Form
      className="w-full"
      layout="vertical"
      form={form}
      autoComplete="off"
      size="large"
    >
      <Form.Item label="Full Name" name="fullName" {...fullNameConfig}>
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item label="Email" name="email" {...emailConfig}>
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[
          { required: true, message: "Please select time!" },
          () => ({
            validator(_, value) {
              if (value && dayjs().diff(value, "year") >= 18) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("You must be at least 18 years old!")
              );
            },
          }),
        ]}
      >
        <DatePicker
          placeholder="Select your date of birth"
          format={"DD MMMM YYYY"}
          allowClear
          className="w-full"
          disabledDate={(current) => {
            return current && current > dayjs().endOf("day");
          }}
          defaultPickerValue={dayjs().subtract(18, "year")}
        />
      </Form.Item>

      <Row justify="end">
        <button
          className={` px-5 py-2 text-white rounded-md text-sm ${
            isBtnDisabled ? "cursor-not-allowed bg-gray-200" : "bg-blue-900"
          }`}
          onClick={onClickNext}
          disabled={isBtnDisabled}
        >
          Next
        </button>
      </Row>
    </Form>
  );
};

export default PersonalInformation;
