/* eslint-disable */
import { Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import useFormContext from "../../pages/register/register.context";
import { dummyStateCityZip } from "./address-information.dummy";
import {
  IAddressInformationForm,
  IStateData,
} from "./address-information.interface";
import { useTranslation } from "react-i18next";
const AddressInformation = () => {
  const { t } = useTranslation();
  const { formData, setFormData, onNext, onPrev } = useFormContext();
  const [form] = Form.useForm<IAddressInformationForm>();
  const formValues = Form.useWatch([], form);
  const [selectedCity, setSelectedCity] = useState("");
  const [stateOptions, setStateOptions] = useState<IStateData[]>();
  const [zipOptions, setZipOptions] = useState<string[]>();
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);

  useEffect(() => {
    const isFormDataExist =
      formData?.address !== undefined ||
      formData?.city !== undefined ||
      formData?.state !== undefined ||
      formData?.zip !== undefined;
    if (!formData || !isFormDataExist) return;

    const existCity = formData.city ?? "";
    const cityIdx = dummyStateCityZip.findIndex(
      (item) => item.name === existCity
    );
    setSelectedCity(existCity);

    const savedStateOptions =
      (dummyStateCityZip[cityIdx]?.cities as IStateData[]) || undefined;
    const stateIdx = savedStateOptions.findIndex(
      (item) => item.name === formData.state
    );
    setStateOptions(savedStateOptions);

    const savedZipOptions =
      dummyStateCityZip[cityIdx]?.cities[stateIdx]?.zip || undefined;
    setZipOptions(savedZipOptions);

    const initValues = {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    };
    form.setFieldsValue(initValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((currentValues) => {
        setIsNextBtnDisabled(!Object.values(currentValues).length);
      })
      .catch(() => {
        setIsNextBtnDisabled(true);
      });

    const formValues = form.getFieldsValue();

    if (formValues.city) {
      setSelectedCity(formValues.city);
      const cityIdx = dummyStateCityZip.findIndex(
        (item) => item.name === formValues.city
      );
      setStateOptions(dummyStateCityZip[cityIdx].cities);
    }

    if (formValues.state) {
      const cityIdx = dummyStateCityZip.findIndex(
        (item) => item.name === formValues.city
      );
      const zipOptions = dummyStateCityZip[cityIdx].cities.find(
        (item) => item.name === formValues.state
      )?.zip;
      setZipOptions(zipOptions);
    }

    setFormData({ ...formData, ...formValues });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const onClickNext = () => {
    const values = form.getFieldsValue();
    setFormData({ ...formData, ...values });
    onNext();
  };

  const cityOptions = dummyStateCityZip.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  return (
    <Form
      layout="vertical"
      form={form}
      className="w-full"
      size="large"
      autoCorrect="off"
      autoComplete="off"
    >
      <Form.Item
        label={t("address")}
        name="address"
        rules={[{ required: true, message: t("addressRequired") }]}
      >
        <Input.TextArea
          placeholder={t("addressPlaceholder")}
          maxLength={100}
          rows={4}
          showCount
        />
      </Form.Item>

      <Form.Item
        label={t("city")}
        name="city"
        rules={[{ required: true, message: t("cityRequired") }]}
      >
        <Select
          showSearch
          placeholder={t("cityPlaceholder")}
          options={cityOptions}
        />
      </Form.Item>

      <Form.Item label={t("state")} name="state" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder={t("statePlaceholder")}
          options={stateOptions?.map((item) => ({
            label: item.name,
            value: item.name,
          }))}
          disabled={!selectedCity}
        />
      </Form.Item>

      <Form.Item label={t("zipCode")} name="zip" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder={t("zipCodePlaceholder")}
          options={zipOptions?.map((item, idx) => ({
            label: item,
            value: String(idx),
          }))}
          disabled={stateOptions === undefined || zipOptions === undefined}
        />
      </Form.Item>

      <Row justify="space-between">
        <button
          className="px-5 py-2 text-white rounded-md text-sm bg-blue-900"
          onClick={onPrev}
        >
          {t("prevButton")}
        </button>
        <button
          className={` px-5 py-2 text-white rounded-md text-sm ${
            isNextBtnDisabled ? "cursor-not-allowed bg-gray-200" : "bg-blue-900"
          }`}
          onClick={onClickNext}
          disabled={isNextBtnDisabled}
        >
          {t("nextButton")}
        </button>
      </Row>
    </Form>
  );
};

export default AddressInformation;
