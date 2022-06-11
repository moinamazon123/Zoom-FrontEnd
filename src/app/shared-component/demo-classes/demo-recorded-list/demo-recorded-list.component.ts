import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { MoreInfoRecordedComponent } from "../../all-eclasses/more-info-recorded/more-info-recorded.component";
import { DemoRecordedDialogComponent } from "../demo-recorded-dialog/demo-recorded-dialog.component";

@Component({
  selector: "app-demo-recorded-list",
  templateUrl: "./demo-recorded-list.component.html",
  styleUrls: ["./demo-recorded-list.component.scss"]
})
export class DemoRecordedListComponent implements OnInit {
  @Input() public role: any;
  pageEvent: PageEvent;
  public pageNo = 0;
  public pageSize = 10;
  public length = 0;
  public overallRating: any = 0;
  public lengthForPagination = 0;
  public allclasses = [];
  public demorecordedclassrooms = [];
  public dataSourcetable;
  public urlParameter;
  public gradeName: any;
  public searchText;
  public selectedGrade;
  public notfound = false;
  displayedColumnsForrecorder: string[] = ["No.", "Title", "Teacher Name", "class held date", "view Recording"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public appSettings: AppSettings, public route: ActivatedRoute, public dialog: MatDialog, public router: Router) {}

  ngOnInit() {
    this.route.pathFromRoot[1].url.subscribe(val => (this.urlParameter = val[0].path));
      this.gradeName = "6";
    const jsonForPagination = {
      pageNo: 0,
      maxResult: this.pageSize,
      gradeName: this.gradeName
    };

    this.demoRecordedclass(jsonForPagination);
  }

  // get all demo recorded class

  demoRecordedclass(pagination) {
    // console.log(pagination);
    this.selectedGrade = pagination.gradeName;
    this.allclasses = [];
    if (pagination.delete) {
      this.demorecordedclassrooms = [];
    }
    this.dataSourcetable = null;
    this.pageNo = pagination.pageNo;
    // console.log(this.gradeName,pagination.gradeName)
    if (this.gradeName != pagination.gradeName) {
      this.paginator.pageIndex = 0;
    }
    const jsonForPagination = {
      pageNo: this.pageNo,
      maxResult: pagination.maxResult,
      accessTo: "Guest",
      gradeName: pagination.gradeName
    };
    // console.log(jsonForPagination);
    this.appSettings.getGuestClass(jsonForPagination).subscribe(
      (data: any) => {
        // console.log(data);
        this.lengthForPagination = data.countRecordedClass;
        this.allclasses = data.recordedClassList;

        for (let i = 0; i < this.allclasses.length; i++) {
          this.overallRating = 0;
          this.allclasses[i].rating = 0;

          this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
          this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + this.allclasses[i].endTime * 60000);
          if (this.allclasses[i].sessionId != null) {
            this.allclasses[i].status = "completed";
            if (this.demorecordedclassrooms.length < this.lengthForPagination) {
              this.demorecordedclassrooms.push(this.allclasses[i]);
            }
          }
        }
      },
      () => {},
      () => {
        if (this.demorecordedclassrooms.length == 0) {
          this.notfound = true;
        } else {
          this.notfound = false;
          this.dataSourcetable = new MatTableDataSource(this.demorecordedclassrooms);
          this.dataSourcetable.paginator = this.paginator;
          this.dataSourcetable.sort = this.sort;
        }
      }
    );
  }

  // for pagination

  pageno(event) {
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
      maxResult: event.pageSize,
      gradeName: this.gradeName
    };
    this.demoRecordedclass(jsonForPagination);
  }

  // get into recorded class

  getintorecordedclass(url) {
    window.open(url, "_self");
  }

  // for search

  applyFilter(filterValue: string) {
    this.dataSourcetable.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcetable.paginator) {
      this.dataSourcetable.paginator.firstPage();
    }
  }

  // sort the data in ascending and descending order

  sortData(e) {
    if (e.active === "class held date") {
      this.dataSourcetable.data = this.dataSourcetable.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.sessionId.localeCompare(b.sessionId);
        }

        if (e.direction === "desc") {
          return b.sessionId.localeCompare(a.sessionId);
        }
      });
    }
    if (e.active === "Title") {
      this.dataSourcetable.data = this.dataSourcetable.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.title.localeCompare(b.title);
        }

        if (e.direction === "desc") {
          return b.title.localeCompare(a.title);
        }
      });
    }
  }

  // open dialog box for more info about the demo recorded class

  openrecordedInfo(data) {
    this.dialog.open(DemoRecordedDialogComponent, {
      data: data
    });
  }

// route to grid view

  gridRouting() {
    if (this.urlParameter === "Demo") {
      this.router.navigate(["/Demo/" + this.gradeName + "/class/recordedGrid"]);
    } else if (this.urlParameter === "Guest") {
      this.router.navigate(["/Guest/" + this.gradeName + "/recordedGrid"]);
    } else {
      this.router.navigate(["/dashboard/parent/demo/RecordedGrid"]);
    }
  }
}
