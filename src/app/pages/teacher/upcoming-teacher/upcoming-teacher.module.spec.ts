import { UpcomingTeacherModule } from './upcoming-teacher.module';

describe('UpcomingTeacherModule', () => {
  let upcomingTeacherModule: UpcomingTeacherModule;

  beforeEach(() => {
    upcomingTeacherModule = new UpcomingTeacherModule();
  });

  it('should create an instance', () => {
    expect(upcomingTeacherModule).toBeTruthy();
  });
});
