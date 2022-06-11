import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../theme/pipes/pipes.module";
import { NgxPaginationModule } from "ngx-pagination";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxPaginationModule,
  ],
  declarations: [],
  exports: []
})
export class SharedComponentModule { }
