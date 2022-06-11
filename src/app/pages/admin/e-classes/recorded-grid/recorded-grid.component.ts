import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSettings } from "../../../../app.settings";
import { RecordedClassComponent } from "../../../../shared-component/all-eclasses/recorded-class/recorded-class.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-recorded-grid",
  templateUrl: "./recorded-grid.component.html",
  styleUrls: ["./recorded-grid.component.scss"]
})
export class RecordedGridComponent implements OnInit {
  @ViewChild(RecordedClassComponent) child: RecordedClassComponent;

  constructor(public appsettings: AppSettings, public router: Router) {}

  ngOnInit() {}
}
