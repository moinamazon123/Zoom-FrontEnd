import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ParentRoutingModule } from "./parent-routing.module";
import { DemoClassesModule } from "../../shared-component/demo-classes/demo-classes.module";

@NgModule({
  imports: [CommonModule, ParentRoutingModule,DemoClassesModule],
  declarations: []
})
export class ParentModule {}
