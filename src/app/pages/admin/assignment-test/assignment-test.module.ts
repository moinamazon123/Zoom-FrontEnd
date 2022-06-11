import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";

import { AssignmentComponent } from "./assignment/assignment.component";
import { TestComponent } from "./test/test.component";
import { AllAssignmentTestModule } from "../../../shared-component/all-assignment-test/all-assignment-test.module";
import { ViewTestReportAdminComponent } from "./view-test-report-admin/view-test-report-admin.component";
import { PracticeAssignAdminComponent } from "./practice-assign-admin/practice-assign-admin.component";


const route: Routes = [
  {
    path: "Assignment",
    component: AssignmentComponent,
    data: { breadcrumb: "Assignment" }
  },
  {
    path: "Test",
    component: TestComponent,
    data: { breadcrumb: "Test" }
  },
  {
    path: "viewTestReport/:id/:title",
    component: ViewTestReportAdminComponent,
    data: { breadcrumb: "view test report" }
  },
  {
    path: "assignmentPractice/:id",
    component: PracticeAssignAdminComponent,
    data: { breadcrumb: "Practice Assignment" }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(route), FormsModule, SharedModule, AllAssignmentTestModule],
  declarations: [AssignmentComponent, TestComponent, ViewTestReportAdminComponent, PracticeAssignAdminComponent]
})
export class AssignmentTestModule {}
