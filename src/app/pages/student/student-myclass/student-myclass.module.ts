import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentRecordedlistComponent } from "./student-recordedlist/student-recordedlist.component";
import { StudentRecordedgridComponent } from "./student-recordedgrid/student-recordedgrid.component";
import { StudentMissedclasslistComponent } from "./student-missedclasslist/student-missedclasslist.component";
import { StudentIncompletedclassComponent } from "./student-incompletedclass/student-incompletedclass.component";
import { StudentCompletedComponent } from "./student-completed/student-completed.component";
import { Routes, RouterModule } from "@angular/router";
import { AllEclassesModule } from "../../../shared-component/all-eclasses/all-eclasses.module";
import { SharedModule } from "../../../shared/shared.module";
import { NgCircleProgressModule } from "ng-circle-progress";
import { IncompletedClassComponent } from "../../../shared-component/all-eclasses/incompleted-class/incompleted-class.component";
import { MoreInfoStudentComponent } from "./more-info-student/more-info-student.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export const route: Routes = [
  {
    path: "recordedClass",
    component: StudentRecordedlistComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "recordedClassGrid",
    component: StudentRecordedgridComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "missedClass",
    component: StudentMissedclasslistComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "incompletedClass",
    component: StudentIncompletedclassComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "completedClass",
    component: StudentCompletedComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule, AllEclassesModule, RouterModule.forChild(route), SharedModule, NgCircleProgressModule,FormsModule, ReactiveFormsModule],
  declarations: [
    StudentRecordedlistComponent,
    StudentRecordedgridComponent,
    StudentMissedclasslistComponent,
    StudentIncompletedclassComponent,
    StudentCompletedComponent,
    MoreInfoStudentComponent
  ],
  exports: [
    StudentRecordedlistComponent,
    StudentRecordedgridComponent,
    StudentMissedclasslistComponent,
    StudentIncompletedclassComponent,
    StudentCompletedComponent,
    MoreInfoStudentComponent
  ],
  entryComponents: [MoreInfoStudentComponent]
})
export class StudentMyclassModule {}
