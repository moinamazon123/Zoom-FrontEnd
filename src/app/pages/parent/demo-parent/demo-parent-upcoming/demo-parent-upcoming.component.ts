import { Component, OnInit, ViewChild } from "@angular/core";
import { DemoUpcomingclassComponent } from "../../../../shared-component/demo-classes/demo-upcomingclass/demo-upcomingclass.component";

@Component({
  selector: "app-demo-parent-upcoming",
  templateUrl: "./demo-parent-upcoming.component.html",
  styleUrls: ["./demo-parent-upcoming.component.scss"]
})
export class DemoParentUpcomingComponent implements OnInit {
  constructor() {}
  public selected: any;
  @ViewChild(DemoUpcomingclassComponent) demoupcoming: DemoUpcomingclassComponent;  // to access the DemoUpcomingclassComponent function
  public grades = ["6", "7", "8", "9", "10"];
  ngOnInit() {
    this.selected = "6";
  }

  // to change the grade to see the demo classes of that grade


  selectedGrade(data) {
    this.selected = data;
    this.demoupcoming.demoUpcomingClass(data);
  }
}
