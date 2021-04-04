enum ERROR {
  DL_Serverless_ServiceNotFound = 'DL_Serverless_ServiceNotFound',
  DL_Serverless_ServiceAmbiguous = 'DL_Serverless_ServiceAmbiguous',
  DL_Serverless_ServiceWithoutEscalationPolicy = 'DL_Serverless_ServiceWithoutEscalationPolicy',
  DL_Serverless_EscalationPolicyWithoutPersons = 'DL_Serverless_EscalationPolicyWithoutPersons',
  DL_Serverless_AlertAlreadyClosed = 'DL_Serverless_AlertAlreadyClosed',
  DL_Serverless_AlertNotFound = 'DL_Serverless_AlertNotFound',
  DL_Serverless_EscalationPolicyPersonWithoutContactData = 'DL_Serverless_EscalationPolicyPersonWithoutContactData',
}

const ErrorDescription = Object.freeze({
  [ERROR.DL_Serverless_ServiceNotFound]: 'The service has not been found',
  [ERROR.DL_Serverless_ServiceAmbiguous]: 'The service filter is not unique',
  [ERROR.DL_Serverless_ServiceWithoutEscalationPolicy]: 'The service do not have a Escaltion Policy',
  [ERROR.DL_Serverless_EscalationPolicyWithoutPersons]: 'The service do not have persons to notify',

  [ERROR.DL_Serverless_AlertNotFound]: 'Alert identifier not correspond to any alert',
  [ERROR.DL_Serverless_EscalationPolicyPersonWithoutContactData]: 'Person does not have any contact information',
});

export default ERROR;
export { ErrorDescription };
