import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-test-report-admin",
  templateUrl: "./view-test-report-admin.component.html",
  styleUrls: ["./view-test-report-admin.component.scss"]
})
export class ViewTestReportAdminComponent implements OnInit {
  public fileId: any;
  public title;
  constructor(public router: ActivatedRoute) {}

  ngOnInit() {
    // getting fileId and title from the URL

    this.router.params.subscribe(data => {
      this.fileId = data.id;
      this.title = data.title;
    });
  }
}
