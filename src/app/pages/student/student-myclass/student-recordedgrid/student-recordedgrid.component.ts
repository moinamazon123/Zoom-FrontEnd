import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-recordedgrid",
  templateUrl: "./student-recordedgrid.component.html",
  styleUrls: ["./student-recordedgrid.component.scss"]
})
export class StudentRecordedgridComponent implements OnInit {
  public subsTypeId;
  constructor() {}

  ngOnInit() {
    this.subsTypeId = sessionStorage.getItem("SubId");
  }
}
