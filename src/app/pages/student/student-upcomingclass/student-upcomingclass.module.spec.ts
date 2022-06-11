import { StudentUpcomingclassModule } from './student-upcomingclass.module';

describe('StudentUpcomingclassModule', () => {
  let studentUpcomingclassModule: StudentUpcomingclassModule;

  beforeEach(() => {
    studentUpcomingclassModule = new StudentUpcomingclassModule();
  });

  it('should create an instance', () => {
    expect(studentUpcomingclassModule).toBeTruthy();
  });
});
