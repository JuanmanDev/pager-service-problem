import { container } from '@inyection/inversify.config';
import { DomainLogicCreateService } from '@interfaces/DomainLogic';
import TYPES from '@inyection/types';
// import { DomainLogicContainerModule } from '@inyection/containers/DomainLogic';

import { DomainLogicContainerModule } from '@inyection/containers/DomainLogic';
import { PersistanceAdapterMockContainerModule } from './containers/PersistanceAdapterMock';

describe('test createService', () => {
  // let container: Container;

  beforeAll(() => {
    // container = new Container();
    // container.load(DomainLogicContainerModule);
    container.load(PersistanceAdapterMockContainerModule);
    container.load(DomainLogicContainerModule);
  });

  it('should work', async () => {
    // eslint-disable-next-line max-len
    const domainLogicCreateService: DomainLogicCreateService = container.get<DomainLogicCreateService>(TYPES.DomainLogicCreateService);
    domainLogicCreateService({
      EscalationPolicy: {
        Id: '123',
        Name: 'test',
        PersonsLevels: {},
      },
      Name: 'Test from jest',
    });
  });
});
