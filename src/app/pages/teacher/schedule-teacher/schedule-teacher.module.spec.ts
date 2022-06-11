import { ScheduleTeacherModule } from './schedule-teacher.module';

describe('ScheduleTeacherModule', () => {
  let scheduleTeacherModule: ScheduleTeacherModule;

  beforeEach(() => {
    scheduleTeacherModule = new ScheduleTeacherModule();
  });

  it('should create an instance', () => {
    expect(scheduleTeacherModule).toBeTruthy();
  });
});
