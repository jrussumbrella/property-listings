import React from "react";
import { Label, Input, FormGroup } from "./styled";

interface Props {
  imagePreview?: ArrayBuffer | null | string;
  handleChange(e: React.ChangeEvent<HTMLElement>): void;
}

const Step2: React.FC<Props> = ({ handleChange }) => {
  return (
    <>
      <FormGroup>
        <Label htmlFor="address"> Address </Label>
        <Input
          type="text"
          id="address"
          name="address"
          onChange={handleChange}
          placeholder="Please input address here..."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="city"> City/ Town </Label>
        <Input
          type="text"
          id="city"
          name="city"
          onChange={handleChange}
          placeholder="Please input city here..."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="state"> State/ Province </Label>
        <Input
          type="text"
          id="state"
          name="state"
          onChange={handleChange}
          placeholder="Please input state / province here..."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="city"> Zip/ Postal Code </Label>
        <Input
          type="text"
          id="zip"
          name="zip"
          onChange={handleChange}
          placeholder="Please input zip here..."
        />
      </FormGroup>
    </>
  );
};

export default Step2;
