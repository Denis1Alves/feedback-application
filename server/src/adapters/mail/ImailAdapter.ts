export interface SendMailData {
  subject: string;
  body: string;
}

export interface IEmailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}