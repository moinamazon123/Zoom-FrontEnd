import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoParentRecordedComponent } from "./demo-parent-recorded/demo-parent-recorded.component";
import { DemoParentRecordedListComponent } from "./demo-parent-recorded-list/demo-parent-recorded-list.component";
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { DemoParentUpcomingComponent } from "./demo-parent-upcoming/demo-parent-upcoming.component";
import { DemoClassesModule } from "../../../shared-component/demo-classes/demo-classes.module";

const routes: Routes = [
  {
    path: "RecordedGrid",
    component: DemoParentRecordedComponent,
    data: {breadcrumb: "Recorded Grid"}
  },
  {
    path: "RecordedList",
    component: DemoParentRecordedListComponent,
    data: {breadcrumb: "Recorded List"}
  },
  {
    path: "UpcomingClass",
    component: DemoParentUpcomingComponent,
    data: {breadcrumb: "Upcoming Class"}

  }
];

@NgModule({
  declarations: [DemoParentRecordedComponent,DemoParentUpcomingComponent , DemoParentRecordedListComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, DemoClassesModule, RouterModule.forChild(routes)]
})
export class DemoParentModule {}
