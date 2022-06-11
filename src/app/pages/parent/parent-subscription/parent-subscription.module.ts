import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubscriptionOfParentComponent } from "./subscription-of-parent/subscription-of-parent.component";
import { SubscriptionModule } from "../../../shared-component/subscription/subscription.module";
import { Routes, Router, RouterModule } from "@angular/router";

export const route: Routes = [
  {
    path: "",
    component: SubscriptionOfParentComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule, SubscriptionModule, RouterModule.forChild(route)],
  declarations: [SubscriptionOfParentComponent]
})
export class ParentSubscriptionModule {}
