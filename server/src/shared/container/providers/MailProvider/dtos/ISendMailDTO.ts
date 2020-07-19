/* eslint-disable @typescript-eslint/no-explicit-any */
import IParseTemplateMailDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface ISendMailDTO {
  to: string;
  subject: string;
  template: IParseTemplateMailDTO;
}
