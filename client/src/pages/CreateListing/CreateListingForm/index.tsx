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

const initialState = {
  title: "",
  description: "",
  type: "",
  price: "",
};

export const CreateListingForm = () => {
  const [step, setStep] = useState(1);
  const [listing, setListing] = useState(initialState);
  const [errors, setErrors] = useState<string[]>([]);

  const handleNextStep = () => {
    const error: string[] = [];

    if (step === 1) {
      if (listing.title.length < 6) {
        error.push("Listing title cannot be less than 6 characters");
      }

      if (parseInt(listing.price) === 0) {
        error.push("Listing price cannot be equal to zero");
      } else if (listing.price.length === 0) {
        error.push("Listing price cannot be empty");
      }

      if (listing.type.length === 0) {
        error.push("Listing type is required field");
      }

      if (listing.description.length < 10) {
        error.push("Listing description cannot be less than 10 characters");
      }
    }

    if (error.length > 0) {
      setErrors(error);
      return;
    }

    setStep((step) => step + 1);
  };

  const handlePreviousStep = () => {
    setStep((step) => step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const stepperElement = sections.map((Section, i) => {
    return (
      <div key={i} style={{ display: `${step === i + 1 ? "block" : "none"}` }}>
        <Section handleChange={handleChange} />
      </div>
    );
  });

  console.log(errors);

  return (
    <div>
      <StepperIndicator activeNumber={step} />
      <Form onSubmit={handleSubmit}>
        {stepperElement}
        <FormBottom>
          <ButtonWrapper position="left">
            {step > 1 && (
              <Button
                classtype="outline"
                type="button"
                title="Previous"
                onClick={handlePreviousStep}
              />
            )}
          </ButtonWrapper>

          <ButtonWrapper position="right">
            {step < NUMBER_OF_STEP && (
              <Button
                classtype="primary"
                type="button"
                title="Continue"
                onClick={handleNextStep}
              />
            )}
            {step === NUMBER_OF_STEP && (
              <Button
                classtype="primary"
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
