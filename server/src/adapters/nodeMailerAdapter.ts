import nodemailer from 'nodemailer';
import { IEmailAdapter, SendMailData } from "./mail/ImailAdapter";
require('dotenv').config();

const mailConfig = { 
  host: process.env.MAIL_HOST || "",
  port: parseInt(process.env.MAIL_PORT || "") ,
  auth: {
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASS || ""
  }
}
const transport = nodemailer.createTransport(mailConfig);

export class NodeMailerAdapter implements IEmailAdapter {
  async sendMail({ subject, body }: SendMailData) : Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Denis Alves <seu.email@email.com>',
      subject,
      html: body,
    });
  }
}