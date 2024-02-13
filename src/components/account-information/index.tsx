import { Form, Input, Modal, Row } from "antd";
import { AccountInformationProps } from "./account-information.interface";
import { useEffect, useState } from "react";

const AccountInformation = ({
  onPrevious,
  formData,
  setFormData,
}: AccountInformationProps) => {
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    const isFormDataExist =
      formData?.username !== undefined || formData?.password !== undefined;
    if (!formData || !isFormDataExist) return;

    const initValues = {
      username: formData.username,
      password: formData.password,
      confirmPassword: "",
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

  const passwordConfig = {
    rules: [
      {
        required: true,
        message: "Please input your password!",
      },
      {
        min: 8,
        message: "Minimal 8 characters",
      },
      {
        pattern: /^(?=.*[!@#$%^&*])/,
        message: "At least 1 special character",
      },
      {
        pattern: /^(?=.*[0-9])/,
        message: "At least 1 number",
      },
      {
        pattern: /^(?=.*[A-Z])/,
        message: "At least 1 uppercase",
      },
    ],
  };

  const onClickFinish = () => {
    const values = form.getFieldsValue();
    setFormData({ ...formData, ...values });

    const registerData = JSON.stringify(formData);
    localStorage.setItem("registerData", registerData);
    Modal.info({
      title: "Success",
      content: `Your account has been created! Hi, ${values.username}!`,
      onOk: () => {
        localStorage.clear();
        window.location.reload();
      },
    });
  };

  return (
    <Form
      layout="vertical"
      className="w-full"
      autoComplete="off"
      size="large"
      form={form}
    >
      <Form.Item label="Username" name="username" required>
        <Input placeholder="Enter your username" />
      </Form.Item>

      <Form.Item label="Password" name="password" required {...passwordConfig}>
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        required
        rules={[
          {
            required: true,
            message: "Please re-input your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Enter your password again" />
      </Form.Item>

      <Row justify="space-between">
        <button
          className="px-5 py-2 text-white rounded-md text-sm bg-blue-900"
          onClick={onPrevious}
        >
          Previous
        </button>

        <button
          className={` px-5 py-2 text-white rounded-md text-sm ${
            isBtnDisabled ? "cursor-not-allowed bg-gray-200" : "bg-blue-900"
          }`}
          onClick={onClickFinish}
          disabled={isBtnDisabled}
        >
          Finish
        </button>
      </Row>
    </Form>
  );
};

export default AccountInformation;
