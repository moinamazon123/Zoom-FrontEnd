import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort } from "@angular/material";
import { RecordedClassComponent } from "../../../../shared-component/all-eclasses/recorded-class/recorded-class.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-recorded-list",
  templateUrl: "./recorded-list.component.html",
  styleUrls: ["./recorded-list.component.scss"]
})
export class RecordedListComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
