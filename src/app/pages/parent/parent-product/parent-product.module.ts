import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllParentProductComponent } from "./all-parent-product/all-parent-product.component";
import { Routes, RouterModule } from "@angular/router";
import { ProductModule } from "../../../shared-component/product/product.module";

export const route: Routes = [
  {
    path: "",
    component: AllParentProductComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule, ProductModule, RouterModule.forChild(route)],
  declarations: [AllParentProductComponent]
})
export class ParentProductModule {}
