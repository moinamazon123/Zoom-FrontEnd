import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-assignment",
  templateUrl: "./assignment.component.html",
  styleUrls: ["./assignment.component.scss"]
})
export class AssignmentComponent implements OnInit {
  public searchText: any;
  public role;
  public assignmentortest;
  constructor() {}

  ngOnInit() {}
}
