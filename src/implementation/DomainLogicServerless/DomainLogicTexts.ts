export interface DataToNotify {
  name: String;
  serviceName: String;
  description?: String;
  alertIdentifier?: String;
}

export const getTemplateEmailFilled = async function getTemplateEmailFiled({
  name,
  serviceName,
  description = '',
  alertIdentifier,
}: DataToNotify) {
  return `
  Dear ${name},
  There is a problem on the service ${serviceName}.
  
  ${description}

  Please fix it as soon as posible.

  Check the all data in:
  https://todo.url/receiveAlert/${alertIdentifier}
  `;
};

export const getTemplateSMSFilled = async function getTemplateSMSFiled({
  serviceName,
}: DataToNotify) {
  return `PROBLEM ${serviceName}`.substring(0, 160);
};
