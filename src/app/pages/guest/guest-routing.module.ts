import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "app/pages/guest/demo-class/demo-class.module#DemoClassModule",
    data: { breadcrumb: "Classes" }
  },
  {
    path: "Member",
    loadChildren: "app/pages/guest/guest-classes/guest-classes.module#GuestClassesModule",
    data: { breadcrumb: "Members Classes" }
  },
  {
    path: "Assignment&Test",
    loadChildren: "app/pages/guest/assign-test-guest/assign-test-guest.module#AssignTestGuestModule",
    data: { breadcrumb: "Members Assignment and Test" }
  },
  {
    path: "Schedule",
    loadChildren: "app/pages/guest/schedule-guest/schedule-guest.module#ScheduleGuestModule",
    data: { breadcrumb: "Members Schedule" }
  },
  {
    path: "Product",
    loadChildren: "app/pages/guest/all-products-guest/all-products-guest.module#AllProductsGuestModule",
    data: { breadcrumb: "Product" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {}
