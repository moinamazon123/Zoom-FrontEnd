import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductGuestComponent } from "./product-guest/product-guest.component";
import { ProductModule } from "../../../shared-component/product/product.module";
import { Routes, RouterModule } from "@angular/router";
import { OtpconfirmDialogComponent } from "./otpconfirm-dialog/otpconfirm-dialog.component";
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const route: Routes = [
  {
    path: "",
    component: ProductGuestComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule, ProductModule, RouterModule.forChild(route), SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [ProductGuestComponent, OtpconfirmDialogComponent],
  entryComponents: [OtpconfirmDialogComponent]
})
export class AllProductsGuestModule {}
