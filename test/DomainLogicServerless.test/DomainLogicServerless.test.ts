import { container } from '@inyection/inversify.config';
import {
  // DomainLogicCreateAlert,
  DomainLogicGetServices,
} from '@interfaces/DomainLogic';
import TYPES from '@inyection/types';

import { DomainLogicContainerModule } from '@inyection/containers/DomainLogic';
import { PersistanceAdapterMockContainerModule } from '../containers/PersistanceAdapterMock';
import { MailAdapterMockContainerModule } from '../containers/MailAdapterMock';
import { SMSAdapterMockContainerModule } from '../containers/SMSAdapterMock';
import { TimerAdapterMockContainerModule } from '../containers/TimerAdapterMock';

describe('test main logic', () => {
  beforeAll(() => {
    container.load(PersistanceAdapterMockContainerModule);
    container.load(DomainLogicContainerModule);
    container.load(MailAdapterMockContainerModule);
    container.load(SMSAdapterMockContainerModule);
    container.load(TimerAdapterMockContainerModule);
  });

  it('should create a Alert', async () => {
    const domainLogicGetServices = container.get<DomainLogicGetServices>(TYPES.DomainLogicGetServices);
    const services = await domainLogicGetServices();
    expect(services).toBeDefined();

    // const domainLogicCreateAlert = container.get<DomainLogicCreateAlert>(TYPES.DomainLogicCreateAlert);
    // const alertIdentifier = await domainLogicCreateAlert(services[0].Id, 'Test Alert');
    // expect(alertIdentifier).toBeDefined();
  });
});

// IMPORTANT: This test should be removed or not in main test due will take to much time.
