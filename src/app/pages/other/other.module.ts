import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { OtherRoutingModule } from "./other-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { StudentLoginComponent } from "./student-login/student-login.component";
import { RegistrationGuestComponent } from "./registration-guest/registration-guest.component";
import { GradeDialogComponent } from "./grade-dialog/grade-dialog.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { BarRatingModule } from "ngx-bar-rating";
import { OrderdetailsComponent } from "./orderdetails/orderdetails.component";
import { NoAccessComponent } from './no-access/no-access.component';
import { RegistrationscorewellComponent } from './registrationscorewell/registrationscorewell.component';
import { JoinnowComponent } from './joinnow/joinnow.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ForscorewellComponent } from './forscorewell/forscorewell.component';

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, OtherRoutingModule, BarRatingModule, MatFormFieldModule,
    MatInputModule],
  declarations: [LoginComponent,JoinnowComponent, RegisterComponent, StudentLoginComponent, RegistrationGuestComponent, GradeDialogComponent, ForgotPasswordComponent, FeedbackComponent, OrderdetailsComponent, NoAccessComponent, RegistrationscorewellComponent, JoinnowComponent, ForscorewellComponent],
  entryComponents: [GradeDialogComponent, ForgotPasswordComponent]
})
export class OtherModule { }
