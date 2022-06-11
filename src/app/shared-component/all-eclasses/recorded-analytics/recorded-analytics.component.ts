import { Component, OnInit, Inject } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-recorded-analytics",
  templateUrl: "./recorded-analytics.component.html",
  styleUrls: ["./recorded-analytics.component.scss"]
})
export class RecordedAnalyticsComponent implements OnInit {
  public data;
  public noRecordedAnalytics = 0;
  public totalAnalyticsCount: any = 0;
  public HighestSelected: any = [];
  public spinnerForRecordedAnalytics = true;
  public colorScheme = {
    domain: ["#00695c", "red", "#c5e02f"]
  };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;
  constructor(public appSettings: AppSettings, @Inject(MAT_DIALOG_DATA) public recordedClassDetails: any, public dialogref: MatDialogRef<any>) {}

  ngOnInit() {
    this.recordedAnalytics();
  }

  // get the recorded analytics

  recordedAnalytics() {
    const jsonForSessionId = {
      sessionId: this.recordedClassDetails.sessionId
    };
    this.appSettings.getRecordedAnalytics(jsonForSessionId).subscribe(
      (result: any) => {
        this.recordedAnalytics = result;
        let count = 0;
        if (result.msg !== "No Record Found!") {
          this.noRecordedAnalytics = 0;
          this.totalAnalyticsCount = result["Better Understanding"] + result["Missed Classes"] + result["Revision"];
          if (result["Better Understanding"] >= (result["Missed Classes"] || result["Revision"])) {
            this.HighestSelected[count] = "Better Understanding";
            count++;
          }
          if (result["Missed Classes"] >= (result["Better Understanding"] || result["Revision"])) {
            this.HighestSelected[count] = "Missed Classes";
            count++;
          }
          if (result["Revision"] >= (result["Better Understanding"] || result["Missed Classes"])) {
            this.HighestSelected[count] = "Revision";
            count++;
          }
          this.data = [
            {
              name: "Better Understanding",
              value: result["Better Understanding"]
            },
            {
              name: "Missed Classes",
              value: result["Missed Classes"]
            },
            {
              name: "Revision",
              value: result["Revision"]
            }
          ];
          this.spinnerForRecordedAnalytics = false;
        } else {
          this.HighestSelected[count] = "Not Found !!!";
          this.noRecordedAnalytics = 1;
          this.spinnerForRecordedAnalytics = false;
        }
      },
      () => {},
      () => {
        this.spinnerForRecordedAnalytics = false;
      }
    );
  }

  // close the dialog box

  close() {
    this.dialogref.close();
  }
}
