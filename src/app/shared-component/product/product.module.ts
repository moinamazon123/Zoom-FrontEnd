import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./product/product.component";

import { ProductDialogComponent } from "./product-dialog/product-dialog.component";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [ProductComponent, ProductDialogComponent],
  exports: [ProductComponent],
  entryComponents: [ProductDialogComponent]
})
export class ProductModule { }
