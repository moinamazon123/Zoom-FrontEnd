import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from "../../../app.settings";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { MatDialog } from "@angular/material";
import { Schedule } from "../schedule.model";
import { duration } from "moment";

@Component({
  selector: "app-sendmail-dialog",
  templateUrl: "./sendmail-dialog.component.html",
  styleUrls: ["./sendmail-dialog.component.scss"]
})
export class SendmailDialogComponent implements OnInit {
  public form: FormGroup;
  public d;
  public maxdate: any;
  public minDate = new Date();
  public mailingDateNotUtc;
  public sheduleddate;
  public sendmail: any = ["yes", "no"];
  public selectedsendmailoption;
  constructor(public dialog: MatDialog, public appSettings: AppSettings, public snackBar: MatSnackBar, public formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public user: any) {
    this.form = this.formBuilder.group({
      mailtime: null,
      maildate: null,
      sendmailondate: null
    });
  }

  ngOnInit() {
    this.maxdate = new Date(this.user.sheduletimeformail);
    const scheduledmonth = this.maxdate.getMonth() + 1;
    this.sheduleddate =
      this.maxdate.getDate() +
      "-" +
      scheduledmonth +
      "-" +
      this.maxdate.getFullYear() +
      " " +
      new Date(this.maxdate).getHours() +
      ":" +
      new Date(this.maxdate).getMinutes() +
      ":" +
      "00";
  }

  // send mail confirmation

  submit(data) {
    if (data.sendmailondate === "yes") {
      const date = data.maildate.getDate();
      const month = data.maildate.getMonth();
      const month1 = data.maildate.getMonth();
      const year = data.maildate.getFullYear();
      const time = data.mailtime.split(":");

      const hour = time[0];
      const min = time[1];
      this.d = new Date(year, month, date, hour, min).getTime();

      this.mailingDateNotUtc = new Date(year, month1, date, hour, min);

      if (this.mailingDateNotUtc > this.maxdate) {
        this.snackBar.open("Mail Date Should Be Within Sheduled Class Date!!", null, { duration: 3000 });
      } else {
        const jsondata = {
          batchId: this.user.batchId,
          title: this.user.title,
          mailingDate: this.d,
          subjectId: this.user.subjectId
        };
        this.appSettings.sendmailtostudents(jsondata, new Date(this.maxdate).getTime()).subscribe((data: any) => {
          this.snackBar.open(data.msg, null, { duration: 3000 });
        });
      }
    } else {
    }
  }
}
