import React from 'react';
import { Label, Input, FormGroup, ErrorText } from './styled';
import { FormProps } from './types';

const Step2: React.FC<FormProps> = ({
  onChange,
  errors,
  touched,
  onBlur,
  values,
}) => {
  return (
    <>
      <FormGroup>
        <Label htmlFor="address"> Address </Label>
        <Input
          type="text"
          id="address"
          name="address"
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Please input address here..."
          value={values.address}
        />
        {touched.address && errors.address && (
          <ErrorText>{errors.address}</ErrorText>
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="city"> City/ Town </Label>
        <Input
          type="text"
          id="city"
          name="city"
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Please input city here..."
          value={values.city}
        />
        {touched.city && errors.city && <ErrorText>{errors.city}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="state"> State/ Province </Label>
        <Input
          type="text"
          id="state"
          name="state"
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Please input state / province here..."
          value={values.state}
        />
        {touched.state && errors.state && <ErrorText>{errors.state}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="city"> Zip/ Postal Code </Label>
        <Input
          type="text"
          id="zip"
          name="zip"
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Please input zip here..."
          value={values.zip}
        />
        {touched.zip && errors.zip && <ErrorText>{errors.zip}</ErrorText>}
      </FormGroup>
    </>
  );
};

export default Step2;
