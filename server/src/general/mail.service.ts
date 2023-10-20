import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as nodemailer from 'nodemailer';

config();

@Injectable()
export class MailService {
  private FROM_EMAIL;
  private RATING_HOST;
  private NODE_ENV;

  constructor() {
    this.FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL;
    this.RATING_HOST = this.stripTrailingSlash(process.env.RATING_HOST);
    this.NODE_ENV = process.env.NODE_ENV || 'development';
  }

  // to -which email we nedd to send, subject - some title, html - message
  async sendMail(to: string, subject: string, html: string) {
    const port = +process.env.SMTP_PORT;
    const transporter = nodemailer.createTransport({
      // service: "gmail",
      host: process.env.SMTP_DOMAIN,
      port: port,
      secure: port == 465,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const message = {
      from: `"irnitu" <${this.FROM_EMAIL}>`,
      to,
      subject,
      html,
    };

    /* if development environment, log the content of email instead of sending actual emails */
    if (this.NODE_ENV === 'development') {
      console.log('Captured email');
      console.log('to: ', to);
      console.log('Subject: ', subject);
      console.log('content: ', html);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const previewEmail = require('preview-email');

      previewEmail(message).then(console.log).catch(console.error);
    } else {
      const info = await transporter.sendMail(message);
      console.log('Message sent: %s', info);
    }
  }

  async sendWelcomeEmail(to: string, name: string, invitationtoken: string) {
    const subject = 'Welcome to Student Rating';
    const inviteUrl = `${this.RATING_HOST}/invitations/${invitationtoken}`;
    const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
            </head>
            <body>
              <p>Hi ${name || ''},</p>
                Пожалуйста перейдите по ссылке ниже, чтобы активировать аккаунт
              </span>
              <br>
              <a href="${inviteUrl}">${inviteUrl}</a>
              <br>
              <p>
                Welcome aboard,<br>
                Student Rating
              </p>
            </body>
          </html>
        `;

    await this.sendMail(to, subject, html);
  }

  stripTrailingSlash(hostname: string) {
    return hostname?.endsWith('/') ? hostname.slice(0, -1) : hostname;
  }
}
