import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZoomToken } from "./zoomToken/zoomToken.component";

const routes: Routes = [
  { path: "Batch", loadChildren: "app/pages/admin/batches/batches.module#BatchesModule", data: { breadcrumb: "Batch" }},
  { path: "Subscription", loadChildren: "app/pages/admin/subscription-admin/subscription-admin.module#SubscriptionAdminModule", data: { breadcrumb: "Subscription" }},
  { path: "Schedule", loadChildren: "app/pages/admin/schedule-admin/schedule-admin.module#ScheduleAdminModule", data: { breadcrumb: "Schedule" }},
  { path: "Talenttest", loadChildren: "app/pages/admin/talent-test/talent-test.module#TalentTestModule", data: { breadcrumb: "Talent Test" } },
  { path: "Zoomtoken", component: ZoomToken },
  { path: "Product", loadChildren: "app/pages/admin/product-admin/product-admin.module#ProductAdminModule", data: { breadcrumb: "Products" } },
  { path: "Assignment&Test", loadChildren: "app/pages/admin/assignment-test/assignment-test.module#AssignmentTestModule"},
  { path: "Parents", loadChildren: "app/pages/admin/users/users.module#UsersModule", data: { breadcrumb: "Parents" } },
  { path: "Students", loadChildren: "app/pages/admin/users/users.module#UsersModule", data: { breadcrumb: "Students" } },
  { path: "Teachers", loadChildren: "app/pages/admin/users/users.module#UsersModule", data: { breadcrumb: "Teachers" } },
  { path: "Demo Members", loadChildren: "app/pages/admin/users/users.module#UsersModule", data: { breadcrumb: "Demo Members" } },
  { path: "Classes", loadChildren: "app/pages/admin/classes/classes.module#ClassesModule", data: { breadcrumb: "Classes" } },
  { path: "e-Classes", loadChildren: "app/pages/admin/e-classes/e-classes.module#EClassesModule", data: { breadcrumb: "e-Classes" } },
  { path: "admin-access", loadChildren: "app/pages/admin/admin-access/admin-access.module#AdminAccessModule", data: { breadcrumb: "" } },
  { path: "", loadChildren: "app/pages/admin/dashboard/dashboard.module#DashboardModule" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
