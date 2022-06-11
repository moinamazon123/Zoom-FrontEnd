import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-demo-upcoming-dialog",
  templateUrl: "./demo-upcoming-dialog.component.html",
  styleUrls: ["./demo-upcoming-dialog.component.scss"]
})
export class DemoUpcomingDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public upcomingDetail: any, public dialogRef: MatDialogRef<any>) {}

  ngOnInit() {}

// close the dialog box

  close() {
    this.dialogRef.close();
  }
}
