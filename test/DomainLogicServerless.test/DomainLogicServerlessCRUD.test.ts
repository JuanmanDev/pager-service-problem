import { container } from '@inyection/inversify.config';
import {
  DomainLogicCreateService, DomainLogicDeleteService, DomainLogicGetServices, DomainLogicModifyService,
} from '@interfaces/DomainLogic';
import TYPES from '@inyection/types';

import { DomainLogicContainerModule } from '@inyection/containers/DomainLogic';
import { PersistanceAdapterMockContainerModule } from '../containers/PersistanceAdapterMock';

describe('test CRUD Service', () => {
  beforeAll(() => {
    container.load(PersistanceAdapterMockContainerModule);
    container.load(DomainLogicContainerModule);
  });

  it('should create a new Service', async () => {
    const domainLogicCreateService = container.get<DomainLogicCreateService>(TYPES.DomainLogicCreateService);
    await domainLogicCreateService({
      EscalationPolicy: {
        Id: '123',
        Name: 'test',
        PersonsLevels: {},
      },
      Name: 'Test from jest',
    });
  });

  it('should modify a Service', async () => {
    const domainLogicModifyService = container.get<DomainLogicModifyService>(TYPES.DomainLogicModifyService);
    await domainLogicModifyService({
      Id: '123-456-789',
      EscalationPolicy: {
        Id: '123',
        Name: 'test modified',
        PersonsLevels: {},
      },
      Name: 'Test from jest modified',
    });
  });

  it('should delete a Service', async () => {
    const domainLogicDeleteService = container.get<DomainLogicDeleteService>(TYPES.DomainLogicDeleteService);
    await domainLogicDeleteService({
      Id: '123-456-789',
      EscalationPolicy: {
        Id: '123',
        Name: 'test modified',
        PersonsLevels: {},
      },
      Name: 'Test from jest modified',
    });
  });

  it('should get Services', async () => {
    const domainLogicGetServices = container.get<DomainLogicGetServices>(TYPES.DomainLogicGetServices);
    const result = await domainLogicGetServices();
    expect(Array.isArray(result)).toBe(true);
  });
});
