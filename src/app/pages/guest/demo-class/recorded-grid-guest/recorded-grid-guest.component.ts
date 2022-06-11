import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DemoRecordedGridComponent } from "../../../../shared-component/demo-classes/demo-recorded-grid/demo-recorded-grid.component";

@Component({
  selector: "app-recorded-grid-guest",
  templateUrl: "./recorded-grid-guest.component.html",
  styleUrls: ["./recorded-grid-guest.component.scss"]
})
export class RecordedGridGuestComponent implements OnInit {
  public grades = ["6", "7", "8", "9", "10"];
  public selected;
  @ViewChild(DemoRecordedGridComponent) demoRecorded: DemoRecordedGridComponent;
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.selected = "6";
  }

  // select grade

  selectedGrade(data) {
    const json = {
      pageNo: 1,
      maxResult: 9,
      gradeName: data
    };

    // based on grade retrive class from demo recorded class from shared component

    this.demoRecorded.demoRecordedClass(json);
  }
}
