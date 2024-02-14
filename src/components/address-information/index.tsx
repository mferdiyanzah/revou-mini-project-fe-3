/* eslint-disable */
import { Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import useFormContext from "../../pages/register/register.context";
import { dummyStateCityZip } from "./address-information.dummy";
import {
  IAddressInformationForm,
  ICityData,
} from "./address-information.interface";
import { useTranslation } from "react-i18next";
const AddressInformation = () => {
  const { t } = useTranslation();
  const { formData, setFormData, onNext, onPrev } = useFormContext();
  const [form] = Form.useForm<IAddressInformationForm>();
  const formValues = Form.useWatch([], form);
  const [selectedState, setSelectedState] = useState("");
  const [cityOptions, setCityOptions] = useState<ICityData[]>();
  const [zipOptions, setZipOptions] = useState<string[]>();
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);

  useEffect(() => {
    const isFormDataExist =
      formData?.address !== undefined ||
      formData?.city !== undefined ||
      formData?.state !== undefined ||
      formData?.zip !== undefined;
    if (!formData || !isFormDataExist) return;

    const existState = formData.state ?? "";
    const stateIdx = dummyStateCityZip.findIndex(
      (item) => item.name === existState
    );
    setSelectedState(existState);

    const savedCityOptions =
      (dummyStateCityZip[stateIdx]?.cities as ICityData[]) || undefined;
    const cityIdx = savedCityOptions.findIndex(
      (item) => item.name === formData.state
    );
    setCityOptions(savedCityOptions);

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

    if (formValues.state) {
      setSelectedState(formValues.state);
      const stateIdx = dummyStateCityZip.findIndex(
        (item) => item.name === formValues.state
      );
      const cityOptions = dummyStateCityZip[stateIdx].cities;
      console.log(cityOptions);
      setCityOptions(cityOptions);
    }

    if (formValues.city) {
      const stateIdx = dummyStateCityZip.findIndex(
        (item) => item.name === formValues.state
      );
      const cityIdx = dummyStateCityZip[stateIdx]?.cities.findIndex(
        (item) => item.name === formValues.city
      );
      const zipOptions = dummyStateCityZip[stateIdx]?.cities[cityIdx]?.zip;

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

  const stateOptions = dummyStateCityZip.map((item) => ({
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
        label={t("state")}
        name="state"
        rules={[{ required: true, message: t("stateRequired") }]}
      >
        <Select
          showSearch
          placeholder={t("statePlaceholder")}
          options={stateOptions}
        />
      </Form.Item>

      <Form.Item label={t("city")} name="city" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder={t("statePlaceholder")}
          options={cityOptions?.map((item) => ({
            label: item.name,
            value: item.name,
          }))}
          disabled={!selectedState}
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
          disabled={cityOptions === undefined || zipOptions === undefined}
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
