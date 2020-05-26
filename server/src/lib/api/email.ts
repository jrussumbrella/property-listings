import nodemailer from "nodemailer";
import pug from "pug";
import htmlToText from "html-to-text";
import { User } from "../types";

const newTransport = () => {
  // use mailtrap on development
  return nodemailer.createTransport({
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
export const sendEmail = async (
  user: User,
  template: string,
  subject: string,
  url: string
) => {
  const firstName = user.name.split(" ")[0];

  // convert html
  const html = pug.renderFile(
    `${process.cwd()}/src/templates/email/${template}.pug`,
    {
      firstName: firstName,
      url: url,
      subject,
    }
  );

  // Email options
  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: user.email,
    subject,
    text: htmlToText.fromString(html),
    html,
  };

  // Create a transport and send email
  await newTransport().sendMail(mailOptions);
};
