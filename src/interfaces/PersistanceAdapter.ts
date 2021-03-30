

import { Service, AlertPerson } from "./DomainLogic";

export type CreateService = (service: Omit<Service, "Id">) => Promise<Service>;
export type GetServices   = (filter: ({ id?: String, name?: String })) => Promise<Service[] | null>;
export type ModifyService = (service: Service) => Promise<Service>;
export type DeleteService = (Service: Service) => Promise<Boolean>;

export type CreateAlertPerson = (alertPerson: Omit<AlertPerson, "Id">) => Promise<AlertPerson>;

