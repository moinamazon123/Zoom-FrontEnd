import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-attendees",
  templateUrl: "./attendees.component.html",
  styleUrls: ["./attendees.component.scss"]
})
export class AttendeesComponent implements OnInit {
  public sessionId: any;
  public title: any;

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    // get sessionId and title from URL

    this.route.params.subscribe(data => {
      this.sessionId = data.id;
      this.title = data.title;
    });
  }
}
