import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "app/pages/student/student-dashboard/student-dashboard.module#StudentDashboardModule",
    data: { breadcrumb: "Dashboard" }
  },
  {
    path: "upcomingClass",
    loadChildren: "app/pages/student/student-upcomingclass/student-upcomingclass.module#StudentUpcomingclassModule",
    data: { breadcrumb: "Upcoming Class" }
  },
  {
    path: "myClass",
    loadChildren: "app/pages/student/student-myclass/student-myclass.module#StudentMyclassModule",
    data: { breadcrumb: "my Class" }
  },
  {
    path: "Assignment&Test",
    loadChildren: "app/pages/student/student-assign-andtest/student-assign-andtest.module#StudentAssignAndtestModule"
  },
  {
    path: "schedule",
    loadChildren: "app/pages/student/student-calender/student-calender.module#StudentCalenderModule",
    data: { breadcrumb: "Schedule" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
