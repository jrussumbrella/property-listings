import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Form } from "./styled";
import { Button } from "../../../components/Common";
import { NUMBER_OF_STEP } from "../../../utils/constants";
import styled from "styled-components";
import StepperIndicator from "./StepperIndicator";

interface ButtonWrapperProps {
  position: string;
}

const FormBottom = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  margin: 2rem 0;
  display: flex;
  justify-content: ${(props) =>
    props.position === "left" ? "flex-start" : "flex-end"};
  flex: 1;
`;

const sections = [Step1, Step2, Step3];

export const CreateListingForm = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    console.log(step + 1);
    setStep((step) => step + 1);
  };

  const handlePreviousStep = () => {
    setStep((step) => step - 1);
  };

  const stepperElement = sections.map((Section, i) => {
    return (
      <div key={i} style={{ display: `${step === i + 1 ? "block" : "none"}` }}>
        <Section />
      </div>
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div>
      <StepperIndicator activeNumber={step} />
      <Form onSubmit={handleSubmit}>
        {stepperElement}
        <FormBottom>
          <ButtonWrapper position="left">
            {step > 1 && (
              <Button
                classType="outline"
                type="button"
                title="Previous"
                onClick={handlePreviousStep}
              />
            )}
          </ButtonWrapper>

          <ButtonWrapper position="right">
            {step < NUMBER_OF_STEP && (
              <Button
                classType="primary"
                type="button"
                title="Continue"
                onClick={handleNextStep}
              />
            )}
            {step === NUMBER_OF_STEP && (
              <Button
                classType="primary"
                type="submit"
                title="Submit Property"
              />
            )}
          </ButtonWrapper>
        </FormBottom>
      </Form>
    </div>
  );
};
