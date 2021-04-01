import { DomainLogicReceiveTimeout } from '@interfaces/DomainLogic';
import { CreateTimer, CreateTimerInput } from '@interfaces/TimerAdapter';

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

// TODO: Inject this!
const a: DomainLogicReceiveTimeout = async () => {};

export const CreateTimerMockInjected: CreateTimer = CreateTimerMock.bind(CreateTimerMock, a);
