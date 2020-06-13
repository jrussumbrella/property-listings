import React from "react";
import { Label, Input, FormGroup } from "./styled";

const Step2: React.FC = () => {
  return (
    <>
      <FormGroup>
        <Label htmlFor="address"> Address </Label>
        <Input
          type="text"
          id="address"
          name="address"
          placeholder="Please input address here..."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="city"> City/ Town </Label>
        <Input
          type="text"
          id="city"
          name="city"
          placeholder="Please input city here..."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="city"> Zip/ Postal Code </Label>
        <Input
          type="text"
          id="zip"
          name="zip"
          placeholder="Please input zip here..."
        />
      </FormGroup>
    </>
  );
};

export default Step2;
