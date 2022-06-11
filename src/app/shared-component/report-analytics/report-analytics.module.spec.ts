import { ReportAnalyticsModule } from "./report-analytics.module";

describe("ReportAnalyticsModule", () => {
  let reportAnalyticsModule: ReportAnalyticsModule;

  beforeEach(() => {
    reportAnalyticsModule = new ReportAnalyticsModule();
  });

  it("should create an instance", () => {
    expect(reportAnalyticsModule).toBeTruthy();
  });
});
