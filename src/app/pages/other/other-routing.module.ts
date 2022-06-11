import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { StudentLoginComponent } from "./student-login/student-login.component";
import { RegistrationGuestComponent } from "./registration-guest/registration-guest.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { OrderdetailsComponent } from "./orderdetails/orderdetails.component";
import { NoAccessComponent } from "./no-access/no-access.component";

const routes: Routes = [
  {
    path: "feedback/:title",
    component: FeedbackComponent
  },
  {
    path: "StudentLogin",
    component: StudentLoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  // {
  //   path: ":name/:id",
  //   component: NoAccessComponent
  // },
  {
    path: "Details",
    loadChildren: "app/pages/other/profile/profile.module#ProfileModule",
    data: {breadcrumb: "profile"}
  },
  {
    path: "Registration/:name",
    component: RegisterComponent
  },
  {
    path: "Invoice",
    component: OrderdetailsComponent
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "Register",
    component: RegistrationGuestComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherRoutingModule {}
