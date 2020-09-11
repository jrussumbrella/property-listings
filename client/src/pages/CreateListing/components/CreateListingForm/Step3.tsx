import React from 'react';
import { Label, Input, FormGroup, ErrorText } from './styled';
import { FormProps } from './types';

const Step3: React.FC<FormProps> = ({
  onBlur,
  onChange,
  touched,
  errors,
  values,
}) => {
  return (
    <div>
      <FormGroup>
        <Label htmlFor="numOfGuests"> Max Guests </Label>
        <Input
          type="text"
          id="numOfGuests"
          name="numOfGuests"
          placeholder="Please input bathRooms here..."
          onChange={onChange}
          onBlur={onBlur}
          value={values.numOfGuests}
        />
        {touched.numOfGuests && errors.numOfGuests && (
          <ErrorText>{errors.numOfGuests}</ErrorText>
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="bedrooms"> Bed Rooms </Label>
        <Input
          type="text"
          id="bedrooms"
          name="numOfBedrooms"
          placeholder="Please input bedrooms here..."
          onChange={onChange}
          onBlur={onBlur}
          value={values.numOfBedrooms}
        />
        {touched.numOfBedrooms && errors.numOfBedrooms && (
          <ErrorText>{errors.numOfBedrooms}</ErrorText>
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="numOfBaths"> Bath Rooms </Label>
        <Input
          type="text"
          id="numOfBaths"
          name="numOfBaths"
          placeholder="Please input bathRooms here..."
          onChange={onChange}
          onBlur={onBlur}
          value={values.numOfBaths}
        />
        {touched.numOfBaths && errors.numOfBaths && (
          <ErrorText>{errors.numOfBaths}</ErrorText>
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="size"> Property Size </Label>
        <Input
          type="text"
          id="size"
          name="propertySize"
          placeholder="Please input property size here..."
          onChange={onChange}
          onBlur={onBlur}
          value={values.propertySize}
        />
        {touched.propertySize && errors.propertySize && (
          <ErrorText>{errors.propertySize}</ErrorText>
        )}
      </FormGroup>
    </div>
  );
};

export default Step3;
