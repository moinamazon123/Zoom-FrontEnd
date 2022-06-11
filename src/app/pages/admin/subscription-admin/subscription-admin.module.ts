import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllSubscriptionsComponent } from "./all-subscriptions/all-subscriptions.component";
import { Routes, Router, RouterModule } from "@angular/router";
import { SubscriptionModule } from "../../../shared-component/subscription/subscription.module";

export const routes: Routes = [
  {
    path: "",
    component: AllSubscriptionsComponent
  }
];

@NgModule({
  imports: [CommonModule, SubscriptionModule, RouterModule.forChild(routes)],
  declarations: [AllSubscriptionsComponent]
})
export class SubscriptionAdminModule {}
