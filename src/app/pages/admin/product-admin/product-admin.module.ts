import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductAdminComponent } from "./product-admin/product-admin.component";
import { Routes, RouterModule } from "@angular/router";
import { ProductModule } from "../../../shared-component/product/product.module";



const route: Routes = [{
  path: "",
  component: ProductAdminComponent,
  data: { breadcrumb: "" }
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(route), ProductModule],
  declarations: [ProductAdminComponent]
})
export class ProductAdminModule {}
