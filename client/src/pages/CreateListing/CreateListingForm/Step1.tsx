import React from "react";
import { Label, Input, Select, TextArea, FormGroup, InputFile } from "./styled";
import { BsUpload } from "react-icons/bs";

const Step1: React.FC = () => {
  return (
    <div>
      <FormGroup>
        <Label htmlFor="title"> Title </Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Please input title here..."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description"> Description </Label>
        <TextArea
          id="description"
          name="description"
          placeholder="Please input description here..."
        ></TextArea>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="type"> Property Type </Label>
        <Select name="type" id="type">
          <option value=""> </option>
          <option value="apartment"> Apartment </option>
          <option value="house"> House </option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="price"> Price </Label>
        <Input
          type="text"
          id="price"
          name="price"
          placeholder="Please input price here..."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="image"> Image </Label>
        <InputFile>
          <BsUpload size={23} />
          <span>Select Image</span>
          <input type="file" id="image" name="image" />
        </InputFile>
      </FormGroup>
    </div>
  );
};

export default Step1;
