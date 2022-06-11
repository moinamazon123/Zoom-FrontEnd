import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UserGridComponent } from "../user-grid/user-grid.component";

@Component({
  selector: "app-more-info-parent",
  templateUrl: "./more-info-parent.component.html",
  styleUrls: ["./more-info-parent.component.scss"]
})
export class MoreInfoParentComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public userInfo: any, public dialogref: MatDialogRef<any>) {}

  ngOnInit() {}

  // close dialog box
  close() {
    this.dialogref.close();
  }
}
