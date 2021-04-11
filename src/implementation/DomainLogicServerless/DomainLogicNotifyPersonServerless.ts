import {
  Person, AlertPerson, Alert, DomainLogicNotifyPerson,
} from '@interfaces/DomainLogic';
import { SendEmail } from '@interfaces/MailAdapter';
import { CreateAlertPerson } from '@interfaces/PersistanceAdapter';
import { SendSMS } from '@interfaces/SMSAdapter';
import bindDependencies from '@inyection/bindDependencies';
import TYPES from '@inyection/types';
import { v4 as uuidv4 } from 'uuid';
import ERROR from '../Errors/DomainLogicServerless';
import { getTemplateEmailFilled, getTemplateSMSFilled } from './DomainLogicTexts';

export async function DomainLogicNotifyPersonServerless(
  {
    sendEmail, sendSMS, createAlertPerson,
  }: {
    sendEmail: SendEmail,
    sendSMS: SendSMS,
    createAlertPerson: CreateAlertPerson,
  },
  person: Person,
  serviceName: String,
  description: String,
  level: number,
  alert: Alert,
) {
  if (!person.Email && !person.SMSNumber) {
    throw new Error(`${ERROR.DL_Serverless_EscalationPolicyPersonWithoutContactData} - ${JSON.stringify(person)}`);
  } else {
    let sentAnyNotification = false;

    if (person.Email) {
      try {
        const identifier = uuidv4();
        const template = await getTemplateEmailFilled({
          name: person.Name,
          serviceName,
          description,
          alertIdentifier: identifier,
        });
        await sendEmail({
          to: person.Email,
          body: template,
        });
        sentAnyNotification = true;

        const alertPerson: AlertPerson = {
          Alert: alert,
          Level: level,
          Person: person,
          Id: identifier,
          Channel: 'Email',
          Date: new Date(),
        };
        await createAlertPerson(alertPerson);
      } catch (error) {
        console.error(`Cannot send email to ${JSON.stringify(person)} - ${serviceName}`);
        console.error(error);
      }
    }

    if (person.SMSNumber) {
      try {
        const identifier = uuidv4();
        const template = await getTemplateSMSFilled({
          name: person.Name,
          serviceName,
          description,
          alertIdentifier: identifier,
        });
        await sendSMS({
          numbers: [person.SMSNumber],
          body: template,
        });
        sentAnyNotification = true;
        const alertPerson: AlertPerson = {
          Alert: alert,
          Level: level,
          Person: person,
          Id: identifier,
          Channel: 'SMS',
          Date: new Date(),
        };
        await createAlertPerson(alertPerson);
      } catch (error) {
        console.error(`Cannot send email to ${JSON.stringify(person)} - ${serviceName}`);
        console.error(error);
      }
    }

    if (sentAnyNotification === false) {
      throw new Error(ERROR.DL_Serverless_AllNotifiedError);
    }
  }
}

export const dependencies = {
  sendEmail: TYPES.MailAdapterSendEmail,
  sendSMS: TYPES.SMSAdapterSendSMS,
  createAlertPerson: TYPES.PersistanceAdapterCreateAlertPerson,
  getServices: TYPES.PersistanceAdapterGetServices,
  modifyService: TYPES.PersistanceAdapterModifyService,
};

export const DomainLogicNotifyPersonServerlessInjected: DomainLogicNotifyPerson = bindDependencies(
  DomainLogicNotifyPersonServerless,
  dependencies,
);
