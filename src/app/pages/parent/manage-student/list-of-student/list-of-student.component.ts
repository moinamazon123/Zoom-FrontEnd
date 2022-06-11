import { Component, OnInit } from "@angular/core";
import { AppSettings } from "../../../../app.settings";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AddStudentComponent } from "../add-student/add-student.component";

@Component({
  selector: "app-list-of-student",
  templateUrl: "./list-of-student.component.html",
  styleUrls: ["./list-of-student.component.scss"]
})
export class ListOfStudentComponent implements OnInit {
  public parentData = [];
  public studentData = [];
  public noStudent = false;
  public users = [];
  public skeleton = ["1", "2", "3"];
  public skeletonhide = false;
  constructor(public appSettings: AppSettings, public cookieservice: CookieService, public router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.getStudentList();
  }

// get student list of paricular parent

  getStudentList() {
    this.skeletonhide = false;
    this.appSettings.getstudentofparentfunction1().subscribe(
      (data: any) => {
        // console.log(data);
        data.forEach(element => {
          // this.parentData = data.filter(x => x.userRole === "parent");
          this.studentData = data.filter(x => x.userRole === "student");
        });
      },
      () => {},
      () => {
        this.skeletonhide = true;
        if (this.studentData.length === 0) {
          this.noStudent = true;
        } else {
          this.users = this.studentData;
          // console.log(this.users);
        }
      }
    );
  }

  // open report of the student

  openReportForStudent(data) {
    const fullName = data.firstName + " " + data.lastName;
    this.cookieservice.set("userFullName", fullName);
    this.cookieservice.set("userAccountId", data.sAccountId);
    this.cookieservice.set("batchId", data.batchId);
    this.cookieservice.set("syllabusId", data.syllabusId);
    this.router.navigate(["dashboard/parent/viewStudentReport"]);
  }

  // show analytics of the student

  showAnalytics(data) {
    const fullName = data.firstName + " " + data.lastName;
    this.cookieservice.set("userFullName",fullName);
    this.cookieservice.set("userAccountId", data.sAccountId);
    this.cookieservice.set("className", data.gradeName);
    this.cookieservice.set("batchId", data.batchId);
    this.cookieservice.set("gradeId", data.gradeId);

    this.router.navigate(["dashboard/parent/viewStudentAnalytics"]);
  }

// open dialog box to add new student (not using in live)

  openUserDialogforNew(data) {
    const dialogref = this.dialog.open(AddStudentComponent, { data: data });

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getStudentList();
      }
    });
  }

  // open dialog box to update the student details

  openUserDialogforUpdate(data) {
    delete data.fullName;
    data.userRole = "student";
    // data.editorUpdate = "update";
    data.accountId = this.appSettings.userdetails.accountId;
    const dialogref = this.dialog.open(AddStudentComponent, { data: data });

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getStudentList();
      }
    });
  }
}
