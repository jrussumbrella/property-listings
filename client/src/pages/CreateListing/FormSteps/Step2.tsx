import React from 'react';
import Input from 'components/Input';
import { Label, FormGroup } from '../styled';
import { FormProps } from '../types';

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
          error={Boolean(touched.address && errors.address)}
          errorMessage={touched.address && errors.address}
        />
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
          error={Boolean(touched.city && errors.city)}
          errorMessage={touched.city && errors.city}
        />
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
          error={Boolean(touched.state && errors.state)}
          errorMessage={touched.state && errors.state}
        />
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
          error={Boolean(touched.zip && errors.zip)}
          errorMessage={touched.zip && errors.zip}
        />
      </FormGroup>
    </>
  );
};

export default Step2;
