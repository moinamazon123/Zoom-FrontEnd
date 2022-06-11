import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UpcomingDemoComponent } from "./upcoming-demo/upcoming-demo.component";
import { RecordedDemoComponent } from "./recorded-demo/recorded-demo.component";
import { Routes, RouterModule } from "@angular/router";
import { DemoClassesModule } from "../../../shared-component/demo-classes/demo-classes.module";
import { RecordedGridGuestComponent } from "./recorded-grid-guest/recorded-grid-guest.component";
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
export const route: Routes = [
  {
    path: "",
    component: UpcomingDemoComponent,
    data: {breadcrumb: "UpcomingClass"}
  },
  {
    path: "recorded",
    component: RecordedDemoComponent,
    data: {breadcrumb: "RecordedClass"}
  },
  {
    path: "recordedGrid",
    component: RecordedGridGuestComponent,
    data: {breadcrumb: "RecordedClass"}
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(route), DemoClassesModule,SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [UpcomingDemoComponent, RecordedDemoComponent, RecordedGridGuestComponent]
})
export class DemoClassModule {}
