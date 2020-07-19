/* eslint-disable @typescript-eslint/no-explicit-any */
import { MAIL_USER, MAIL_PASS, MAIL_FROM } from '@shared/utils/environment';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
class SendGridMailProvider implements IMailProvider {
  private transporter: Transporter;

  // private handlebarOptions: any;

  private mailTemplateProvider: IMailTemplateProvider;

  constructor(
    @inject('MailTemplateProvider')
    mailTemplateProvider: IMailTemplateProvider
  ) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });
    // this.handlebarOptions = {
    //   viewEngine: {
    //     extName: '.hbs',
    //     partialsDir: path.resolve('./src/resources/mail/views'),
    //     layoutsDir: path.resolve('./src/resources/mail/views'),
    //     defaultLayout: undefined,
    //   },
    //   viewPath: path.resolve('./src/resources/mail/views'),
    //   extName: '.hbs',
    // };
    // this.transporter.use('compile', hbs(this.handlebarOptions));
  }

  public async sendMail({ to, subject, template }: ISendMailDTO): Promise<void> {
    await this.transporter.sendMail({
      from: `"${MAIL_FROM}" <go-barber@no-reply.com>`,
      to,
      subject,
      html: await this.mailTemplateProvider.parse(template),
    });
  }
}

export default SendGridMailProvider;
