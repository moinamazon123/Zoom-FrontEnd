import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-practice-assign-admin",
  templateUrl: "./practice-assign-admin.component.html",
  styleUrls: ["./practice-assign-admin.component.scss"]
})
export class PracticeAssignAdminComponent implements OnInit {
  public fileId;
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.fileId = data.id;
    });
  }
}
