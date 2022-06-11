import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { ZoomToken } from "./zoomToken/zoomToken.component";
import { FormsModule } from "@angular/forms";




@NgModule({
  imports: [CommonModule, AdminRoutingModule,FormsModule],
  declarations: [ZoomToken]
})
export class AdminModule {}
