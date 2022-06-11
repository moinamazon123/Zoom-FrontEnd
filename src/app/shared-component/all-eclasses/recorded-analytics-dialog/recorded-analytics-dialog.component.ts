import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AppSettings } from "../../../app.settings";

@Component({
  selector: "app-recorded-analytics-dialog",
  templateUrl: "./recorded-analytics-dialog.component.html",
  styleUrls: ["./recorded-analytics-dialog.component.scss"]
})
export class RecordedAnalyticsDialogComponent implements OnInit {
  answer: string = null;
  public role;
  public accountId;
  options: string[] = ["Better Understanding", "Revision", "Missed Classes"];
  constructor(public dialog: MatDialogRef<any>, public appSettings: AppSettings, @Inject(MAT_DIALOG_DATA) public session: any) {}

  ngOnInit() {
    this.role = sessionStorage.getItem("role");
    this.accountId = sessionStorage.getItem("accountId");
  }

  // close dialog box

  close() {
    this.dialog.close();
  }

  // submit the recorded analytics and redirect to recorded class

  redirectToRecording() {
    const jsondata = {
      userRole: this.role,
      sessionId: this.session.sessionId,
      accountId: this.accountId,
      reasonDescription: this.answer
    };
    this.appSettings.RecordingAnalytics(jsondata).subscribe(
      (data: any) => {
      },
      () => {},
      () => {
        const jsondata = {
          sAccountId: this.accountId,
          sessionId: this.session.sessionId,
          title: this.session.title
        };
        this.appSettings.studenthistory(jsondata).subscribe(
          result => {},
          () => {},
          () => {
            this.appSettings.launchstudentclassroom(this.session.sessionId).subscribe((data: any) => {
              window.open(data.urls[0].url, "_self");
            });
          }
        );
      }
    );
  }
}
