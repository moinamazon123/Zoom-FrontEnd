import { Component, OnInit, ViewChild } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort, MatDialog, PageEvent } from "@angular/material";
import { Location } from "@angular/common";
import { MoreInfoReportComponent } from "../more-info-report/more-info-report.component";
import { MissedClassComponent } from "../../../../shared-component/all-eclasses/missed-class/missed-class.component";
import { AppSettings } from "../../../../app.settings";
import { IncompletedClassComponent } from "../../../../shared-component/all-eclasses/incompleted-class/incompleted-class.component";
import { CompletedClassComponent } from "../../../../shared-component/all-eclasses/completed-class/completed-class.component";

@Component({
  selector: "app-reports-student",
  templateUrl: "./reports-student.component.html",
  styleUrls: ["./reports-student.component.scss"]
})
export class ReportsStudentComponent implements OnInit {
  public pageEvent: PageEvent;
  public classes = ["Completed Classes", "Partially Completed Classes", "Missed Classes"];
  public gradeId: any;
  public syllabusId: any;
  public accountId: any;
  public FullName;
  public DataSource: any;
  public noClassFound = false;
  public selectedClassroom = "Completed Classes";
  public pageNo: any = 0;
  public pageSize: any = 10;
  public length: any;
  public batchId;
  public displayedColumnsName: string[] = ["Sl.No", "Title", "subjectName", "Teacher Name", "class held date", "percentage", " "]; // table column name
  @ViewChild(MissedClassComponent) Missedchild: MissedClassComponent; // to get the function of MissedClassComponent
  @ViewChild(IncompletedClassComponent) Incompletechild: IncompletedClassComponent; // to get the function of IncompletedClassComponent
  @ViewChild(CompletedClassComponent) completechild: CompletedClassComponent;// to get the function of completedClassComponent
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public cookieservice: CookieService, public location: Location, public dialog: MatDialog, public appSettings: AppSettings) { }

  ngOnInit() {
    this.batchId = this.cookieservice.get("batchId");
    // console.log(this.batchId)
    this.accountId = this.cookieservice.get("userAccountId");
    this.FullName = this.cookieservice.get("userFullName");
  }

  // Get Missed Class data

  missedclass(data) {
    this.DataSource = null;

    if (data.length === 0) {
      this.noClassFound = true;
    } else {
      this.length = data.length;
      this.DataSource = new MatTableDataSource(data);
      this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.sort;
    }
  }

  // Get Incompleted class data

  Incompletedclass(data) {
    this.DataSource = null;

    if (data.length === 0) {
      this.noClassFound = true;
    } else {
      this.length = data.length;
      this.DataSource = new MatTableDataSource(data);
      this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.sort;
    }
  }

  // Get Completed class data

  completedclass(data) {
    this.DataSource = null;

    if (data.length === 0) {
      this.noClassFound = true;
    } else {
      this.length = data.length;
      this.DataSource = new MatTableDataSource(data);
      this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.sort;
    }
  }

  // To change between missed, incomplete and completed class

  ClassSelected(classes) {
    this.noClassFound = false;
    this.DataSource = null;
    this.selectedClassroom = classes;
  }

  // Move to previous page

  moveToPreviousPage() {
    this.location.back();
  }

  // get total length of data and assign to length variable

  getAlllength(event) {
    this.length = event;
  }

  // open dialog to get more-info about the class

  openmoreinfo(result) {
    const dialogRef = this.dialog.open(MoreInfoReportComponent, {
      data: result
    });
  }

  // for pagination

  pageno(event) {
    this.DataSource = null;
    if (this.appSettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = 0;

    const jsonForPagination = {
      pageNo: event.pageIndex,
      maxResult: event.pageSize
    };

    // if selectedClassroom == "Missed Classes" get the details from MissedClassComponent else from IncompletedClassComponent

    if (this.selectedClassroom === "Missed Classes") {
      this.Missedchild.missedClass("d");
    } else if (this.selectedClassroom === "Partially Completed Classes") {
      this.Incompletechild.InCompletedClass("");
    } else if (this.selectedClassroom === "Completed Classes") {
      this.completechild.completedClasses("");
    }
  }

  // sort data in ascending or in descending order

  sortData(e) {
    if (e.active === "Title") {
      this.DataSource.data = this.DataSource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.title.localeCompare(b.title);
        }
        if (e.direction === "desc") {
          return b.title.localeCompare(a.title);
        }
      });
    }
    if (e.active === "class held date") {
      this.DataSource.data = this.DataSource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.scheduledDateutc.localeCompare(b.scheduledDateutc);
        }
        if (e.direction === "desc") {
          return b.scheduledDateutc.localeCompare(a.scheduledDateutc);
        }
      });
    }
  }
}
