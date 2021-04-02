import { DomainLogicReceiveTimeout } from '@interfaces/DomainLogic';
import { CreateTimer, CreateTimerInput } from '@interfaces/TimerAdapter';

import bindDependencies from '@inyection/bindDependencies';
import TYPES from '@inyection/types';

export const CreateTimerMock = async function CreateTimerMock(
  domainLogicReceiveTimeout: DomainLogicReceiveTimeout,
  data: CreateTimerInput,
) {
  const timerIdentifier = setTimeout(() => {
    domainLogicReceiveTimeout({
      funcitonIdentifier: data.functionIdentifier,
      params: data.params,
    });
  }, data.timeSpanMillisecons);

  return timerIdentifier.toString();
};

export const CreateTimerMockInjected: CreateTimer = bindDependencies(
  CreateTimerMock,
  [TYPES.DomainLogicReceiveTimeout],
);
