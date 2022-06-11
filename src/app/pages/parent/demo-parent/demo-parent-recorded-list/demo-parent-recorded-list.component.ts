import { Component, OnInit, ViewChild } from "@angular/core";
import { DemoRecordedListComponent } from "../../../../shared-component/demo-classes/demo-recorded-list/demo-recorded-list.component";

@Component({
  selector: "app-demo-parent-recorded-list",
  templateUrl: "./demo-parent-recorded-list.component.html",
  styleUrls: ["./demo-parent-recorded-list.component.scss"]
})
export class DemoParentRecordedListComponent implements OnInit {
  public selected: any;
  @ViewChild(DemoRecordedListComponent) demoRecorded: DemoRecordedListComponent;  // to access the DemoRecordedListComponent function
  public grades = ["6", "7", "8", "9", "10"];
  constructor() {}

  ngOnInit() {
    this.selected = "6";
  }

  // to change the grade to see the demo classes of that grade

  selectedGrade(data) {
    const json = {
      pageNo: 0,
      maxResult: 9,
      gradeName: data,
      delete: true
    };
    this.demoRecorded.demoRecordedclass(json);
  }
}
