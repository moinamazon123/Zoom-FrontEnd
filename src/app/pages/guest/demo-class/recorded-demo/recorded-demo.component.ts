import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DemoRecordedListComponent } from "../../../../shared-component/demo-classes/demo-recorded-list/demo-recorded-list.component";

@Component({
  selector: "app-recorded-demo",
  templateUrl: "./recorded-demo.component.html",
  styleUrls: ["./recorded-demo.component.scss"]
})
export class RecordedDemoComponent implements OnInit {
  public selected: any;
  @ViewChild(DemoRecordedListComponent) demoRecorded: DemoRecordedListComponent;
  public grades = ["6", "7", "8", "9", "10"];
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.selected = "6";
  }

  // select grade

  selectedGrade(data) {
    const json = {
      pageNo: 0,
      maxResult: 10,
      gradeName: data,
      delete: true
    };

    // based on grade retrive class from demo recorded class from shared component

    this.demoRecorded.demoRecordedclass(json);
  }
}
