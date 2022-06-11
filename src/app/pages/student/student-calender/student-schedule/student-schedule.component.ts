import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-schedule",
  templateUrl: "./student-schedule.component.html",
  styleUrls: ["./student-schedule.component.scss"]
})
export class StudentScheduleComponent implements OnInit {
  public gradeId;
  public syllabusId;
  constructor() {}

  ngOnInit() {
    this.gradeId = sessionStorage.getItem("gradeId");
    this.syllabusId = sessionStorage.getItem("syllabusId");
  }
}
