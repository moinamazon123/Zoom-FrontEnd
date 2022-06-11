import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllSubscriptionComponent } from "./all-subscription/all-subscription.component";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [AllSubscriptionComponent],
  exports: [AllSubscriptionComponent]
})
export class SubscriptionModule {}
