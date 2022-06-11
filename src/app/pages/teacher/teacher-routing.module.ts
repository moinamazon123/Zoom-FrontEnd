import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "app/pages/teacher/dashboard-teacher/dashboard-teacher.module#DashboardTeacherModule",
    data: { breadcrumb: "" }
  },
  {
    path: "upcomingClass",
    loadChildren: "app/pages/teacher/upcoming-teacher/upcoming-teacher.module#UpcomingTeacherModule",
    data: { breadcrumb: "" }
  },
  {
    path: "recordedClass",
    loadChildren: "app/pages/teacher/recorded-teacher/recorded-teacher.module#RecordedTeacherModule",
    data: { breadcrumb: "" }
  },
  {
    path: "TraningClass",
    loadChildren: "app/pages/teacher/training-teacher/training-teacher.module#TrainingTeacherModule",
    data: { breadcrumb: "" }
  },
  {
    path: "schedule",
    loadChildren: "app/pages/teacher/schedule-teacher/schedule-teacher.module#ScheduleTeacherModule",
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
