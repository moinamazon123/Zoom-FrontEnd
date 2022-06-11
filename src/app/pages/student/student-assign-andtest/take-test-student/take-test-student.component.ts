import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-take-test-student",
  templateUrl: "./take-test-student.component.html",
  styleUrls: ["./take-test-student.component.scss"]
})
export class TakeTestStudentComponent implements OnInit {
  public fileId;
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.fileId = data.id;
    });
  }
}
