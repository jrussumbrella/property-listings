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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const html_to_text_1 = __importDefault(require("html-to-text"));
const newTransport = () => {
    // use mailtrap on development
    return nodemailer_1.default.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });
};
// Send the actual email
exports.sendEmail = ({ name, template, subject, url, from, to, message, options, }) => __awaiter(void 0, void 0, void 0, function* () {
    // convert html
    const html = pug_1.default.renderFile(`${process.cwd()}/src/templates/email/${template}.pug`, Object.assign({ name,
        url,
        subject,
        message }, options));
    // Email options
    const mailOptions = {
        from,
        to,
        subject,
        text: html_to_text_1.default.fromString(html),
        html,
    };
    // Create a transport and send email
    yield newTransport().sendMail(mailOptions);
});
