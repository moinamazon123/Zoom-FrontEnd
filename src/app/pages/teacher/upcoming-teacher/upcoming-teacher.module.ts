import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UpcomingclassTeacherComponent } from "./upcomingclass-teacher/upcomingclass-teacher.component";
import { Routes, RouterModule } from "@angular/router";
import { AllEclassesModule } from "../../../shared-component/all-eclasses/all-eclasses.module";


export const route: Routes = [
  {
    path: "",
    component: UpcomingclassTeacherComponent
  }
];
@NgModule({
  imports: [CommonModule, AllEclassesModule, RouterModule.forChild(route)],
  declarations: [UpcomingclassTeacherComponent]
})
export class UpcomingTeacherModule {}
