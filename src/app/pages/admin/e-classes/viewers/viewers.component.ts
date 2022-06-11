import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-viewers",
  templateUrl: "./viewers.component.html",
  styleUrls: ["./viewers.component.scss"]
})
export class ViewersComponent implements OnInit {
  public sessionId: any;
  public title: any;
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.sessionId = data.id;
      this.title = data.title;
    });
  }
}
