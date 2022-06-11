import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-guest-recordedclass-list",
  templateUrl: "./guest-recordedclass-list.component.html",
  styleUrls: ["./guest-recordedclass-list.component.scss"]
})
export class GuestRecordedclassListComponent implements OnInit {
  public gradeName;
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
   
    this.route.params.subscribe(data => {
      this.gradeName = data.id;
    })
  }
}
