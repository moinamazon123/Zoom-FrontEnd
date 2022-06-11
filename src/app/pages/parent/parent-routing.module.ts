import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "app/pages/parent/manage-student/manage-student.module#ManageStudentModule",
    data: { breadcrumb: "Manage Student" }
  },
  {
    path: "Subscription",
    loadChildren: "app/pages/parent/parent-subscription/parent-subscription.module#ParentSubscriptionModule",
    data: { breadcrumb: "Subscription" }
  },
  {
    path: "Products",
    loadChildren: "app/pages/parent/parent-product/parent-product.module#ParentProductModule",
    data: { breadcrumb: "Products" }
  },
  {
    path: "demo",
    loadChildren: "app/pages/parent/demo-parent/demo-parent.module#DemoParentModule",
    data: { breadcrumb: "" }
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule {}
