import { StudentDashboardModule } from './student-dashboard.module';

describe('StudentDashboardModule', () => {
  let studentDashboardModule: StudentDashboardModule;

  beforeEach(() => {
    studentDashboardModule = new StudentDashboardModule();
  });

  it('should create an instance', () => {
    expect(studentDashboardModule).toBeTruthy();
  });
});
