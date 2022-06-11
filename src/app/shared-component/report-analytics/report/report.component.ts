import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { BreadcrumbComponent } from "../../../theme/components/breadcrumb/breadcrumb.component";
import { CookieService } from "ngx-cookie-service";
import { AppSettings } from "../../../app.settings";
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from "@angular/material";
import { Observable } from "rxjs/Rx";
import { Location } from "@angular/common";
import { ZerodataDialogComponent } from "../zerodata-dialog/zerodata-dialog.component";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
  providers: [BreadcrumbComponent]
})
export class ReportComponent implements OnInit {
  @Input() role: string;
  @Input() userFullName: String;
  @Input() userAccountId: string;
  @ViewChild("paginatorForTeacher", { read: MatPaginator }) paginatorForTeacher: MatPaginator;
  @ViewChild("paginatorForStudent", { read: MatPaginator }) paginatorForStudent: MatPaginator;

  public dataSourceForStudent: any;
  public dataSourceForTeacher: any;
  public classstatic: any = [];
  public countdisplay: any;
  public session: any;
  public noReport = false;
  public overallRating: any;
  displayedColumnsForStudent: string[] = ["position", "title", "name", "loginTime", "logoutTime", "exit", "progress"];
  displayedColumnsForTeacher: string[] = ["position", "title", "duration", "loginTime", "logoutTime", "rating"];

  constructor(
    public breadcrumb: BreadcrumbComponent,
    public cookieservice: CookieService,
    public appSettings: AppSettings,
    public snackBar: MatSnackBar,
    private _location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.showtable();
  }

// show report of teacher and student

