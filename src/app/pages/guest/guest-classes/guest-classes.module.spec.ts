import { GuestClassesModule } from './guest-classes.module';

describe('GuestClassesModule', () => {
  let guestClassesModule: GuestClassesModule;

  beforeEach(() => {
    guestClassesModule = new GuestClassesModule();
  });

  it('should create an instance', () => {
    expect(guestClassesModule).toBeTruthy();
  });
});
