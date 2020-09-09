import React from "react";
import { Label, Input, FormGroup } from "./styled";

interface Props {
  imagePreview?: ArrayBuffer | null | string;
  handleChange(e: React.ChangeEvent<HTMLElement>): void;
}

const Step3: React.FC<Props> = ({ handleChange }) => {
  return (
    <div>
      <FormGroup>
        <Label htmlFor="numOfGuests"> Max Guests </Label>
        <Input
          type="text"
          id="numOfGuests"
          name="numOfGuests"
          placeholder="Please input bathRooms here..."
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="bedrooms"> Bed Rooms </Label>
        <Input
          type="text"
          id="bedrooms"
          name="numOfBedrooms"
          placeholder="Please input bedrooms here..."
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="numOfBaths"> Bath Rooms </Label>
        <Input
          type="text"
          id="numOfBaths"
          name="numOfBaths"
          placeholder="Please input bathRooms here..."
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="size"> Property Size </Label>
        <Input
          type="text"
          id="size"
          name="propertySize"
          placeholder="Please input property size here..."
          onChange={handleChange}
        />
      </FormGroup>
    </div>
  );
};

export default Step3;
