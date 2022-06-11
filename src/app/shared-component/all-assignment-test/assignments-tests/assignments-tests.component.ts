import { Component, OnInit, Input, ɵConsole } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatDialog } from "@angular/material";
import { DialogAssignmentTestComponent } from "../dialog-assignment-test/dialog-assignment-test.component";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-assignments-tests",
  templateUrl: "./assignments-tests.component.html",
  styleUrls: ["./assignments-tests.component.scss"]
})
export class AssignmentsTestsComponent implements OnInit {
  @Input() role: any;
  @Input() AssignmentOrTest: any;

  public skeleton = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  public ResultData: any = [];
  public StoreAssignmentOrTest: any = [];
  public page: any;
  public length;
  public skeletonHide = false;
  public searchText;
  public gradeName;
  public allTestAttempted = [];
  public currentPage;
  constructor(public appSettings: AppSettings, public dialog: MatDialog, public router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    const jsondata = {
      accountId: sessionStorage.getItem("accountId")
    };
    this.appSettings.getStudentTestReport(jsondata).subscribe(
      (result: any) => {
        this.allTestAttempted = result;
      },
      () => {},
      () => {
        this.getAssignmentorTestfunction(1);
      }
    );
  }

  // get all assignment and test based on the rule

  getAssignmentorTestfunction(pageNo) {
    this.currentPage = pageNo - 1;
    this.route.params.subscribe(data => {
      this.gradeName = data.id;
    });
    this.page = pageNo - 1;
    const jsonForPagination = {
      pageNo: this.page,
      maxResult: 9
    };
    this.ResultData = [];
    if (this.AssignmentOrTest === "Assignment") {
      this.appSettings.getAllAssignment(jsonForPagination).subscribe(
        (data: any) => {
          if (this.role === "Admin") {
            this.length = data.count;
            this.ResultData = data.listOfAssignments;
          }
          if (this.role === "student") {
            for (let i = 0; i < data.listOfAssignments.length; i++) {
              if (
                (data.listOfAssignments[i].accessTo === "Both" || data.listOfAssignments[i].accessTo === "Members") &&
                data.listOfAssignments[i].gradeId === sessionStorage.getItem("gradeId") &&
                data.listOfAssignments[i].scheduledDate < new Date()
              ) {
                this.length = data.count;
                this.ResultData.push(data.listOfAssignments[i]);
              }
            }
          }
          if (this.role === "guest") {
            for (let i = 0; i < data.listOfAssignments.length; i++) {
              if (
                data.listOfAssignments[i].gradeName === this.gradeName &&
                data.listOfAssignments[i].scheduledDate < new Date()
              ) {
                this.length = data.count;
                this.ResultData.push(data.listOfAssignments[i]);
              }
            }
          }
        },
        () => {},
        () => {
          this.skeletonHide = true;
        }
      );
    } else {
      this.appSettings.getAllTest(jsonForPagination).subscribe(
        (data: any) => {
          if (this.role === "Admin") {
            this.length = data.count;
            this.ResultData = data.listOfTests;
          }
          if (this.role === "student") {
            for (let i = 0; i < data.listOfTests.length; i++) {
              if (
                (data.listOfTests[i].accessTo === "Both" || data.listOfTests[i].accessTo === "Members") &&
                data.listOfTests[i].gradeId === sessionStorage.getItem("gradeId") &&
                data.listOfTests[i].scheduledDate < new Date()
              ) {
                for (let j = 0; j < this.allTestAttempted.length; j++) {
                  if (this.allTestAttempted[j].fileId === data.listOfTests[i].fileId) {
                    data.listOfTests[i].alreadyDone = true;
                    break;
                  }
                  if (this.allTestAttempted[j].fileId !== data.listOfTests[i].fileId) {
                    data.listOfTests[i].alreadyDone = false;
                    continue;
                  }
                }
                this.length = this.ResultData.length;
                this.ResultData.push(data.listOfTests[i]);
              }
            }
          }
          if (this.role === "guest") {
            for (let i = 0; i < data.listOfTests.length; i++) {
              if (
                (data.listOfTests[i].accessTo === "Both" || data.listOfTests[i].accessTo === "Members" || data.listOfTests[i].accessTo === "Guest") &&
                data.listOfTests[i].gradeName === this.gradeName &&
                data.listOfTests[i].scheduledDate < new Date()
              ) {
                this.length = data.count;
                this.ResultData.push(data.listOfTests[i]);
              }
            }
          }
        },
        () => {},
        () => {
          this.skeletonHide = true;
        }
      );
    }
  }

  // open dialog box to add new assignment or test

  openDialog() {
    const dialogref = this.dialog.open(DialogAssignmentTestComponent, {
      data: this.AssignmentOrTest
    });

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getAssignmentorTestfunction(this.currentPage);
      }
    });
  }

  // routing for take test

  taketest(data) {
    this.router.navigate(["dashboard/student/Assignment&Test/takeTest", data.fileId]);
  }

  // routing for test report

  testReport(data) {
    this.router.navigate(["dashboard/admin/Assignment&Test/viewTestReport", data.fileId, data.title]);
  }

  // routing for take assignment

  takeAssignment(data) {
    if (this.role == "Admin") {
      this.router.navigate(["dashboard/admin/Assignment&Test/assignmentPractice", data.fileId]);
    } else if (this.role == "student") {
      this.router.navigate(["dashboard/student/Assignment&Test/practiceAssignment", data.fileId]);
    }
  }
}
