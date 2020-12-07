import { FormikErrors, FormikTouched } from 'formik';

export interface Property {
  title: string;
  description: string;
  type: string;
  price: string;
  image: string;
  address: string;
  city: string;
  zip: string;
  state: string;
  numOfBaths: number;
  numOfGuests: number;
  numOfBedrooms: number;
  propertySize: number;
  transactionType: string;
}

export interface FormProps {
  onChange(e: React.ChangeEvent<HTMLElement>): void;
  onBlur(e: React.FocusEvent<HTMLElement>): void;
  errors: FormikErrors<Property>;
  touched: FormikTouched<Property>;
  values: Property;
  onImageChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}
