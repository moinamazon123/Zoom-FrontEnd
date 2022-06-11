import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { TakeAssignmentTestComponent } from "../take-assignment-test/take-assignment-test.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-test-result",
  templateUrl: "./test-result.component.html",
  styleUrls: ["./test-result.component.scss"]
})
export class TestResultComponent implements OnInit {
  public showProgress: any = true;
  public performance: any;
  public remarksText: any;
  public count: any;
  public showResult: any = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TakeAssignmentTestComponent>, private router: Router) {}

  ngOnInit() {
    this.remarks();

    setTimeout(() => {
      this.showProgress = false;
    }, 3000);
  }

  // setting circle-progress subtitle as "valuating"

  formatSubtitle() {
    return "Valuating...";
  }

  // setting circle-progress subtitle as "Performance"

  formatSubtitleForResult() {
    return "Performance";
  }

  // remark about the performance

  remarks() {
    this.performance = ((this.data.correct / this.data.total) * 100).toFixed(2);
    if (this.performance < 50) {
      this.remarksText = "Poor";
      this.count = 0;
    } else if (this.performance > 75 && this.performance <= 50) {
      this.remarksText = "Satisfactory";
      this.count = 1;
    } else if (this.performance > 85 && this.performance <= 75) {
      this.remarksText = "Good";
      this.count = 2;
    } else {
      this.remarksText = "Best";
      this.count = 3;
    }
  }

  // close the dialogbox

  close() {
    this.dialogRef.close();
    this.router.navigate([]);
  }

  // show result

  showResultFunc() {
    this.data.showResult = true;
    this.data.showExpireDialog = false;
  }
}
