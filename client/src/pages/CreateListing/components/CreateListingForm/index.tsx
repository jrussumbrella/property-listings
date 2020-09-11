import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form } from './styled';
import { Button, PageLoader } from '../../../../components/Common';
import { NUMBER_OF_STEP } from '../../../../utils/constants';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LISTING } from '../../../../graphql/mutations';
import { useToast } from '../../../../store';
import { useHistory } from 'react-router-dom';
import { validationSchema } from './validationSchema';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import StepperIndicator from './StepperIndicator';
import styled from 'styled-components';

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
    props.position === 'left' ? 'flex-start' : 'flex-end'};
  flex: 1;
`;

const initialState = {
  title: '',
  description: '',
  type: '',
  price: '',
  image: '',
  address: '',
  city: '',
  zip: '',
  state: '',
  numOfBaths: 1,
  numOfGuests: 1,
  numOfBedrooms: 1,
  propertySize: '',
};

export const CreateListingForm = () => {
  const history = useHistory();
  const { setToast } = useToast();
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );

  const isLastStep = step === NUMBER_OF_STEP;

  const [createListing, { loading }] = useMutation(CREATE_LISTING, {
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
    onCompleted(data) {
      history.push(`/listing/${data.createListing.id}`);
      setToast('success', 'Successfully listing created');
    },
  });

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema[`step${step}`],
    onSubmit: (values) => {
      if (isLastStep) {
        console.log(values);
      } else {
        nextStep();
      }
    },
  });

  const nextStep = () => {
    formik.setTouched({});
    setStep((step) => step + 1);
  };

  const handlePreviousStep = () => {
    setStep((step) => step - 1);
  };

  const imageChange = (files: Blob) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(files);
  };

  const renderStepperElement = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            onChange={formik.handleChange}
            imagePreview={imagePreview}
            errors={formik.errors}
            touched={formik.touched}
            onBlur={formik.handleBlur}
            values={formik.values}
          />
        );
      case 2:
        return (
          <Step2
            onChange={formik.handleChange}
            imagePreview={imagePreview}
            errors={formik.errors}
            touched={formik.touched}
            onBlur={formik.handleBlur}
            values={formik.values}
          />
        );
      case 3:
        return (
          <Step3
            onChange={formik.handleChange}
            imagePreview={imagePreview}
            errors={formik.errors}
            touched={formik.touched}
            onBlur={formik.handleBlur}
            values={formik.values}
          />
        );
      default:
        return null;
    }
  };

  const previewsButtonElement = step > 1 && (
    <Button
      classtype="outline"
      type="button"
      title="Previous"
      onClick={handlePreviousStep}
    />
  );

  const buttonSubmitText = isLastStep ? 'Submit Property' : 'Next';

  const buttonSubmitElement = (
    <Button classtype="primary" type="submit" title={buttonSubmitText} />
  );

  const pageLoaderElement = loading && <PageLoader />;

  return (
    <div>
      {pageLoaderElement}
      <StepperIndicator activeNumber={step} />
      <Form onSubmit={formik.handleSubmit}>
        {renderStepperElement()}
        <FormBottom>
          <ButtonWrapper position="left">{previewsButtonElement}</ButtonWrapper>
          <ButtonWrapper position="right">{buttonSubmitElement}</ButtonWrapper>
        </FormBottom>
      </Form>
    </div>
  );
};
