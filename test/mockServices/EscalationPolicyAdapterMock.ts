import { EscalationPolicy, Person } from '@interfaces/DomainLogic';

export const personWithEmailAndSMS1: Person = {
  Name: 'Juan Manuel Béc',
  Email: 'Juanmabs22@test.test',
  Id: '1',
  SMSNumber: '+34679679679',
};
export const personWithEmail2: Person = {
  Name: 'Marisa',
  Email: 'marisa@test.test',
  Id: '2',
  // SMSNumber: '',
};
export const personWithSMS3: Person = {
  Name: 'three',
  // Email: 'three@test.test',
  Id: '3',
  SMSNumber: '+34333333',
};
export const personWithEmailAndSMS4: Person = {
  Name: 'Four',
  Email: 'four@test.test',
  Id: '4',
  SMSNumber: '+34777555444',
};
export const personWithOUTEmailAndSMS5: Person = {
  Name: 'Five!',
  Email: '',
  Id: '5',
  SMSNumber: '',
};

export const escalationPolicyMocked: EscalationPolicy = {
  Id: '123',
  Name: 'Mock Escalation Policy',
  PersonsLevels: {
    1: [personWithEmailAndSMS1],
    2: [personWithEmail2],
    3: [personWithSMS3, personWithEmailAndSMS4],
    5: [personWithOUTEmailAndSMS5],
    4: [personWithEmailAndSMS1],
  },
};

const GetEscalationPolicyMock = async function GetEscalationPolicyMock() {
  return { ...escalationPolicyMocked };
};

export { GetEscalationPolicyMock };
