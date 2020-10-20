export const isProd = process.env.NODE_ENV === 'production';
export const NUMBER_OF_STEP = 3;
export const LISTING_CONTACT_MESSAGE =
  'I am interested in this property and would like to schedule a viewing. Please let me know when this would be possible.';
export const PAGE_LIMIT = 12;
export const PAGE = 1;

export const API_URL = isProd
  ? 'https://property-listings-server.herokuapp.com/'
  : 'http://localhost:5000/';

export const GTM_ID = String(process.env.REACT_APP_GTM_ID);
