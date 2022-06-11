import { ScheduleAdminModule } from "./schedule-admin.module";

describe("ScheduleAdminModule", () => {
  let scheduleAdminModule: ScheduleAdminModule;

  beforeEach(() => {
    scheduleAdminModule = new ScheduleAdminModule();
  });

  it("should create an instance", () => {
    expect(scheduleAdminModule).toBeTruthy();
  });
});
