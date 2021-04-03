enum ERROR {
  DL_Serverless_ServiceNotFound = 'DL_Serverless_ServiceNotFound',
  DL_Serverless_ServiceAmbiguous = 'DL_Serverless_ServiceAmbiguous',
}

const ErrorDescription = Object.freeze({
  [ERROR.DL_Serverless_ServiceNotFound]: 'The service has not been found',
  [ERROR.DL_Serverless_ServiceAmbiguous]: 'The service filter is not unique',
});

export default ERROR;
export { ErrorDescription };
