import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { PipesModule } from "../../../theme/pipes/pipes.module";
import { NgxPaginationModule } from "ngx-pagination";
import { UserGridComponent } from "./user-grid/user-grid.component";
import { ReportsComponent } from "./reports/reports.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { BarRatingModule } from "ngx-bar-rating";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { UserDialogComponent } from "./user-dialog/user-dialog.component";
import { ReportAnalyticsModule } from "../../../shared-component/report-analytics/report-analytics.module";
import { MoreInfoParentComponent } from "./more-info-parent/more-info-parent.component";
import { ReportsStudentComponent } from "./reports-student/reports-student.component";
import { AllEclassesModule } from "../../../shared-component/all-eclasses/all-eclasses.module";
import { MoreInfoReportComponent } from "./more-info-report/more-info-report.component";
import { StudentMyclassModule } from "../../student/student-myclass/student-myclass.module";

const routes: Routes = [
  { path: "Studentreport", component: ReportsStudentComponent, data: { breadcrumb: "" } },
  { path: "analytics", component: AnalyticsComponent, data: { breadcrumb: "" } },
  { path: "report", component: ReportsComponent, data: { breadcrumb: "" } },
  { path: "Grid", component: UserGridComponent, data: { breadcrumb: "" } },
  { path: "", component: UserListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    PipesModule,
    NgxPaginationModule,
    BarRatingModule,
    NgCircleProgressModule,
    NgxChartsModule,
    ReactiveFormsModule,
    ReportAnalyticsModule,
    StudentMyclassModule,
    AllEclassesModule
  ],
  declarations: [
    UserListComponent,
    UserGridComponent,
    ReportsComponent,
    AnalyticsComponent,
    UserDialogComponent,
    MoreInfoParentComponent,
    ReportsStudentComponent,
    MoreInfoReportComponent
  ],
  entryComponents: [UserDialogComponent, MoreInfoParentComponent, MoreInfoReportComponent]
})
export class UsersModule {}
