import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-no-access",
  templateUrl: "./no-access.component.html",
  styleUrls: ["./no-access.component.scss"]
})
export class NoAccessComponent implements OnInit {
  public sidenavName;
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    // get the sidenav name from the URL
    this.route.params.subscribe(data => {
      this.sidenavName = data.name;
    });
  }
}
