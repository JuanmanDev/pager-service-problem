import { DomainLogicCheckAlert } from '@interfaces/DomainLogic';
import { GetAlert } from '@interfaces/PersistanceAdapter';
import bindDependencies from '@inyection/bindDependencies';
import TYPES from '@inyection/types';
import { StepUpLevelAlertInjected } from './StepUpLevelAlert';

export const DomainLogicCheckAlertServerless = async function DomainLogicCheckAlertServerless(
  {
    getAlert,
  }: {
    getAlert: GetAlert,
  },
  { alertIdentifier }: {
    serviceIdentifier: String,
    alertIdentifier: String
  },
) {
  console.info(`Scaling up alert with identifier: ${alertIdentifier}.`);
  const alert = await getAlert(alertIdentifier);

  if (alert.ClosedTime) {
    console.info(`Alert with identifier: ${alertIdentifier} has been already closed.`);
    return;
  }

  const escalationPolicy = alert.Service.EscalationPolicy;

  StepUpLevelAlertInjected(escalationPolicy, alert, alert.Service, alert.Description);
};
export const DomainLogicCheckAlertServerlessInjected: DomainLogicCheckAlert = bindDependencies(
  DomainLogicCheckAlertServerless,
  { getAlert: TYPES.PersistanceAdapterGetAlert },
);
