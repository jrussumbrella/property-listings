"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Google = void 0;
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const google_auth_library_1 = require("google-auth-library");
const CLIENT_ID = `${process.env.GOOGLE_CLIENT_ID}`;
const client = new google_maps_services_js_1.Client({});
const parseAddress = (addressComponents) => {
    let country, admin, city = null;
    for (const component of addressComponents) {
        const types = component.types;
        if (types.includes(google_maps_services_js_1.AddressType["country"])) {
            country = component.long_name;
        }
        if (component.types.includes(google_maps_services_js_1.AddressType["administrative_area_level_1"])) {
            admin = component.long_name;
        }
        if (component.types.includes(google_maps_services_js_1.AddressType["locality"])) {
            city = component.long_name;
        }
    }
    return { country, admin, city };
};
exports.Google = {
    geocode: (address) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield client.geocode({
            params: {
                key: String(process.env.G_GEOCODE_KEY),
                address,
            },
        });
        if (res.status < 200 || res.status > 299)
            throw new Error("Failed to geocode address");
        return parseAddress(res.data.results[0].address_components);
    }),
    verifyIdToken: (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
        const authClient = new google_auth_library_1.OAuth2Client();
        const ticket = yield authClient.verifyIdToken({
            idToken: accessToken,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    }),
};
