import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListBatchesComponent } from "./list-batches/list-batches.component";
import { AddBatchComponent } from "./add-batch/add-batch.component";
import { AddStudentBatchComponent } from "./add-student-batch/add-student-batch.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PipesModule } from "../../../theme/pipes/pipes.module";

const route: Routes = [
  {
    path: "",
    component: ListBatchesComponent,
    data: { breadcrumb: "list of batch" }
  },
  {
    path: "addStudent/:id",
    component: AddStudentBatchComponent,
    data: { breadcrumb: "add student" }
  }
];

@NgModule({
  imports: [CommonModule, DragDropModule, RouterModule.forChild(route), SharedModule, FormsModule, ReactiveFormsModule, NgxMaterialTimepickerModule, PipesModule],
  declarations: [ListBatchesComponent, AddBatchComponent, AddStudentBatchComponent],
  entryComponents: [AddBatchComponent]
})
export class BatchesModule {}
