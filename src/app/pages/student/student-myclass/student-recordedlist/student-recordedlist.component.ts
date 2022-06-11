import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-recordedlist",
  templateUrl: "./student-recordedlist.component.html",
  styleUrls: ["./student-recordedlist.component.scss"]
})
export class StudentRecordedlistComponent implements OnInit {
  public subsTypeId;
  constructor() {}

  ngOnInit() {
    this.subsTypeId = sessionStorage.getItem("SubId");
  }
}
