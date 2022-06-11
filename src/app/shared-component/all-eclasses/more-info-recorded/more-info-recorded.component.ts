import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-more-info-recorded",
  templateUrl: "./more-info-recorded.component.html",
  styleUrls: ["./more-info-recorded.component.scss"]
})
export class MoreInfoRecordedComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public RecordedDetails: any, public dialogref: MatDialogRef<any>) {}

  ngOnInit() {}

  // close the dialog box

  close() {
    this.dialogref.close();
  }
}
