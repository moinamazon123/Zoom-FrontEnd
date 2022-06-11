import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ScheduleForTeacherComponent } from "./schedule-for-teacher/schedule-for-teacher.component";
import { ScheduleModule } from "../../../shared-component/schedule/schedule.module";

export const route: Routes = [
  {
    path: "",
    component: ScheduleForTeacherComponent
  }
];

@NgModule({
  imports: [CommonModule, ScheduleModule, RouterModule.forChild(route)],
  declarations: [ScheduleForTeacherComponent]
})
export class ScheduleTeacherModule {}
