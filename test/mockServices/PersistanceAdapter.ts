import { Alert, AlertPerson, Service } from '@interfaces/DomainLogic';
import {
  CreateService,
  GetServices,
  ModifyService,
  DeleteService,
  CreateAlertPerson,
  CreateAlert,
  ModifyAlert,
  GetAlert,
  ModifyAlertIfNotClosed,
} from '@interfaces/PersistanceAdapter';

import { escalationPolicyMocked, person5 } from './EscalationPolicyAdapterMock';

export const ServiceMock: Service = {
  EscalationPolicy: escalationPolicyMocked,
  Id: '123',
  Name: 'Mocked Service',
};

export const AlertMock: Alert = {
  Id: '321-654-987',
  Description: 'Mock',
  Level: 0,
  ScaledTime: [[new Date(), 'Timers ID Mocked']],
  Service: ServiceMock,
};

export const AlertPersonMock: AlertPerson = {
  Alert: AlertMock,
  Channel: 'SMS',
  Date: new Date(),
  Id: '123-456-789',
  Person: person5,
  Level: 4,
};

export const CreateServiceMock: CreateService = async function CreateServiceMock() {
  return ServiceMock;
};
export const GetServicesMock: GetServices = async function GetServicesMock(filter) {
  if (filter && filter.id) {
    return [ServiceMock];
  }
  return [ServiceMock, ServiceMock];
};
export const ModifyServiceMock: ModifyService = async function ModifyServiceMock() {
  return ServiceMock;
};
export const DeleteServiceMock: DeleteService = async function DeleteServiceMock() {
  console.log('Deleted');
};

export const CreateAlertPersonMock: CreateAlertPerson = async function CreateAlertPersonMock() {
  return AlertPersonMock;
};

export const GetAlertMock: GetAlert = async function GetAlertMock() {
  return AlertMock;
};
export const CreateAlertMock: CreateAlert = async function CreateAlertMock() {
  return AlertMock;
};
export const ModifyAlertMock: ModifyAlert = async function ModifyAlertMock() {
  return AlertMock;
};
export const ModifyAlertIfNotClosedMock: ModifyAlertIfNotClosed = async function ModifyAlertIfNotClosedMock() {
  return true;
};

export const CreateServiceMockKO: CreateService = async function CreateServiceMockKO() {
  throw Error('Error connecting to DataBase');
};
export const GetServicesMockKO: GetServices = async function GetServicesMockKO() {
  throw Error('Error connecting to DataBase');
};
export const ModifyServiceMockKO: ModifyService = async function ModifyServiceMockKO() {
  throw Error('Error connecting to DataBase');
};
export const DeleteServiceMockKO: DeleteService = async function DeleteServiceMockKO() {
  throw Error('Error connecting to DataBase');
};

export const CreateAlertPersonMockKO: CreateAlertPerson = async function CreateAlertPersonMockKO() {
  throw Error('Error connecting to DataBase');
};
