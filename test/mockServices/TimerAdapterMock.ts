import { DomainLogicReceiveTimeout } from '@interfaces/DomainLogic';
import { CreateTimer, CreateTimerInput } from '@interfaces/TimerAdapter';

import bindDependencies from '@inyection/bindDependencies';
import TYPES from '@inyection/types';

let timerSequence = 0;
const timers: NodeJS.Timeout[] = [];

export const CreateTimerMock = async function CreateTimerMock(
  {
    domainLogicReceiveTimeout,
  }: {
    domainLogicReceiveTimeout: DomainLogicReceiveTimeout,
  },
  data: CreateTimerInput,
) {
  const timerIdentifier = setTimeout(() => {
    domainLogicReceiveTimeout({
      functionIdentifier: data.functionIdentifier,
      params: data.params,
    });
  }, 20 * 1000);
  // }, data.timeSpanMillisecons);

  // eslint-disable-next-line no-plusplus
  const id = timerSequence++;
  timers[id] = timerIdentifier;

  return id;
};

export const CreateTimerMockInjected: CreateTimer = bindDependencies(
  CreateTimerMock,
  {
    domainLogicReceiveTimeout: TYPES.DomainLogicReceiveTimeout,
  },
);
