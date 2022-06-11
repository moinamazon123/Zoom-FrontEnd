import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordedclassTeacherComponent } from "./recordedclass-teacher/recordedclass-teacher.component";
import { Routes, RouterModule } from "@angular/router";
import { AllEclassesModule } from "../../../shared-component/all-eclasses/all-eclasses.module";
import { RecordedclassGridTeacherComponent } from './recordedclass-grid-teacher/recordedclass-grid-teacher.component';

export const route: Routes = [
  {
    path: "",
    component: RecordedclassTeacherComponent
  }, {
    path: "Grid",
    component: RecordedclassGridTeacherComponent
  }
];

@NgModule({
  imports: [CommonModule, AllEclassesModule, RouterModule.forChild(route)],
  declarations: [RecordedclassTeacherComponent, RecordedclassGridTeacherComponent]
})
export class RecordedTeacherModule {}
