import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AllEclassesModule } from "../../../shared-component/all-eclasses/all-eclasses.module";
import { TeachertraningComponent } from "./teachertraning/teachertraning.component";
const route: Routes = [
  {
    path: "",
    component: TeachertraningComponent
  }
];
@NgModule({
  declarations: [TeachertraningComponent],
  imports: [CommonModule, AllEclassesModule, RouterModule.forChild(route)]
})
export class TrainingTeacherModule {}
