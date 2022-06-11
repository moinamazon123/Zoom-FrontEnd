import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListOfStudentComponent } from "./list-of-student/list-of-student.component";
import { AddStudentComponent } from "./add-student/add-student.component";
import { ViewReportStudentComponent } from "./view-report-student/view-report-student.component";
import { ViewAnalyticsStudentComponent } from "./view-analytics-student/view-analytics-student.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { StudentMyclassModule } from "../../student/student-myclass/student-myclass.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AllEclassesModule } from "../../../shared-component/all-eclasses/all-eclasses.module";
import { NgCircleProgressModule } from "ng-circle-progress";
import { ReportAnalyticsModule } from "../../../shared-component/report-analytics/report-analytics.module";
import { MoreInfoDialogComponent } from "./more-info-dialog/more-info-dialog.component";

export const route: Routes = [
  {
    path: "",
    component: ListOfStudentComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "addStudent",
    component: AddStudentComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "viewStudentReport",
    component: ViewReportStudentComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "viewStudentAnalytics",
    component: ViewAnalyticsStudentComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule,StudentMyclassModule, SharedModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(route), AllEclassesModule, NgCircleProgressModule, ReportAnalyticsModule],
  declarations: [ListOfStudentComponent, AddStudentComponent, ViewReportStudentComponent, ViewAnalyticsStudentComponent, MoreInfoDialogComponent],
  entryComponents: [AddStudentComponent, MoreInfoDialogComponent]
})

export class ManageStudentModule {}
