import {
  Alert, DomainLogicCreateAlert,
} from '@interfaces/DomainLogic';
import {
  CreateAlert, GetServices,
} from '@interfaces/PersistanceAdapter';
import bindDependencies from '@inyection/bindDependencies';

import TYPES from '@inyection/types';
import ERROR from '../Errors/DomainLogicServerless';
import { DomainLogicServerlessStepUpLevelAlertInjected } from './DomainLogicStepUpLevelAlert';

export const DomainLogicCreateAlertServerless = async function DomainLogicCreateAlertServerless(
  {
    getServices, createAlert,
  }: {
    getServices: GetServices,
    createAlert: CreateAlert,
  },
  serviceIdentifier: String,
  description: String,
) {
  console.info(`Received alert for identifier: ${serviceIdentifier} with description: ${description}.`);

  const servicesFound = await getServices({ id: serviceIdentifier });
  if (!servicesFound || servicesFound.length === 0) {
    throw new Error(ERROR.DL_Serverless_ServiceNotFound);
  } else if (servicesFound.length > 1) {
    throw new Error(ERROR.DL_Serverless_ServiceAmbiguous);
  }

  const service = servicesFound[0];
  if (!service.EscalationPolicy || !service.EscalationPolicy.Id) {
    throw new Error(ERROR.DL_Serverless_ServiceWithoutEscalationPolicy);
  }

  const escalationPolicy = service.EscalationPolicy;
  console.info(`Starting Escalation Policy with identifier: ${escalationPolicy.Id}.`);

  if (!escalationPolicy.PersonsLevels || (Object.keys(escalationPolicy.PersonsLevels).length === 0)) {
    throw new Error(ERROR.DL_Serverless_EscalationPolicyWithoutPersons);
  }

  // CREAR ALERTA
  let alert: Alert = {
    Id: (service.Name + Date.now().toString()),
    Service: service,
    Description: description,
    Level: Number.MIN_VALUE,
    ScaledTime: [[new Date(), '']],
  };

  alert = await createAlert(alert);

  // This could be no-awaited if we want a fast response.
  await DomainLogicServerlessStepUpLevelAlertInjected(escalationPolicy, alert, service, description);

  return alert.Id;
};
export const DomainLogicCreateAlertServerlessInjected: DomainLogicCreateAlert = bindDependencies(
  DomainLogicCreateAlertServerless,
  {
    getServices: TYPES.PersistanceAdapterGetServices,
    createAlert: TYPES.PersistanceAdapterCreateAlert,
  },
);
