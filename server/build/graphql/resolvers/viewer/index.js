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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewerResolvers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
const uuid_1 = require("uuid");
const mongodb_1 = require("mongodb");
const utils_1 = require("../../../lib/utils");
const email_1 = require("../../../lib/api/email");
const api_1 = require("../../../lib/api");
const crypto_1 = __importDefault(require("crypto"));
const generateToken = (id, expiresIn) => {
    const secret = String(process.env.JWT_SECRET_KEY);
    return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn: expiresIn });
};
exports.viewerResolvers = {
    Query: {
        me: (_root, {}, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield utils_1.authenticate(db, req);
            if (!user)
                throw new Error('Invalid token');
            return user;
        }),
    },
    Mutation: {
        login: (_root, { input }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { email, password } = input;
                const viewer = yield db.users.findOne({ email });
                if (!viewer)
                    throw 'Email or password is incorrect';
                // check viewer input password if match into found viewer
                const isMatch = yield bcryptjs_1.default.compare(password, String(viewer.password));
                if (!isMatch)
                    throw 'Email or password is incorrect';
                // generate token
                const token = generateToken(viewer._id, '7d');
                return {
                    user: viewer,
                    token,
                };
            }
            catch (error) {
                throw new apollo_server_1.AuthenticationError(error);
            }
        }),
        loginWithGoogle: (_root, { idToken }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const results = yield api_1.Google.verifyIdToken(idToken);
            if (!results)
                throw new Error('Cant verify access token. Please try again later.');
            const email = results.email;
            const name = results.name;
            const googleId = results.sub;
            const photoUrl = results.picture;
            let viewer = yield db.users.findOne({ email });
            if (!viewer) {
                const insertResult = yield db.users.insertOne({
                    _id: new mongodb_1.ObjectID().toString(),
                    name,
                    email,
                    listings: [],
                    isEmailVerified: true,
                    googleId,
                    photoUrl,
                });
                viewer = insertResult.ops[0];
            }
            // generate token
            const token = generateToken(viewer._id, '7d');
            return {
                user: viewer,
                token,
            };
        }),
        signUp: (_root, { input }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, name, password } = input;
            // check if email is already taken
            const checkEmailExists = yield db.users.findOne({ email });
            if (checkEmailExists)
                throw new Error('Email is already taken');
            // encrypt password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const encryptPassword = yield bcryptjs_1.default.hash(password, salt);
            // inser user to db
            const insertRes = yield db.users.insertOne({
                name,
                email,
                password: encryptPassword,
                listings: [],
                _id: new mongodb_1.ObjectID().toString(),
                isEmailVerified: false,
            });
            const viewer = insertRes.ops[0];
            // generate access token
            const token = generateToken(viewer._id, '7d');
            const emailVerifyToken = uuid_1.v4();
            const url = `${process.env.CLIENT_URL}/email-confirmation/${emailVerifyToken}`;
            yield email_1.sendEmail({
                name: viewer.name,
                from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
                to: viewer.email,
                template: 'email-confirmation',
                subject: 'Welcome to Property Listings',
                url,
                message: 'Thanks for creating an account',
            });
            return {
                user: viewer,
                token,
            };
        }),
        updateProfile: (_root, { input }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, email } = input;
            const user = yield utils_1.authenticate(db, req);
            if (!user)
                throw new Error('Please login first');
            const updateResult = yield db.users.findOneAndUpdate({ _id: user._id }, {
                $set: {
                    name,
                    email,
                },
            }, {
                returnOriginal: false,
            });
            const viewer = updateResult.value;
            if (!viewer)
                throw new Error(`Error in updating profile details.`);
            const userToken = generateToken(viewer._id, '7d');
            return {
                user: viewer,
                token: userToken,
            };
        }),
        changePassword: (_root, { input }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const { oldPassword, newPassword, confirmNewPassword } = input;
            if (newPassword !== confirmNewPassword) {
                throw new Error('New Password and Confirm new Password does not match.');
            }
            const user = yield utils_1.authenticate(db, req);
            if (!user)
                throw new Error('Please login first');
            // check if input old password match the user current password
            const isMatch = yield bcryptjs_1.default.compare(oldPassword, String(user.password));
            if (!isMatch)
                throw new Error('Old Password is incorrect');
            // encrypt password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const encryptPassword = yield bcryptjs_1.default.hash(newPassword, salt);
            const updateResult = yield db.users.findOneAndUpdate({ _id: user._id }, {
                $set: {
                    password: encryptPassword,
                },
            }, {
                returnOriginal: false,
            });
            const viewer = updateResult.value;
            if (!viewer)
                throw new Error(`Error in updating new password. Please try again later.`);
            const userToken = generateToken(viewer._id, '7d');
            return {
                user: viewer,
                token: userToken,
            };
        }),
        emailTokenVerification: (_root, { token }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const userId = '';
            if (!userId)
                throw new Error(`Invalid token/ Token expired.`);
            const updateResult = yield db.users.findOneAndUpdate({ _id: userId }, {
                $set: {
                    isEmailVerified: true,
                },
            }, {
                returnOriginal: false,
            });
            const viewer = updateResult.value;
            if (!viewer)
                throw new Error(`Error in validating email address.`);
            const userToken = generateToken(viewer._id, '7d');
            return {
                user: viewer,
                token: userToken,
            };
        }),
        forgotPassword: (_root, { email }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!email)
                throw new Error('Email is required');
            const user = yield db.users.findOne({ email });
            if (!user)
                throw new Error('There is no user registered with that email');
            const passwordReset = yield db.passwordResets.findOne({ email });
            // generate reset token
            const resetToken = crypto_1.default.randomBytes(20).toString('hex');
            const resetPasswordToken = crypto_1.default
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');
            const expiredAt = Date.now() + 10 * 60 * 1000;
            if (passwordReset) {
                yield db.passwordResets.updateOne({ email }, {
                    $set: { token: resetPasswordToken, expiredAt },
                });
            }
            else {
                yield db.passwordResets.insertOne({
                    _id: new mongodb_1.ObjectID().toString(),
                    email,
                    token: resetPasswordToken,
                    expiredAt,
                });
            }
            const url = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
            yield email_1.sendEmail({
                name: user.name,
                from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
                to: user.email,
                template: 'password-reset',
                subject: 'Reset Password',
                url,
                message: 'Please click the button to proceed to the link to reset your password',
            });
            return 'Successfully email sent';
        }),
        resetPassword: (_root, { input }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const { newPassword, confirmNewPassword, token } = input;
            if (newPassword !== confirmNewPassword) {
                throw new Error('New Password and Confirm new Password does not match');
            }
            const resetPasswordToken = crypto_1.default
                .createHash('sha256')
                .update(token)
                .digest('hex');
            const passwordReset = yield db.passwordResets.findOne({
                token: resetPasswordToken,
                expiredAt: { $gt: Date.now() },
            });
            if (!passwordReset) {
                throw new Error('Invalid reset token');
            }
            // encrypt password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const encryptPassword = yield bcryptjs_1.default.hash(newPassword, salt);
            const updateRes = yield db.users.findOneAndUpdate({
                email: passwordReset.email,
            }, {
                $set: {
                    password: encryptPassword,
                },
            }, {
                returnOriginal: false,
            });
            const viewer = updateRes.value;
            if (!viewer)
                throw new Error('Error in updating new password. Please try again later');
            yield db.passwordResets.deleteOne({ token: resetPasswordToken });
            const userToken = generateToken(viewer._id, '7d');
            return {
                user: viewer,
                token: userToken,
            };
        }),
    },
};
