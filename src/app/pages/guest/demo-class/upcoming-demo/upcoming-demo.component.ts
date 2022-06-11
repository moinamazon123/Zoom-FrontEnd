import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DemoUpcomingclassComponent } from "../../../../shared-component/demo-classes/demo-upcomingclass/demo-upcomingclass.component";

@Component({
  selector: "app-upcoming-demo",
  templateUrl: "./upcoming-demo.component.html",
  styleUrls: ["./upcoming-demo.component.scss"]
})
export class UpcomingDemoComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  public selected: any;
  @ViewChild(DemoUpcomingclassComponent) demoupcoming: DemoUpcomingclassComponent;
  public grades = ["6", "7", "8", "9", "10"];
  ngOnInit() {
    this.route.params.subscribe(data => {
      this.selected = data.id;
    });
  }

  // select any grade

  selectedGrade(data) {
    this.selected = data;

    // based on grade retrive class from demo upcoming class from shared component

    this.demoupcoming.demoUpcomingClass(data);
  }
}
