import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-more-info-report",
  templateUrl: "./more-info-report.component.html",
  styleUrls: ["./more-info-report.component.scss"]
})
export class MoreInfoReportComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public report: any, public dialogref: MatDialogRef<any>) {}

  ngOnInit() {}

  // close dialog box
  close() {
    this.dialogref.close();
  }
}
