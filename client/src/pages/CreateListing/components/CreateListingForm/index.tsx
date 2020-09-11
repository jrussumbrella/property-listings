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
        const {
          title,
          description,
          type,
          propertySize,
          numOfBaths,
          numOfGuests,
          numOfBedrooms,
          price,
          zip,
          city,
          address,
          state,
          image,
        } = values;

        const fullAddress = `${address}, ${city}, ${state}, ${zip}`;

        const newListing = {
          title,
          description,
          type,
          image,
          address: fullAddress,
          propertySize,
          price: Number(price),
          numOfBaths: Number(numOfBaths),
          numOfBedrooms: Number(numOfBedrooms),
          numOfGuests: Number(numOfGuests),
        };

        createListing({ variables: { input: newListing } });
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

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // add some file validation here

    if (!e.target.files) {
      return;
    }
    const files = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue('image', reader.result);
    };
    reader.readAsDataURL(files);
  };

  const renderStepperElement = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            onChange={formik.handleChange}
            onImageChange={onImageChange}
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
