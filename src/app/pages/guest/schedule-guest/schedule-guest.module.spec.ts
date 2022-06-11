import { ScheduleGuestModule } from './schedule-guest.module';

describe('ScheduleGuestModule', () => {
  let scheduleGuestModule: ScheduleGuestModule;

  beforeEach(() => {
    scheduleGuestModule = new ScheduleGuestModule();
  });

  it('should create an instance', () => {
    expect(scheduleGuestModule).toBeTruthy();
  });
});
