import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardReportTeacherComponent } from "./dashboard-report-teacher/dashboard-report-teacher.component";
import { Routes, RouterModule } from "@angular/router";
import { ReportAnalyticsModule } from "../../../shared-component/report-analytics/report-analytics.module";

const route: Routes = [{
  path: "",
  component: DashboardReportTeacherComponent
}]

@NgModule({
  imports: [CommonModule, ReportAnalyticsModule, RouterModule.forChild(route)],
  declarations: [DashboardReportTeacherComponent]
})
export class DashboardTeacherModule {}
