import { ParentSubscriptionModule } from './parent-subscription.module';

describe('ParentSubscriptionModule', () => {
  let parentSubscriptionModule: ParentSubscriptionModule;

  beforeEach(() => {
    parentSubscriptionModule = new ParentSubscriptionModule();
  });

  it('should create an instance', () => {
    expect(parentSubscriptionModule).toBeTruthy();
  });
});
