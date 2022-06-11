import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScheduleCalGuestComponent } from "./schedule-cal-guest/schedule-cal-guest.component";
import { Routes, RouterModule } from "@angular/router";
import { ScheduleModule } from "../../../shared-component/schedule/schedule.module";

export const route: Routes = [
  {
    path: "",
    component: ScheduleCalGuestComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(route), ScheduleModule],
  declarations: [ScheduleCalGuestComponent]
})
export class ScheduleGuestModule {}
