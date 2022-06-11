import { Component, OnInit, Input } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BreadcrumbComponent } from "../../../../theme/components/breadcrumb/breadcrumb.component";

@Component({
  selector: "app-analytic",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
  providers: [BreadcrumbComponent]
})
export class AnalyticsComponent implements OnInit {
  public role;
  public userFullName;
  public userAccountId;
  public className;
  public batchId;
  public gradeId;

  constructor(public breadcrumb: BreadcrumbComponent, public cookieService: CookieService) {}

  ngOnInit() {

    // get role, userFullName, userAccountId, className, batchId, gradeId from cookie

    this.role = this.breadcrumb.pageTitle.slice(3, this.breadcrumb.pageTitle.length);
    this.userFullName = this.cookieService.get("userFullName");
    this.userAccountId = this.cookieService.get("userAccountId");
    this.className = this.cookieService.get("className");
    this.batchId = this.cookieService.get("batchId");
    this.gradeId = this.cookieService.get("gradeId");
  }
}
