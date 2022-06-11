import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { AppSettings } from "../../../app.settings";
import { LoginComponent } from "../login/login.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-grade-dialog",
  templateUrl: "./grade-dialog.component.html",
  styleUrls: ["./grade-dialog.component.scss"]
})
export class GradeDialogComponent implements OnInit {
  answer: string = null;
  public role;
  public accountId;
  options: string[] = ["6", "7", "8", "9"];
  constructor(public dialog: MatDialogRef<LoginComponent>, public appSettings: AppSettings, public router: Router) {}

  ngOnInit() {}

  close() {
    this.dialog.close();
  }

  // not using this component

  routerForDemo() {
    this.dialog.close();
    if (sessionStorage.getItem("role") == null) {
      setTimeout(() => {
      }, 400);
    } else {
      setTimeout(() => {
        this.router.navigate(["/Demo/" + this.answer + "/class"]);
      }, 400);
    }
  }
}
