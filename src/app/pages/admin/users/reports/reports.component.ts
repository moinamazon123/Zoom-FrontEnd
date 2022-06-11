import { Component, OnInit, ViewChild } from "@angular/core";
import { BreadcrumbComponent } from "../../../../theme/components/breadcrumb/breadcrumb.component";
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
  providers: [BreadcrumbComponent]
})
export class ReportsComponent implements OnInit {
 public role: string;
 public userFullName: string;
 public userAccountId: string;

  constructor(public breadcrumb: BreadcrumbComponent, public cookieservice: CookieService) {}

  ngOnInit() {
    this.role = this.breadcrumb.pageTitle.slice(3, this.breadcrumb.pageTitle.length);
    this.userFullName = this.cookieservice.get("userFullName");
    this.userAccountId = this.cookieservice.get("userAccountId");
  }
}
