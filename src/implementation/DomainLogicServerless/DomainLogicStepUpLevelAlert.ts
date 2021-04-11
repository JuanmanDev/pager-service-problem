/* eslint-disable no-param-reassign */
import {
  EscalationPolicy, Alert, Service, DomainLogicStepUpLevelAlert, DomainLogicNotifyPerson,
} from '@interfaces/DomainLogic';
import {
  ModifyAlertIfNotClosed, GetAlert, ModifyAlert,
} from '@interfaces/PersistanceAdapter';
import { CreateTimer } from '@interfaces/TimerAdapter';
import bindDependencies from '@inyection/bindDependencies';
import TYPES from '@inyection/types';
import { FunctionsToReceive } from './FunctionsToReceive';

export default async function DomainLogicServerlessStepUpLevelAlert(
  {
    createTimer,
    modifyAlert,
    modifyAlertIfNotClosed,
    getAlert,
    notifyPerson,
    stepUpAlert,
  }: {
    createTimer: CreateTimer,
    modifyAlert: ModifyAlert,
    modifyAlertIfNotClosed: ModifyAlertIfNotClosed,
    getAlert: GetAlert,
    notifyPerson: DomainLogicNotifyPerson,
    stepUpAlert: DomainLogicStepUpLevelAlert,
  },
  escalationPolicy: EscalationPolicy,
  alert: Alert,
  service: Service,
  description: String,
) {
  const levelsSorted = Object.keys(escalationPolicy.PersonsLevels)
    .map((x) => Number(x))
    .filter((l) => l > alert.Level)
    .sort();

  if (levelsSorted.length === 0) {
    console.warn('All levels has been notified, exiting.');
    // TODO: Wanna notify again all the escalation policy? start editing here.
    return;
  }

  const currentLevelToNotify: number = levelsSorted[0] as number;

  alert.Level = currentLevelToNotify;
  if (!await modifyAlertIfNotClosed(alert)) {
    alert = await getAlert(alert.Id);
    alert.Level = currentLevelToNotify;
    modifyAlert(alert);
    return;
  }

  const currentPersonsToNotify = escalationPolicy.PersonsLevels[currentLevelToNotify];
  const sendNotificaionsResult = await Promise.allSettled(currentPersonsToNotify.map(
    (p) => notifyPerson(p, service.Name, description, currentLevelToNotify, alert),
  ));

  if (sendNotificaionsResult.every((r) => r.status === 'rejected')) {
    console.error('All the notificacions have failed. Scaling up inmediatly.');
    await stepUpAlert(
      escalationPolicy,
      alert,
      service,
      description,
    );

    return;
  }

  // All notifications fine, lets build a timer to upcale the level
  const timerIdentifier = await createTimer({
    functionIdentifier: FunctionsToReceive.CheckAlertStatus,
    timeSpanMillisecons: 15 * 60 * 1000, // 15 min should be a variable from the alert? process.env?
    params: [{ serviceIdentifier: service.Id, alertIdentifier: alert.Id }],
  });

  alert.ScaledTime[alert.ScaledTime.length - 1][1] = timerIdentifier;
  if (!await modifyAlertIfNotClosed(alert)) {
    alert = await getAlert(alert.Id);
    alert.Level = currentLevelToNotify;
    modifyAlert(alert);
    // TODO: Cancel timer
  }
}

export const DomainLogicServerlessStepUpLevelAlertInjected: DomainLogicStepUpLevelAlert = bindDependencies(
  DomainLogicServerlessStepUpLevelAlert,
  {
    createTimer: TYPES.TimerAdapterCreateTimerMock,
    modifyAlert: TYPES.PersistanceAdapterModifyAlert,
    modifyAlertIfNotClosed: TYPES.PersistanceAdapterModifyAlertIfNotClosed,
    getAlert: TYPES.PersistanceAdapterGetAlert,
    notifyPerson: TYPES.DomainLogicNotifyPerson,
    stepUpAlert: TYPES.DomainLogicStepUpLevelAlert,
  },
);
