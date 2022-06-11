import { DashboardTeacherModule } from './dashboard-teacher.module';

describe('DashboardTeacherModule', () => {
  let dashboardTeacherModule: DashboardTeacherModule;

  beforeEach(() => {
    dashboardTeacherModule = new DashboardTeacherModule();
  });

  it('should create an instance', () => {
    expect(dashboardTeacherModule).toBeTruthy();
  });
});
