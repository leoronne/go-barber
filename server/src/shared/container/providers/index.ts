import { container } from 'tsyringe';
import storageConfig from '@config/upload';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import SendGridMailProvider from './MailProvider/implementations/SendGridMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', storageConfig.driver === 'disk' ? DiskStorageProvider : S3StorageProvider);

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);

container.registerInstance<IMailProvider>('MailProvider', container.resolve(SendGridMailProvider));
