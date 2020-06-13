import React from "react";
import { Label, Input, FormGroup } from "./styled";

const Step3: React.FC = () => {
  return (
    <div>
      <FormGroup>
        <Label htmlFor="bedrooms"> Bed Rooms </Label>
        <Input
          type="text"
          id="bedrooms"
          name="bedrooms"
          placeholder="Please input bedrooms here..."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="bathRooms"> Bath Rooms </Label>
        <Input
          type="text"
          id="bathRooms"
          name="bathRooms"
          placeholder="Please input bathRooms here..."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="size"> Property Size </Label>
        <Input
          type="text"
          id="size"
          name="size"
          placeholder="Please input property size here..."
        />
      </FormGroup>
    </div>
  );
};

export default Step3;
