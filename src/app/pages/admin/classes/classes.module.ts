import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { ClassroomComponent } from "./classroom/classroom.component";
import { ClassroomDialogComponent } from "./classroom/classroom-dialog/classroom-dialog.component";

const route: Routes = [
  {
    path: "",
    component: ClassroomComponent
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(route), SharedModule],
  declarations: [ClassroomComponent, ClassroomDialogComponent],
  entryComponents: [ClassroomDialogComponent]
})
export class ClassesModule {}
