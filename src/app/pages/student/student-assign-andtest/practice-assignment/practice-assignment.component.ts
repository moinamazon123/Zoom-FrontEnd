import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-practice-assignment",
  templateUrl: "./practice-assignment.component.html",
  styleUrls: ["./practice-assignment.component.scss"]
})
export class PracticeAssignmentComponent implements OnInit {
  public fileId;
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.fileId = data.id;
    });
  }
}
