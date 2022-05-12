import nodemailer from 'nodemailer';
import { IEmailAdapter, SendMailData } from "./mail/ImailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "523370c523b4f0",
    pass: "a585cbf566b21a"
  }
});

export class NodeMailerAdapter implements IEmailAdapter {
  async sendMail({ subject, body }: SendMailData) : Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Denis Alves <denis.alves2010@bol.com.br>',
      subject,
      html: body,
    });
  }
}