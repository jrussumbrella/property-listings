import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useToast } from 'contexts';
import Meta from 'components/Meta';
import Button from 'components/Button';
import PageLoader from 'components/PageLoader';
import { NUMBER_OF_STEP } from 'utils/constants';
import { CREATE_LISTING } from 'graphql/mutations';
import styled from 'styled-components';
import { Form, FormBottom, ButtonWrapper } from './styled';
import { validationSchema } from './validationSchema';
import Step1 from './FormSteps/Step1';
import Step2 from './FormSteps/Step2';
import Step3 from './FormSteps/Step3';
import StepperIndicator from './StepperIndicator';
import { Property } from './types';

const initialState = {
  title: '',
  description: '',
  transactionType: '',
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
  propertySize: 1,
};

const Container = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const CreateListing = (): JSX.Element => {
  const history = useHistory();
  const { setToast } = useToast();
  const [step, setStep] = useState(1);

  const isLastStep = step === NUMBER_OF_STEP;

  const [createListing, { loading }] = useMutation(CREATE_LISTING, {
    onError() {
      setToast('error', 'Error in creating listing. Please try again later.');
    },
    onCompleted(data) {
      history.push(`/listing/${data.createListing.id}`);
      setToast('success', 'Successfully listing created');
    },
  });

  const handlePreviousStep = () => {
    setStep((newStep) => newStep - 1);
  };

  const nextStep = () => {
    setStep((newStep) => newStep + 1);
  };

  const handleSubmit = (values: Property) => {
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
        transactionType,
      } = values;

      const fullAddress = `${address}, ${city}, ${state}, ${zip}`;

      const newListing = {
        title,
        description,
        type,
        image,
        address: fullAddress,
        transactionType,
        propertySize: Number(propertySize),
        price: Number(price),
        numOfBaths: Number(numOfBaths),
        numOfBedrooms: Number(numOfBedrooms),
        numOfGuests: Number(numOfGuests),
      };

      createListing({ variables: { input: newListing } });
    } else {
      nextStep();
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema[`step${step}`],
    onSubmit: (values) => {
      formik.setTouched({});
      handleSubmit(values);
    },
  });

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // add some file validation here
    if (!e.target.files) {
      return;
    }
    const files = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (): void => {
      formik.setFieldValue('image', reader.result);
    };
    reader.readAsDataURL(files);
  };

  const renderStepperElement = (): JSX.Element | null => {
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
      variant="outline"
      type="button"
      title="Previous"
      onClick={handlePreviousStep}
    />
  );

  const buttonSubmitText = isLastStep ? 'Submit Property' : 'Next';

  const buttonSubmitElement = (
    <Button variant="primary" type="submit" title={buttonSubmitText} />
  );

  const pageLoaderElement = loading && <PageLoader />;

  return (
    <Container>
      <Meta title="Create a property" />
      <h1> Create a Property </h1>
      {pageLoaderElement}
      <StepperIndicator activeNumber={step} />
      <Form onSubmit={formik.handleSubmit}>
        {renderStepperElement()}
        <FormBottom>
          <ButtonWrapper position="left">{previewsButtonElement}</ButtonWrapper>
          <ButtonWrapper position="right">{buttonSubmitElement}</ButtonWrapper>
        </FormBottom>
      </Form>
    </Container>
  );
};

export default CreateListing;
