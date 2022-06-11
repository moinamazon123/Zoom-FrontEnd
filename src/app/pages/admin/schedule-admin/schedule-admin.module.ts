import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SheduleForAdminComponent } from "./shedule-for-admin/shedule-for-admin.component";
import { Routes } from "@angular/router";
import { ScheduleModule } from "../../../shared-component/schedule/schedule.module";

export const routes: Routes = [
  {
    path: "",
    component: SheduleForAdminComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule, ScheduleModule],
  declarations: [SheduleForAdminComponent]
})
export class ScheduleAdminModule {}
