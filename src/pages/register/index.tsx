import { Col, Row, Steps } from "antd";
import { createContext, useState } from "react";
import AccountInformation from "../../components/account-information/index.tsx";
import AddressInformation from "../../components/address-information/index.tsx";
import PersonalInformation from "../../components/personal-information/index.tsx";
import { IRegisterForm } from "./register.interface.ts";
import { useTranslation } from "react-i18next";

export const RegistrationFormContext = createContext({
  formData: {} as IRegisterForm | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFormData: (_: IRegisterForm) => {},
  onNext: () => {},
  onPrev: () => {},
});

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<IRegisterForm>();
  const [currentStep, setCurrentStep] = useState(0);

  const onNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const onPrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const contextValue = {
    formData,
    setFormData,
    onNext,
    onPrev,
  };

  const steps = [
    t("personal_information"),
    t("address_information"),
    t("account_information"),
  ];

  const items = steps.map((item, idx) => ({
    key: idx,
    title: item,
  }));

  return (
    <Row className="lg:h-[60vh] h-screen">
      <Col
        sm={{ flex: "100%" }}
        lg={{ flex: "30%" }}
        className="pr-4 lg:border-r border-gray-400 grid grid-rows-2"
      >
        <div className="flex lg:justify-center justify-start flex-col">
          <h1 className=" text-7xl font-bold m-0 text-blue-900">SINAU</h1>
          <h3 className="mb-4 text-xl">{t("register")}</h3>
          <p className="text-sm">{t("register_desc")}</p>
        </div>

        <Steps direction="vertical" current={currentStep} items={items} />
      </Col>

      <Col
        lg={{ flex: "70%" }}
        sm={{ flex: "100%" }}
        className="w-full lg:pl-10 flex lg:items-center"
      >
        <RegistrationFormContext.Provider value={contextValue}>
          {currentStep === 0 && <PersonalInformation />}

          {currentStep === 1 && <AddressInformation />}

          {currentStep === 2 && <AccountInformation />}
        </RegistrationFormContext.Provider>
      </Col>
    </Row>
  );
};

export default Register;
