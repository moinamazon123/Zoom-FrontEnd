import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { CalendarModule } from "angular-calendar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SharedModule } from "../../shared/shared.module";
import { MatInputModule } from "@angular/material/input";
import { ScheduleComponent } from "./schedule.component";
import { ScheduleDialogComponent } from "./schedule-dialog/schedule-dialog.component";
import { Angular5TimePickerModule } from "angular5-time-picker";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { SendmailDialogComponent } from "./sendmail-dialog/sendmail-dialog.component";
export const routes = [{ path: "", component: ScheduleComponent, pathMatch: "full" }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxMaterialTimepickerModule.forRoot(),
    Angular5TimePickerModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,

    ReactiveFormsModule,
    CalendarModule,
    SharedModule
  ],
  declarations: [ScheduleComponent, ScheduleDialogComponent, SendmailDialogComponent],
  entryComponents: [ScheduleDialogComponent, SendmailDialogComponent],
  exports: [ScheduleComponent]
})
export class ScheduleModule {}
