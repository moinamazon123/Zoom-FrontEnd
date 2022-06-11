import { Component, OnInit, Input } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { PageEvent, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { DemoRecordedDialogComponent } from "../demo-recorded-dialog/demo-recorded-dialog.component";

@Component({
  selector: "app-demo-recorded-grid",
  templateUrl: "./demo-recorded-grid.component.html",
  styleUrls: ["./demo-recorded-grid.component.scss"]
})
export class DemoRecordedGridComponent implements OnInit {
  @Input() role: any;
  pageEvent: PageEvent;
  public pageNo = 0;
  public pageSize = 9;
  public page;
  public lengthForPagination = 0;
  public allclasses = [];
  public overallRating = 0;
  public notfound = false;
  public demorecordedclassrooms = [];
  public skeletonHide = false;
  public urlParameter;
  public gradeName;
  public searchText;
  public selectedGrade;
  public skeleton = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  constructor(public appSettings: AppSettings, public dialog: MatDialog, public route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.pathFromRoot[1].url.subscribe(val => (this.urlParameter = val[0].path));
    if (this.role != "parent") {
      this.route.params.subscribe(data => {
        this.gradeName = data.id;
      });
    } else {
      this.gradeName = "6";
    }

    const jsonForPagination = {
      pageNo: 1,
      maxResult: this.pageSize,
      gradeName: this.gradeName
    };
    // console.log(jsonForPagination)

    this.demoRecordedClass(jsonForPagination);
  }

  // get all demo recording class

  demoRecordedClass(pagination) {
    // console.log(pagination)
    this.skeletonHide = false;
    this.notfound = false;
    this.gradeName=pagination.gradeName;
    this.selectedGrade = pagination.gradeName;
    this.allclasses = [];
    this.demorecordedclassrooms = [];
    this.pageNo = pagination.pageNo - 1;

    const jsonForPagination = {
      pageNo: this.pageNo,
      maxResult: pagination.maxResult,
      accessTo: "Guest",
      gradeName: this.selectedGrade
    };

    this.appSettings.getGuestClass(jsonForPagination).subscribe(
      (data: any) => {
        this.lengthForPagination = data.countRecordedClass;
        this.allclasses = data.recordedClassList;
        if (this.allclasses.length === 0) {
          this.notfound = true;
        } else {
          for (let i = 0; i < this.allclasses.length; i++) {
            this.overallRating = 0;
            this.allclasses[i].rating = 0;
            this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
            this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + this.allclasses[i].endTime * 60000);
            if (this.allclasses[i].sessionId != null) {
              this.allclasses[i].status = "completed";
              this.demorecordedclassrooms.push(this.allclasses[i]);
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

  // for pagination

  public onPageChanged(event) {
    const jsonForPagination = {
      pageNo: event,
      maxResult: 9,
      gradeName: this.gradeName
    };
    this.demoRecordedClass(jsonForPagination);
    this.page = event;

    if (this.appSettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
  }

  // get into recorded class

  getintorecordedclass(url) {
    window.open(url, "_self");
  }

  // open dialog box for more info of the class

  openRecordedInfo(data) {
    this.dialog.open(DemoRecordedDialogComponent, {
      data: data
    });
  }

  // routing for list view

  listRouting() {
    if (this.urlParameter === "Demo") {
      this.router.navigate(["/Demo/" + this.gradeName + "/class/recorded"]);
    } else if (this.urlParameter === "Guest") {
      this.router.navigate(["/Guest/" + this.gradeName + "/recorded"]);
    } else {
      this.router.navigate(["/dashboard/parent/demo/RecordedList"]);
    }
  }
}
