import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UpcomingClassComponent } from "../upcoming-class/upcoming-class.component";

@Component({
  selector: "app-more-info-upcoming",
  templateUrl: "./more-info-upcoming.component.html",
  styleUrls: ["./more-info-upcoming.component.scss"]
})
export class MoreInfoUpcomingComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA)public upcomingDetail: any, public dialogref: MatDialogRef<any>) {}

  ngOnInit() {}

  close() {
    this.dialogref.close();
  }
}
