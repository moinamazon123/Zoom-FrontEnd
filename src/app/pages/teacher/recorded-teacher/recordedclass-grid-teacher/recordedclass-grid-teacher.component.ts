import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-recordedclass-grid-teacher",
  templateUrl: "./recordedclass-grid-teacher.component.html",
  styleUrls: ["./recordedclass-grid-teacher.component.scss"]
})
export class RecordedclassGridTeacherComponent implements OnInit {
  public accountId: any;
  constructor() {}

  ngOnInit() {
    this.accountId = sessionStorage.getItem("accountId");
  }
}
