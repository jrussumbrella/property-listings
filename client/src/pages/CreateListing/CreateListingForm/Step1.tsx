import React from "react";
import {
  Label,
  Input,
  Select,
  TextArea,
  FormGroup,
  InputFile,
  ImagePreview,
} from "./styled";
import { BsUpload } from "react-icons/bs";

interface Props {
  imagePreview?: ArrayBuffer | null | string;
  handleChange(e: React.ChangeEvent<HTMLElement>): void;
}

const Step1: React.FC<Props> = ({ handleChange, imagePreview }) => {
  return (
    <div>
      <FormGroup>
        <Label htmlFor="title"> Title </Label>
        <Input
          id="title"
          name="title"
          onChange={handleChange}
          placeholder="Please input title here..."
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description"> Description </Label>
        <TextArea
          id="description"
          name="description"
          onChange={handleChange}
          placeholder="Please input description here..."
        ></TextArea>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="type"> Property Type </Label>
        <Select id="type" name="type" onChange={handleChange}>
          <option value=""> </option>
          <option value="APARTMENT"> Apartment </option>
          <option value="HOUSE"> House </option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="price"> Price </Label>
        <Input
          id="price"
          name="price"
          onChange={handleChange}
          placeholder="Please input price here..."
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="image"> Image </Label>
        <InputFile>
          <BsUpload size={23} />
          <span>Select Image</span>
          <input type="file" id="image" name="image" onChange={handleChange} />
        </InputFile>
      </FormGroup>
      {imagePreview && (
        <ImagePreview style={{ backgroundImage: `url(${imagePreview})` }} />
      )}
    </div>
  );
};

export default Step1;
