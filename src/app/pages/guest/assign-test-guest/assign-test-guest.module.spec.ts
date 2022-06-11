import { AssignTestGuestModule } from './assign-test-guest.module';

describe('AssignTestGuestModule', () => {
  let assignTestGuestModule: AssignTestGuestModule;

  beforeEach(() => {
    assignTestGuestModule = new AssignTestGuestModule();
  });

  it('should create an instance', () => {
    expect(assignTestGuestModule).toBeTruthy();
  });
});
