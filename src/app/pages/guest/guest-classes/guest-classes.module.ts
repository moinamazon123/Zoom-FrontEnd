import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GuestRecordedclassComponent } from "./guest-recordedclass/guest-recordedclass.component";
import { GuestUpcomingclassComponent } from "./guest-upcomingclass/guest-upcomingclass.component";
import { GuestRecordedclassListComponent } from "./guest-recordedclass-list/guest-recordedclass-list.component";
import { Routes, RouterModule } from "@angular/router";
import { AllEclassesModule } from "../../../shared-component/all-eclasses/all-eclasses.module";

export const route: Routes = [
  {
    path: "Upcoming",
    component: GuestUpcomingclassComponent,
    data: {breadcrumb: ""}
  },
  {
    path: "Recorded",
    component: GuestRecordedclassComponent,
    data: {breadcrumb: ""}
  },
  {
    path: "Recordedlist",
    component: GuestRecordedclassListComponent,
    data: {breadcrumb: ""}
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(route), AllEclassesModule],
  declarations: [GuestRecordedclassComponent, GuestUpcomingclassComponent, GuestRecordedclassListComponent]
})
export class GuestClassesModule {}
