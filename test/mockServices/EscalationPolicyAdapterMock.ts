import { EscalationPolicy, Person } from '@interfaces/DomainLogic';
import { GetEscalationPolicy } from '@interfaces/EscalationPolicyAdapter';

export const person1: Person = {
  Name: 'Juan Manuel Béc',
  Email: 'Juanmabs22@test.test',
  Id: '1',
  SMSNumber: '+34679679679',
};
export const person2: Person = {
  Name: 'Marisa',
  Email: 'marisa@test.test',
  Id: '2',
  // SMSNumber: '',
};
export const person3: Person = {
  Name: 'three',
  // Email: 'three@test.test',
  Id: '3',
  SMSNumber: '+34333333',
};
export const person4: Person = {
  Name: 'Four',
  Email: 'four@test.test',
  Id: '4',
  SMSNumber: '+34777555444',
};
export const person5: Person = {
  Name: 'Five!',
  Email: '',
  Id: '5',
  SMSNumber: '',
};

export const escalationPolicyMocked: EscalationPolicy = {
  Id: '123',
  Name: 'Mock Escalation Policy',
  PersonsLevels: {
    1: [person1],
    2: [person2],
    3: [person3, person4],
    5: [person5],
    4: [person1],
  },
};

const GetEscalationPolicyMock: GetEscalationPolicy = async function GetEscalationPolicyMock() {
  return escalationPolicyMocked;
};

export { GetEscalationPolicyMock };
