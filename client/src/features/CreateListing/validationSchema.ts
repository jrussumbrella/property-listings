import * as Yup from 'yup';

type TValidationSchema = Record<string, object>;

export const validationSchema: TValidationSchema = {
  step1: Yup.object({
    title: Yup.string()
      .min(6, 'Title cannot be less than 6 characters')
      .required('Title is required field'),
    description: Yup.string()
      .min(10, 'Description cannot be less than 10 characters')
      .max(100, 'Description cannot be greater than 100 characters')
      .required('Description is required field'),
    type: Yup.string().required('Property type is required field'),
    price: Yup.number()
      .moreThan(0)
      .typeError('Price must be a number')
      .required('Price is required field'),
    image: Yup.string().required('Image file is  required field'),
  }),
  step2: Yup.object({
    address: Yup.string().required('Address is required field'),
    city: Yup.string().required('City/ Town is required field'),
    state: Yup.string().required('State/ Province  is required field'),
    zip: Yup.string()
      .required('Zip code is required filed')
      .test('len', 'Zip code is not valid (e.g. 70000)', (val) =>
        Boolean(val && val.length === 5)
      ),
  }),
  step3: Yup.object({
    propertySize: Yup.number()
      .moreThan(0)
      .typeError('Property Size must be a number')
      .required('Property Size is required field'),
    numOfBedrooms: Yup.number()
      .moreThan(0)
      .typeError('Number of bedrooms must be a number')
      .required('Number of bedrooms required field'),
    numOfGuests: Yup.number()
      .moreThan(0)
      .typeError('Number of guests must be a number')
      .required('Number of guests  is required field'),
    numOfBaths: Yup.number()
      .moreThan(0)
      .typeError('Number of baths must be a number')
      .required('Number of baths is required field'),
  }),
};
