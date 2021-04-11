import { CreateTimer } from '@interfaces/TimerAdapter';

import bindDependencies from '@inyection/bindDependencies';

let timerSequence = 0;

export const CreateTimerFalseMock = async function CreateTimerFalseMock(
  // _injections,
) {
  timerSequence += 1;
  return timerSequence;
};

export const CreateTimerFalseMockInjected: CreateTimer = bindDependencies(
  CreateTimerFalseMock,
  {
  },
);
