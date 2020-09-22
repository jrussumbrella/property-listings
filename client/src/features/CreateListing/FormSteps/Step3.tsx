import React from 'react';
import Input from 'components/Input';
import { Label, FormGroup } from '../styled';
import { FormProps } from '../types';

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
          type="number"
          id="numOfGuests"
          name="numOfGuests"
          placeholder="Please input bathRooms here..."
          onChange={onChange}
          onBlur={onBlur}
          value={values.numOfGuests}
          error={Boolean(touched.numOfGuests && errors.numOfGuests)}
          errorMessage={touched.numOfGuests && errors.numOfGuests}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="bedrooms"> Bed Rooms </Label>
        <Input
          type="number"
          id="bedrooms"
          name="numOfBedrooms"
          placeholder="Please input bedrooms here..."
          onChange={onChange}
          onBlur={onBlur}
          error={Boolean(touched.numOfBedrooms && errors.numOfBedrooms)}
          errorMessage={touched.numOfBedrooms && errors.numOfBedrooms}
          value={values.numOfBedrooms}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="numOfBaths"> Bath Rooms </Label>
        <Input
          type="number"
          id="numOfBaths"
          name="numOfBaths"
          placeholder="Please input bathRooms here..."
          onChange={onChange}
          onBlur={onBlur}
          value={values.numOfBaths}
          error={Boolean(touched.numOfBaths && errors.numOfBaths)}
          errorMessage={touched.numOfBaths && errors.numOfBaths}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="size"> Property Size (square ft.)</Label>
        <Input
          type="text"
          id="size"
          name="propertySize"
          placeholder="Please input property size here..."
          onChange={onChange}
          onBlur={onBlur}
          value={values.propertySize}
          error={Boolean(touched.propertySize && errors.propertySize)}
          errorMessage={touched.propertySize && errors.propertySize}
        />
      </FormGroup>
    </div>
  );
};

export default Step3;
