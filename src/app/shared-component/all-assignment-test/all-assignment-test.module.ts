import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssignmentsTestsComponent } from "./assignments-tests/assignments-tests.component";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogAssignmentTestComponent } from "./dialog-assignment-test/dialog-assignment-test.component";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { TakeAssignmentTestComponent } from "./take-assignment-test/take-assignment-test.component";
import { ViewReportComponent } from "./view-report/view-report.component";
import { NgCircleProgressModule } from "ng-circle-progress";
import { TakeAssignmentComponent } from "./take-assignment/take-assignment.component";
import { TestResultComponent } from "./test-result/test-result.component";

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, NgxMaterialTimepickerModule, NgCircleProgressModule],
  declarations: [
    AssignmentsTestsComponent,
    DialogAssignmentTestComponent,
    TakeAssignmentTestComponent,
    ViewReportComponent,
    TakeAssignmentComponent,
    TestResultComponent
  ],
  exports: [AssignmentsTestsComponent, ViewReportComponent, TakeAssignmentTestComponent, TakeAssignmentComponent],
  entryComponents: [DialogAssignmentTestComponent, TestResultComponent]
})
export class AllAssignmentTestModule {}
