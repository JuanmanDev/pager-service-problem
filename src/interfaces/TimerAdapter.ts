import { HandlerFunctionIdentifier } from './DomainLogic';

export interface CreateTimerInput {
  functionIdentifier: HandlerFunctionIdentifier;
  params?: any[];
  timeSpanMillisecons: number;
}

export type CreateTimer = (data: CreateTimerInput) => Promise<String>;
