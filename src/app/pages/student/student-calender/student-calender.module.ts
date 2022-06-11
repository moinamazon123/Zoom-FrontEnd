import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentScheduleComponent } from "./student-schedule/student-schedule.component";
import { Routes, RouterModule } from "@angular/router";
import { ScheduleModule } from "../../../shared-component/schedule/schedule.module";

export const route: Routes = [
  {
    path: "",
    component: StudentScheduleComponent
  }
];

@NgModule({
  imports: [CommonModule, ScheduleModule, RouterModule.forChild(route)],
  declarations: [StudentScheduleComponent]
})
export class StudentCalenderModule {}
