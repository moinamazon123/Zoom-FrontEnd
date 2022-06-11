import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard-report-teacher",
  templateUrl: "./dashboard-report-teacher.component.html",
  styleUrls: ["./dashboard-report-teacher.component.scss"]
})
export class DashboardReportTeacherComponent implements OnInit {
  public userAccountId;
  constructor() {}

  ngOnInit() {
    this.userAccountId = sessionStorage.getItem("accountId");
  }
}
