import { EscalationPolicy } from "./DomainLogic";


export type GetEscalationPolicy = (escalationPolicyIdentifier: string) => Promise<EscalationPolicy>;


