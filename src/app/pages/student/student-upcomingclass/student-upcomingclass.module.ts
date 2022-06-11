import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UpcomingclassForStudentComponent } from "./upcomingclass-for-student/upcomingclass-for-student.component";
import { AllEclassesModule } from "../../../shared-component/all-eclasses/all-eclasses.module";
import { Routes, RouterModule } from "@angular/router";

export const route: Routes = [{
  path: "",
  component: UpcomingclassForStudentComponent
}]

@NgModule({
  imports: [CommonModule, AllEclassesModule, RouterModule.forChild(route)],
  declarations: [UpcomingclassForStudentComponent]
})
export class StudentUpcomingclassModule {}
