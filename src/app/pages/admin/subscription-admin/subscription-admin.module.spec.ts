import { SubscriptionAdminModule } from './subscription-admin.module';

describe('SubscriptionAdminModule', () => {
  let subscriptionAdminModule: SubscriptionAdminModule;

  beforeEach(() => {
    subscriptionAdminModule = new SubscriptionAdminModule();
  });

  it('should create an instance', () => {
    expect(subscriptionAdminModule).toBeTruthy();
  });
});
