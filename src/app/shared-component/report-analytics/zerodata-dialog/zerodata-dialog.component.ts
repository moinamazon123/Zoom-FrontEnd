import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ReportComponent } from "../report/report.component";
import { Location } from "@angular/common";

@Component({
  selector: "app-zerodata-dialog",
  templateUrl: "./zerodata-dialog.component.html",
  styleUrls: ["./zerodata-dialog.component.scss"]
})
export class ZerodataDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ReportComponent>, public location: Location) {}

  ngOnInit() {}

  // go back to previous page

  goBack() {
    this.location.back();
    this.dialogRef.close();
  }
}
