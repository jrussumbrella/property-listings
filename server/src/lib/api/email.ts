import nodemailer from "nodemailer";
import pug from "pug";
import htmlToText from "html-to-text";

interface IEmail {
  name: string;
  template: string;
  subject: string;
  url: string;
  from: string;
  to: string;
  message: string;
  options?: object;
}

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
export const sendEmail = async ({
  name,
  template,
  subject,
  url,
  from,
  to,
  message,
  options,
}: IEmail) => {
  // convert html
  const html = pug.renderFile(
    `${process.cwd()}/src/templates/email/${template}.pug`,
    {
      name,
      url,
      subject,
      message,
      ...options,
    }
  );

  // Email options
  const mailOptions = {
    from,
    to,
    subject,
    text: htmlToText.fromString(html),
    html,
  };

  // Create a transport and send email
  await newTransport().sendMail(mailOptions);
};
