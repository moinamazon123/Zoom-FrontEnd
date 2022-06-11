import { Component, OnInit, ViewChild } from "@angular/core";
import { DemoRecordedGridComponent } from "../../../../shared-component/demo-classes/demo-recorded-grid/demo-recorded-grid.component";

@Component({
  selector: "app-demo-parent-recorded",
  templateUrl: "./demo-parent-recorded.component.html",
  styleUrls: ["./demo-parent-recorded.component.scss"]
})
export class DemoParentRecordedComponent implements OnInit {
  public selected: any;
  @ViewChild(DemoRecordedGridComponent) demoRecorded: DemoRecordedGridComponent;    // to access the DemoRecordedGridComponent function
  public grades = ["6", "7", "8", "9", "10"];
  constructor() {}

  ngOnInit() {
    this.selected = "6";
  }

  // to change the grade to see the demo classes of that grade

  selectedGrade(data) {
    const json = {
      pageNo: 1,
      maxResult: 9,
      gradeName: data,
      delete: true
    };
    this.demoRecorded.demoRecordedClass(json);
  }
}
