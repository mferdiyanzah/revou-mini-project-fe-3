import { DatePicker, Form, Input, Row } from "antd";
import * as dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useFormContext from "../../pages/register/register.context";
import { IPersonalInformationForm } from "./personal-information.interface";

const PersonalInformation = () => {
  const { t } = useTranslation();
  const { formData, setFormData, onNext } = useFormContext();
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
      <Form.Item
        label={t("fullName")}
        name="fullName"
        rules={[
          {
            required: true,
            message: t("fullNameRequired"),
          },
        ]}
      >
        <Input placeholder={t("fullNamePlaceholder")} />
      </Form.Item>

      <Form.Item
        label={t("email")}
        name="email"
        rules={[
          {
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: t("emailInvalid"),
          },
          {
            required: true,
            message: t("emailRequired"),
          },
        ]}
      >
        <Input placeholder={t("emailPlaceholder")} />
      </Form.Item>

      <Form.Item
        label={t("dob")}
        name="dob"
        rules={[
          { required: true, message: t("dobRequired") },
          () => ({
            validator(_, value) {
              if (value && dayjs().diff(value, "year") >= 18) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t("minAge")));
            },
          }),
        ]}
      >
        <DatePicker
          placeholder={t("dobPlaceholder")}
          format={"DD MMMM YYYY"}
          allowClear
          className="w-full"
          disabledDate={(current) => {
            return current && current > dayjs().endOf("day");
          }}
          minDate={dayjs().subtract(100, "year")}
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
          {t("nextButton")}
        </button>
      </Row>
    </Form>
  );
};

export default PersonalInformation;
