import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-guest-recordedclass",
  templateUrl: "./guest-recordedclass.component.html",
  styleUrls: ["./guest-recordedclass.component.scss"]
})
export class GuestRecordedclassComponent implements OnInit {
  public gradeName;
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.gradeName = data.id;
    })
  }
}
