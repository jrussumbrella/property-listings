import {
  Client,
  AddressComponent,
  AddressType,
} from "@googlemaps/google-maps-services-js";

import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = `${process.env.GOOGLE_CLIENT_ID}`;

const client = new Client({});

const parseAddress = (addressComponents: AddressComponent[]) => {
  let country,
    admin,
    city = null;

  for (const component of addressComponents) {
    const types = component.types;
    if (types.includes(AddressType["country"])) {
      country = component.long_name;
    }

    if (component.types.includes(AddressType["administrative_area_level_1"])) {
      admin = component.long_name;
    }

    if (component.types.includes(AddressType["locality"])) {
      city = component.long_name;
    }
  }

  return { country, admin, city };
};

export const Google = {
  geocode: async (address: string) => {
    const res = await client.geocode({
      params: {
        key: String(process.env.G_GEOCODE_KEY),
        address,
      },
    });

    if (res.status < 200 || res.status > 299)
      throw new Error("Failed to geocode address");

    return parseAddress(res.data.results[0].address_components);
  },
  verifyIdToken: async (accessToken: string) => {
    const authClient = new OAuth2Client();
    const ticket = await authClient.verifyIdToken({
      idToken: accessToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  },
};
