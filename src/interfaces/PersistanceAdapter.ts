import { Service, AlertPerson, Alert } from './DomainLogic';

export type CreateService = (service: Omit<Service, 'Id'>) => Promise<Service>;
export type GetServices = (filter?: ({ id?: String, name?: String })) => Promise<Service[] | null>;
export type ModifyService = (service: Service) => Promise<Service>;
export type DeleteService = (Service: Service) => Promise<void>;

export type CreateAlertPerson = (alertPerson: AlertPerson) => Promise<AlertPerson>;
export type GetAlertPerson = (alertPersonIdentifier: String) => Promise<AlertPerson>;

export type GetAlert = (alertId: String) => Promise<Alert>;
export type CreateAlert = (alert: Alert) => Promise<Alert>;
export type ModifyAlert = (aler: Alert) => Promise<Alert>;

// Only modify the alert if the Alet.ClosedTime is not defined.
export type ModifyAlertIfNotClosed = (alert: Alert) => Promise<boolean>;
