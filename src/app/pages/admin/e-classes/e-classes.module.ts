import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordedListComponent } from "./recorded-list/recorded-list.component";
import { RecordedGridComponent } from "./recorded-grid/recorded-grid.component";
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { BarRatingModule } from "ngx-bar-rating";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UpcomingGridComponent } from "./upcoming-grid/upcoming-grid.component";
import { AttendeesComponent } from "./attendees/attendees.component";
import { ViewersComponent } from "./viewers/viewers.component";
import { AllEclassesModule } from "../../../shared-component/all-eclasses/all-eclasses.module";


 const route: Routes = [
  {
    path: "recorded",
    component: RecordedGridComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "recordedList",
    component: RecordedListComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "upcomingClass",
    component: UpcomingGridComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "viewers/:id/:title",
    component: ViewersComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "attendees/:id/:title",
    component: AttendeesComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(route), BarRatingModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, AllEclassesModule],
  declarations: [RecordedListComponent, RecordedGridComponent, UpcomingGridComponent, AttendeesComponent, ViewersComponent]
})
export class EClassesModule {}
