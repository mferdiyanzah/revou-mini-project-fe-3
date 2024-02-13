import { Col, Row, Steps } from "antd";
import { useState } from "react";
import PersonalInformation from "../../components/personal-information/index.tsx";
import AddressInformation from "../../components/address-information/index.tsx";
import AccountInformation from "../../components/account-information/index.tsx";
import { IRegisterForm } from "./register.interface.ts";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<IRegisterForm>();

  const steps = [
    "Personal Information",
    "Address Information",
    "Account Information",
  ];

  const items = steps.map((item, idx) => ({
    key: idx,
    title: item,
  }));

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onPrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Row className="lg:h-[60vh] h-screen">
      <Col
        sm={{ flex: "100%" }}
        lg={{ flex: "30%" }}
        className="pr-4 gap-4 lg:border-r border-gray-400 grid grid-rows-2"
      >
        <div className="flex justify-center flex-col">
          <h1 className="text-6xl font-bold m-0 text-blue-900">SINAU</h1>
          <h3 className="mb-4 text-xl">Register</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
            magnam excepturi sit quas, ratione magni, autem fuga cum saepe.
          </p>
        </div>

        <Steps direction="vertical" current={currentStep} items={items} />
      </Col>

      <Col
        lg={{ flex: "70%" }}
        sm={{ flex: "100%" }}
        className="w-full lg:pl-10 flex lg:items-center"
      >
        {currentStep === 0 && (
          <PersonalInformation
            formData={formData}
            setFormData={setFormData}
            onNext={onNext}
          />
        )}

        {currentStep === 1 && (
          <AddressInformation
            onPrevious={onPrev}
            onNext={onNext}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {currentStep === 2 && (
          <AccountInformation
            onPrevious={onPrev}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </Col>
    </Row>
  );
};

export default Register;
