import { DomainLogicReceiveTimeout, HandlerFunctionIdentifier } from '@interfaces/DomainLogic';
import bindDependencies from '@inyection/bindDependencies';
import { DomainLogicCheckAlertServerlessInjected } from './DomainLogicCheckAlertServerless';
import { FunctionsToReceive } from './FunctionsToReceive';

// Maybe this should me moved to TimerAdapter?
export const DomainLogicReceiveTimeoutServerless = async function DomainLogicReceiveTimeoutServerless(
  _injections: any,
  { functionIdentifier, params = [] }: {
    functionIdentifier: HandlerFunctionIdentifier,
    params?: any[]
  },
) {
  console.info(`Received Timeout for ${functionIdentifier}.`);
  switch (functionIdentifier) {
    case FunctionsToReceive.CheckAlertStatus:
      // eslint-disable-next-line prefer-spread
      await DomainLogicCheckAlertServerlessInjected.apply(null, params as unknown as any);
      break;

    default:
      console.error('Receive timeout unexpected', functionIdentifier);
      break;
  }
};

export const DomainLogicReceiveTimeoutServerlessInjected: DomainLogicReceiveTimeout = bindDependencies(
  DomainLogicReceiveTimeoutServerless,
  {},
);
