import { Component, OnInit, Input } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatSnackBar } from "@angular/material";
import { DemoUpcomingDialogComponent } from "../demo-upcoming-dialog/demo-upcoming-dialog.component";

@Component({
  selector: "app-demo-upcomingclass",
  templateUrl: "./demo-upcomingclass.component.html",
  styleUrls: ["./demo-upcomingclass.component.scss"]
})
export class DemoUpcomingclassComponent implements OnInit {
  @Input() public role: any;
  public allclasses = [];
  public demoliveclassroom = [];
  public notfound: any = false;
  public overallRating = 0;
  public skeletonHide = false;
  public id;
  public gradeName;
  public demoClasses;
  public random;
  public currentDate;
  public selectedGrade;
  public skeleton = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  constructor(public appSettings: AppSettings, public route: ActivatedRoute, public dialog: MatDialog, public snackbar: MatSnackBar) {}

  ngOnInit() {
    this.currentDate = new Date();
    if (this.role != "parent") {
      this.route.params.subscribe(data => {
        this.gradeName = data.id;
      });
    } else {
      this.gradeName = "6";
    }
    this.demoUpcomingClass(this.gradeName);
  }

  // get all demo upcoming class

  demoUpcomingClass(data) {
    this.skeletonHide = false;
    this.notfound = false;
    this.selectedGrade = data;
    this.allclasses = [];
    this.demoliveclassroom = [];

    // get all demo upcoming class based on grade

    const jsonForPagination = {
      pageNo: 0,
      accessTo: "Guest",
      gradeName: this.selectedGrade
    };

    this.appSettings.getGuestClass(jsonForPagination).subscribe(
      (data: any) => {
        this.allclasses = data.upcomingClassList.concat(data.liveClassList);
        this.allclasses.sort(function(a, b) {
          const dtA = new Date(a["scheduledDate"]),
            dtB = new Date(b["scheduledDate"]);
          return dtA.getTime() - dtB.getTime();
        });
        if (this.allclasses.length === 0) {
          this.notfound = true;
        } else {
          // get all the booked class of demo member

          const jsonForAccount = {
            accountId: sessionStorage.getItem("accountId")
          };
          this.appSettings.getDemoClass(jsonForAccount).subscribe(
            (DemoClasses: any) => {
              this.demoClasses = DemoClasses;
            },
            () => {},
            () => {
              for (let i = 0; i < this.allclasses.length; i++) {
                this.allclasses[i].booked = false;
                this.allclasses[i].FullSlot = false;
                this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
                this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + this.allclasses[i].endTime * 60000);
                if (this.demoClasses.length > 0) {
                  for (let j = 0; j < this.demoClasses.length; j++) {
                    if (this.allclasses[i].sessionId === this.demoClasses[j].sessionId) {
                      this.allclasses[i].booked = true;
                      this.allclasses[i].enable = false;
                    }
                  }
                } else {
                }
                this.demoliveclassroom.push(this.allclasses[i]);
              }
            }
          );
        }
      },
      () => {},
      () => {
        this.skeletonHide = true;
      }
    );
  }

  // book the slot for demo class. (check if demo member already booked the class for same subject)

  bookSlot(data) {
    let notBooked = true;
    if (this.demoClasses.length > 0) {
      for (let i = 0; i < this.demoClasses.length; i++) {
        if (this.demoClasses[i].subjectId == data.subjectId) {
          this.snackbar.open("Your one free demo class for this subject has been already taken!!!", null, { duration: 4000 });
          notBooked = false;
        }
      }
    }
    if (notBooked) {
      this.bookslotConfirmation(data);
    }
  }

  // confirmation about the slot booking

  bookslotConfirmation(data) {
    const jsonForBooking = {
      accountId: sessionStorage.getItem("accountId"),
      sessionId: data.sessionId
    };
    this.appSettings.bookSlotForClass(jsonForBooking).subscribe(data => {
      if (data) {
        this.snackbar.open("Slot Booked for demo class..!!!", null, { duration: 3000 });
        this.skeletonHide = false;
        this.demoUpcomingClass(this.selectedGrade);
      }
    });
  }

  // enable live class for booked classes

  enableLiveClass(data, event) {
    if (event !== "Upcoming Class") {
      data.status = "live";
      data.enable = true;
      return;
    }
  }

  // open dialog box for more info about demo upcoming class

  openmoreinfoupcoming(data) {
    this.dialog.open(DemoUpcomingDialogComponent, {
      data: data
    });
  }

  // get into upcoming class (learntron)

  getintoclassforGuest(sessionId) {
    sessionStorage.setItem("sessionId", sessionId);
    this.appSettings.launchstudentclassroom(sessionId).subscribe((url: any) => {
      window.open(url.urls[0].url, "_self");
    });
  }
}
