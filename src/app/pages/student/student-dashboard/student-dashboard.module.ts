import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentReportDashboardComponent } from "./student-report-dashboard/student-report-dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { ReportAnalyticsModule } from "../../../shared-component/report-analytics/report-analytics.module";

export const route: Routes = [
  {
    path: "",
    component: StudentReportDashboardComponent,
    data: { breadcrumb: "Dashboard" }
  }
];

@NgModule({
  imports: [CommonModule, ReportAnalyticsModule, RouterModule.forChild(route)],
  declarations: [StudentReportDashboardComponent]
})
export class StudentDashboardModule {}
