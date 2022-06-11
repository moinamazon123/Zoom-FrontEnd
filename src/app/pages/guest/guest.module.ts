import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GuestRoutingModule } from "./guest-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, GuestRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
  declarations: []
})
export class GuestModule {}
