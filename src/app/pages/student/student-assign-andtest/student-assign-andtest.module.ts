import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentAssignmentComponent } from "./student-assignment/student-assignment.component";
import { StudentTestComponent } from "./student-test/student-test.component";
import { PracticeAssignmentComponent } from "./practice-assignment/practice-assignment.component";
import { TakeTestStudentComponent } from "./take-test-student/take-test-student.component";
import { Routes, RouterModule } from "@angular/router";
import { AllAssignmentTestModule } from "../../../shared-component/all-assignment-test/all-assignment-test.module";

export const routes: Routes = [
  {
    path: "Assignment",
    component: StudentAssignmentComponent,
    data: {breadcrumb: "Assignment"}
  },
  {
    path: "Test",
    component: StudentTestComponent,
    data: {breadcrumb: "Test"}

  },
  {
    path: "practiceAssignment/:id",
    component: PracticeAssignmentComponent,
    data: {breadcrumb: "practice Assignment"}

  },
  {
    path: "takeTest/:id",
    component: TakeTestStudentComponent,
    data: {breadcrumb: "takeTest"}

  }
];

@NgModule({
  imports: [CommonModule, AllAssignmentTestModule, RouterModule.forChild(routes)],
  declarations: [StudentAssignmentComponent, StudentTestComponent, PracticeAssignmentComponent, TakeTestStudentComponent]
})
export class StudentAssignAndtestModule {}
