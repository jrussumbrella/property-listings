import React from 'react';
import {
  Label,
  Input,
  Select,
  TextArea,
  FormGroup,
  InputFile,
  ImagePreview,
  ErrorText,
} from './styled';
import { BsUpload } from 'react-icons/bs';
import { FormProps } from './types';

const Step1: React.FC<FormProps> = ({
  onChange,
  imagePreview,
  errors,
  touched,
  onBlur,
  values,
}) => {
  return (
    <div>
      <FormGroup>
        <Label htmlFor="title"> Title </Label>
        <Input
          id="title"
          name="title"
          onChange={onChange}
          placeholder="Please input title here..."
          type="text"
          onBlur={onBlur}
          value={values.title}
        />
        {touched.title && errors.title && <ErrorText>{errors.title}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description"> Description </Label>
        <TextArea
          id="description"
          name="description"
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Please input description here..."
          value={values.description}
        ></TextArea>
        {touched.description && errors.description && (
          <ErrorText>{errors.description}</ErrorText>
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="type"> Property Type </Label>
        <Select
          id="type"
          name="type"
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={values.type}
        >
          <option value=""> </option>
          <option value="APARTMENT"> Apartment </option>
          <option value="HOUSE"> House </option>
        </Select>
        {touched.type && errors.type && <ErrorText>{errors.type}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="price"> Price </Label>
        <Input
          id="price"
          name="price"
          onChange={onChange}
          placeholder="Please input price here..."
          type="text"
          onBlur={onBlur}
          value={values.price}
        />
        {touched.price && errors.price && <ErrorText>{errors.price}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="image"> Image </Label>
        <InputFile>
          <BsUpload size={23} />
          <span>Select Image</span>
          <input type="file" id="image" name="image" onChange={onChange} />
        </InputFile>
      </FormGroup>
      {imagePreview && (
        <ImagePreview style={{ backgroundImage: `url(${imagePreview})` }} />
      )}
    </div>
  );
};

export default Step1;
