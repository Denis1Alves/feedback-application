import nodemailer from 'nodemailer';
import { IEmailAdapter, SendMailData } from "./mail/ImailAdapter";

const transport = nodemailer.createTransport({
  host: "",
  port: 0,
  auth: {
    user: "",
    pass: ""
  }
});

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