import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssignmentGuestComponent } from "./assignment-guest/assignment-guest.component";
import { TestGuestComponent } from "./test-guest/test-guest.component";
import { Routes, RouterModule } from "@angular/router";
import { AllAssignmentTestModule } from "../../../shared-component/all-assignment-test/all-assignment-test.module";

const route: Routes = [
  {
    path: "Assignment",
    component: AssignmentGuestComponent,
    data: {breadcrumb: ""}
  },
  {
    path: "Test",
    component: TestGuestComponent,
    data: {breadcrumb: ""}

  }
];

@NgModule({
  imports: [CommonModule, AllAssignmentTestModule, RouterModule.forChild(route)],
  declarations: [AssignmentGuestComponent, TestGuestComponent]
})
export class AssignTestGuestModule {}
