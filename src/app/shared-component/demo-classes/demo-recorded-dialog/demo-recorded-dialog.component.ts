import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-demo-recorded-dialog",
  templateUrl: "./demo-recorded-dialog.component.html",
  styleUrls: ["./demo-recorded-dialog.component.scss"]
})
export class DemoRecordedDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public RecordedDetails: any, public dialogref: MatDialogRef<any>) {}

  ngOnInit() {}

  // close the dialog box

  close() {
    this.dialogref.close();
  }
}
