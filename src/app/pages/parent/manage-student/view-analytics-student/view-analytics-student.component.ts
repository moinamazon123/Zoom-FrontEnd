import { Component, OnInit, Input } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-view-analytics-student",
  templateUrl: "./view-analytics-student.component.html",
  styleUrls: ["./view-analytics-student.component.scss"]
})
export class ViewAnalyticsStudentComponent implements OnInit {
  public role;
  public userFullName;
  public userAccountId;
  public className;
  public batchId;
  public gradeId;

  constructor(public cookieService: CookieService) {}

  ngOnInit() {
    this.batchId = this.cookieService.get("batchId");
    this.userFullName = this.cookieService.get("userFullName");
    this.userAccountId = this.cookieService.get("userAccountId");
    this.className = this.cookieService.get("className");
    this.gradeId = this.cookieService.get("gradeId");
  }
}