  showtable() {
    if (this.appSettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
    this.classstatic = [];
    this.countdisplay = 0;

    if (this.role === "Teachers") {
      this.userAccountId
      this.appSettings.sessionofstudent(this.userAccountId).subscribe(
        (data: any) => {
          this.session = data;
        },
        () => {},
        () => {
          if (this.session.length === 0) {
            const msg = " Not Conducted any Live classes!!!!!";
            this.dialog.open(ZerodataDialogComponent, {
              disableClose: true,
              data: msg
            });
          } else {
            let i = 0;
            this.processStuff(this.session).subscribe((analytics: any) => {
              analytics.forEach(data => {
                if (Array.isArray(data)) {
                  data = data;
                  data.title = this.session[i].title;

                  this.countdisplay = i + 1;
                  data.position = i + 1;
                  data.logintime = new Date(data[0].startTime).toLocaleString();
                  data.logouttime = new Date(data[0].endTime).toLocaleString();
                  const login1: any = new Date(data[0].endTime);
                  const login2: any = new Date(data[0].startTime);
                  const duration = login1 - login2;
                  data.Duration = (duration / 60000).toFixed(2);
                  this.appSettings.getRating(this.session[i].sessionId).subscribe(
                    (rating: any) => {
                      if (rating[0].msg !== "Empty list") {
                        this.overallRating = 0;
                        data.ratingCount = rating.length;
                        for (let j = 0; j < rating.length; j++) {
                          this.overallRating = this.overallRating + rating[j].totalRating;
                        }
                        data.rating = this.overallRating / rating.length;
                      } else {
                        this.overallRating = 0;
                        data.rating = 0;
                        data.ratingCount = 0;
                      }
                    },
                    () => {},
                    () => {}
                  );
                  this.classstatic[i] = data;
                  this.dataSourceForTeacher = new MatTableDataSource(this.classstatic);
                  i = i + 1;
                }
              });
              this.dataSourceForTeacher.paginator = this.paginatorForTeacher;
            });
          }
        }
      );
    }
    if (this.role === "Students") {
      this.appSettings.sessionofstudent(this.userAccountId).subscribe(
        (data: any) => {
          this.session = data;
        },
        () => {},
        () => {
          if (this.session.length === 0) {
            const msg = "Not Attended any Live class !!!";
            this.dialog.open(ZerodataDialogComponent, {
              disableClose: true,
              data: msg
            });
          } else {
            let i = 0;
            this.processStuff(this.session).subscribe(
              (data: any) => {
                data.forEach(element1 => {
                  if (Array.isArray(element1)) {
                    const teachername = element1[0].instructorFirstName;
                    const starttime: any = new Date(element1[0].startTime).getTime() / 1000;
                    const endtime: any = new Date(element1[0].endTime).getTime() / 1000;
                    const teacherspent = endtime - starttime;
                    if (element1[0].participants.length > 0) {
                      element1[0].participants.forEach(element => {
                        if (element.participantUniqueName === this.userAccountId) {
                          if (element.durationInfos.length > 0) {
                            data[0] = element;
                            data[0].participantDisplayName = teachername;
                            data[0].title = this.session[i].title;
                            this.countdisplay = i + 1;
                            data[0].position = this.countdisplay;
                            data[0].exit = data[0].durationInfos.length - 1;
                            data[0].logintime = new Date(data[0].durationInfos[0].startTime).toLocaleString();
                            data[0].logouttime = new Date(data[0].durationInfos[data[0].durationInfos.length - 1].endTime).toLocaleString();
                            const studentstarttime: any = new Date(data[0].durationInfos[0].startTime).getTime() / 1000;
                            const studentendtime: any = new Date(data[0].durationInfos[data[0].durationInfos.length - 1].endTime).getTime() / 1000;
                            const totaltimespentinclass = studentendtime - studentstarttime;
                            const totaper = (totaltimespentinclass / teacherspent) * 100;
                            data[0].progress = totaper;
                            this.classstatic[i] = data[0];
                            this.dataSourceForStudent = new MatTableDataSource(this.classstatic);
                            i = i + 1;
                          }
                        }
                      });
                    }
                  }
                });
                this.dataSourceForStudent.paginator = this.paginatorForStudent;
              },
              () => {},
              () => {}
            );
          }
        }
      );
    }
  }

// get report from learntron one by one

  processStuff(inputObject) {
    const _self = this;
    const observableBatch = [];
    inputObject.forEach((element, key) => {
      observableBatch.push(
        this.appSettings
          .classanalytics(element.sessionId)
          .map((res: Response) => {
            return res;
          })
          .catch((error: any) => {
            if (error.status === 500) {
              return "ss";
            }
          })
      );
    });
    return Observable.forkJoin(observableBatch);
  }

  // search report for student

  applyFilterForStudent(filterValue: string) {
    this.dataSourceForStudent.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceForStudent.paginator) {
      this.dataSourceForStudent.paginator.firstPage();
    }
  }

  // search report for teacher

  applyFilterForTeacher(filterValue: string) {
    this.dataSourceForTeacher.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceForTeacher.paginator) {
      this.dataSourceForTeacher.paginator.firstPage();
    }
  }

  // go to previous page

  goBack() {
    this._location.back();
  }

// sort data in ascending or descending order for student

  sortDataForStudent(e: { active: string; direction: string }) {
    if (e.active === "title") {
      this.dataSourceForStudent.data = this.dataSourceForStudent.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.title.localeCompare(b.title);
        }
        if (e.direction === "desc") {
          return b.title.localeCompare(a.title);
        }
      });
    }
  }

// sort data in ascending or descending order for teacher


  sortDataForTeacher(e: { active: string; direction: string }) {
    if (e.active === "title") {
      this.dataSourceForTeacher.data = this.dataSourceForTeacher.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.title.localeCompare(b.title);
        }

        if (e.direction === "desc") {
          return b.title.localeCompare(a.title);
        }
      });
    }
    if (e.active === "rating") {
      this.dataSourceForTeacher.data = this.dataSourceForTeacher.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.ratingCount.localeCompare(b.ratingCount);
        }

        if (e.direction === "desc") {
          return b.ratingCount.localeCompare(a.ratingCount);
        }
      });
    }
  }
}
