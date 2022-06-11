import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-recordedclass-teacher",
  templateUrl: "./recordedclass-teacher.component.html",
  styleUrls: ["./recordedclass-teacher.component.scss"]
})
export class RecordedclassTeacherComponent implements OnInit {
  public accountId;
  constructor() {}

  ngOnInit() {
    this.accountId = sessionStorage.getItem("accountId");
  }
}
