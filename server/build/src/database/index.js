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
exports.connectDb = void 0;
const mongodb_1 = require("mongodb");
exports.connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = `${process.env.DATABASE_LOCAL}`;
    const client = yield mongodb_1.MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db('property-listings');
    return {
        listings: db.collection('listings'),
        users: db.collection('users'),
        passwordResets: db.collection('passwordResets'),
        favorites: db.collection('favorites'),
    };
});
