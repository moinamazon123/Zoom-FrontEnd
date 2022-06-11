import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-more-info-student",
  templateUrl: "./more-info-student.component.html",
  styleUrls: ["./more-info-student.component.scss"]
})
export class MoreInfoStudentComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public report: any, public dialogref: MatDialogRef<any>) {}

  ngOnInit() {
  }

// close the dialog box

  close() {
    this.dialogref.close();
  }
}
