import { Component, OnInit, ViewChild } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort, MatDialog, PageEvent } from "@angular/material";
import { Location } from "@angular/common";
import { MissedClassComponent } from "../../../../shared-component/all-eclasses/missed-class/missed-class.component";
import { AppSettings } from "../../../../app.settings";
import { IncompletedClassComponent } from "../../../../shared-component/all-eclasses/incompleted-class/incompleted-class.component";
import { MoreInfoDialogComponent } from "../more-info-dialog/more-info-dialog.component";
import { CompletedClassComponent } from "../../../../shared-component/all-eclasses/completed-class/completed-class.component";

@Component({
  selector: "app-view-report-student",
  templateUrl: "./view-report-student.component.html",
  styleUrls: ["./view-report-student.component.scss"]
})
export class ViewReportStudentComponent implements OnInit {
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
  public batchId: any;
  public filters = {
    "sAccountId": "",
    "syllabus": "",
    "subject": "all",
    "startDate":"all",
    "endDate": "all",
    "pageNo": "0",
    "pageSize": "5",
    "text": ""
  }
  public displayedColumnsName: string[] = ["Sl.No", "Title", "Teacher Name", "class held date", "percentage", " "];
  @ViewChild(MissedClassComponent) Missedchild: MissedClassComponent;
  @ViewChild(IncompletedClassComponent) Incompletechild: IncompletedClassComponent;
  @ViewChild(CompletedClassComponent) completechild: CompletedClassComponent;// to get the function of completedClassComponent
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public cookieservice: CookieService, public location: Location, public dialog: MatDialog, public appSettings: AppSettings) {}

  ngOnInit() {
    this.batchId = this.cookieservice.get("batchId");
    this.accountId = this.cookieservice.get("userAccountId");
    this.FullName = this.cookieservice.get("userFullName");
    this.syllabusId  = this.cookieservice.get("syllabusId");

    this.filters.sAccountId= this.accountId;
    this.filters.syllabus= this.syllabusId;

    // console.log(this.filters)

  }

  // Get Missed Class data

  missedclass(data) {
    this.DataSource = null;

    if (data.length === 0) {
      this.noClassFound = true;
    } else {
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
      this.DataSource = new MatTableDataSource(data);
      this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.sort;
    }
  }

  // To change between missed, incomplete and completed class

  ClassSelected(classes) {
    if (this.selectedClassroom == classes) {
      this.noClassFound = true;
    } else {
      this.noClassFound = false;
      this.DataSource = null;
      this.selectedClassroom = classes;
    }
  }

  // Get Completed class data

  completedclass(data) {
    this.DataSource = null;
    if (data.length === 0) {
      this.noClassFound = true;
    } else {
      this.DataSource = new MatTableDataSource(data);
      this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.sort;
    }
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
    const dialogRef = this.dialog.open(MoreInfoDialogComponent, {
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
      this.Missedchild.missedClass(this.filters);
    } else if (this.selectedClassroom === "Partially Completed Classes") {
      this.Incompletechild.InCompletedClass(this.filters);
    } else if(this.selectedClassroom === "Completed Classes") {
      this.completechild.completedClasses(this.filters);
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
