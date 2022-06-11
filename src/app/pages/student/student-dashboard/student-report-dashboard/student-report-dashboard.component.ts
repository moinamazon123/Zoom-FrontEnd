import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-report-dashboard",
  templateUrl: "./student-report-dashboard.component.html",
  styleUrls: ["./student-report-dashboard.component.scss"]
})
export class StudentReportDashboardComponent implements OnInit {
  public userFullName;
  public userAccountId;
  public className;
  public batchId;
  public gradeId;
  constructor() {}

  ngOnInit() {
    this.batchId = sessionStorage.getItem("batchId");
    this.userAccountId = sessionStorage.getItem("accountId");
    this.className = sessionStorage.getItem("gradeName");
    this.gradeId =  sessionStorage.getItem("gradeId");
  }
}
