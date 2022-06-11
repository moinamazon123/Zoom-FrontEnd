import { Component, OnInit, Input } from "@angular/core";
import { CalendarEvent, CalendarEventAction } from "angular-calendar";
import { startOfDay, isSameDay, isSameMonth, addHours, addMinutes } from "date-fns";
import { MatDialog } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { ScheduleDialogComponent } from "./schedule-dialog/schedule-dialog.component";
import { AppSettings } from "../../app.settings";
import { Settings } from "../../app.settings.model";
import { Subject } from "rxjs/Subject";
import { blockTransition } from "../../theme/utils/app-animation";
import { ActivatedRoute } from "@angular/router";

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3"
  },
  green: {
    primary: "green",
    secondary: "green"
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA"
  }
};

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  animations: [blockTransition],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    "[@blockTransition]": ""
  }
})
export class ScheduleComponent implements OnInit {
  public truefalse = true;
  view = "month";
  public role;
  public users: any;
  public s1;
  public dialogdata;
  public dataToCalender: any;
  viewDate: Date = new Date();
  activeDayIsOpen = true;
  public urlParameter;
  public gradeName;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="material-icons icon-sm white">delete_forever</i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openScheduleDialogforDelete(event);
      }
    }
  ];
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  public settings: Settings;
  constructor(public appSettings: AppSettings, public dialog: MatDialog, public snackBar: MatSnackBar, public route: ActivatedRoute) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.role = sessionStorage.getItem("role");
    this.route.params.subscribe(data => {
      this.gradeName = data.id;
    });
    this.events = [];
    var d = new Date();
    var n = d.getMonth()+1;
    var w = d.getFullYear();
    var datejson = {
      month: n,
      year: w
    }

    this.scheduler(datejson);

  }

  scheduler(datejson) {
    var jsondata={
      month:datejson.month,
      year:datejson.year
    }
    if (this.role === "Admin" || this.role === "admin") {
      this.appSettings.getallclassesForCalender(jsondata).subscribe(
        (data: any) => {
          this.dialogdata = data;

          for (let i = 0; i < data.length; i++) {
            if (this.dialogdata[i].sessionId != null) {
              data[i].scheduledDate = new Date(data[i].scheduledDate);
              data[i].enddate = new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000);
              data[i].startdate = new Date(data[i].scheduledDate.getTime() - data[i].endTime * 60000);
              data[i].scheduledDateutc = new Date(data[i].scheduledDate).toUTCString();
              data[i].enddateutc = new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000).toUTCString();
              const hourutc = new Date(data[i].scheduledDate).toUTCString().slice(17, 19);
              const minutc = new Date(data[i].scheduledDate).toUTCString().slice(20, 22);
              data[i].time1 = data[i].scheduledDate.toLocaleTimeString("en-GB");

              // recorded class

              if (data[i].scheduledDate > new Date()) {
                this.dataToCalender = {
                  start: addMinutes(
                    addHours(startOfDay(new Date(data[i].scheduledDate)), new Date(data[i].scheduledDate).getHours()),
                    new Date(data[i].scheduledDate).getMinutes()
                  ),
                  end: new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000),
                  title: data[i].title,
                  color: colors.yellow,
                  actions: this.actions,
                  presenterUniqueName: data[i].presenterUniqueName,
                  gradeId: data[i].gradeId,
                  syllabusId: data[i].syllabusId,
                  subjectId: data[i].subjectId,
                  chapterId: data[i].chapterId,
                  date: data[i].scheduledDate,
                  time: data[i].time1,
                  isEdit: false,
                  durationinMinutes: data[i].endTime,
                  for: data[i].accessTo,
                  sessionId: data[i].sessionId,
                  batchId: data[i].batchId
                };
              }
              // upcoming class

              if (data[i].scheduledDate < new Date()) {
                this.dataToCalender = {
                  start: addMinutes(
                    addHours(startOfDay(new Date(data[i].scheduledDate)), new Date(data[i].scheduledDate).getHours()),
                    new Date(data[i].scheduledDate).getMinutes()
                  ),
                  end: new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000),
                  title: data[i].title,
                  color: colors.red
                };
              }

              // live class

              if (new Date() < data[i].enddate && new Date() > data[i].scheduledDate) {
                this.dataToCalender = {
                  start: addMinutes(
                    addHours(startOfDay(new Date(data[i].scheduledDate)), new Date(data[i].scheduledDate).getHours()),
                    new Date(data[i].scheduledDate).getMinutes()
                  ),
                  end: new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000),
                  title: data[i].title,
                  color: colors.green
                };
              }

              this.events.push(this.dataToCalender);
            }
            this.refresh.next();
          }
        },
        () => { },
        () => {
          this.truefalse = false;
        }
      );
    } else if (this.role === "teacher") {
      const jsonForAccountId = {
        teacherAccountId: sessionStorage.getItem("accountId"),
        month:datejson.month,
        year:datejson.year
      };

      this.appSettings.teacherCalenderClasses(jsonForAccountId).subscribe(
        (data: any) => {
          this.dialogdata = data.listOfUrl;
          if (data.listOfUrl[0].msg === "no classes has been  assigned to you") {
            this.snackBar.open("No classes has been  assigned to you", null, { duration: 2000 });
          } else {
            for (let i = 0; i < data.listOfUrl.length; i++) {
              data.listOfUrl[i].scheduledDate = new Date(data.listOfUrl[i].scheduledDate);
              data.listOfUrl[i].enddate = new Date(data.listOfUrl[i].scheduledDate.getTime() + data.listOfUrl[i].endTime * 60000);
              data.listOfUrl[i].startdate = new Date(data.listOfUrl[i].scheduledDate.getTime() - data.listOfUrl[i].endTime * 60000);
              data.listOfUrl[i].scheduledDateutc = new Date(data.listOfUrl[i].scheduledDate).toUTCString();
              data.listOfUrl[i].enddateutc = new Date(data.listOfUrl[i].scheduledDate.getTime() + data.listOfUrl[i].endTime * 60000).toUTCString();

              // recorded class

              if (data.listOfUrl[i].scheduledDate > new Date()) {
                this.dataToCalender = {
                  start: addMinutes(
                    addHours(startOfDay(new Date(data.listOfUrl[i].scheduledDate)), new Date(data.listOfUrl[i].scheduledDate).getHours()),
                    new Date(data.listOfUrl[i].scheduledDate).getMinutes()
                  ),
                  end: new Date(data.listOfUrl[i].scheduledDate.getTime() + data.listOfUrl[i].endTime * 60000),
                  title: data.listOfUrl[i].title,
                  color: colors.yellow
                };
              }
              // upcoming class

              if (data.listOfUrl[i].scheduledDate < new Date()) {
                this.dataToCalender = {
                  start: addMinutes(
                    addHours(startOfDay(new Date(data.listOfUrl[i].scheduledDate)), new Date(data.listOfUrl[i].scheduledDate).getHours()),
                    new Date(data.listOfUrl[i].scheduledDate).getMinutes()
                  ),
                  end: new Date(data.listOfUrl[i].scheduledDate.getTime() + data.listOfUrl[i].endTime * 60000),
                  title: data.listOfUrl[i].title,
                  color: colors.red
                };
              }

              // live class

              if (new Date() < data.listOfUrl[i].enddate && new Date() > data.listOfUrl[i].scheduledDate) {
                this.dataToCalender = {
                  start: addMinutes(
                    addHours(startOfDay(new Date(data.listOfUrl[i].scheduledDate)), new Date(data.listOfUrl[i].scheduledDate).getHours()),
                    new Date(data.listOfUrl[i].scheduledDate).getMinutes()
                  ),
                  end: new Date(data.listOfUrl[i].scheduledDate.getTime() + data.listOfUrl[i].endTime * 60000),
                  title: data.listOfUrl[i].title,
                  color: colors.green
                };
              }
              this.events.push(this.dataToCalender);
            }
            this.refresh.next();
          }
        },
        () => { },
        () => {
          this.truefalse = false;
        }
      );
    } else if (this.role === "student") {
      this.refresh.next();
      const jsonForStudent = {
        studentAccountId: sessionStorage.getItem("accountId"),
        freeclass: this.appSettings.URL.Freeclass[sessionStorage.getItem('gradeId')],
        month:datejson.month,
        year:datejson.year
      };

      // console.log(jsonForStudent)



      this.appSettings.StudentCalenderClasses(jsonForStudent).subscribe(
        (data: any) => {
          // console.log(data)
          for (let i = 0; i < data.length; i++) {
            data[i].scheduledDate = new Date(data[i].scheduledDate);
            data[i].enddate = new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000);
            data[i].startdate = new Date(data[i].scheduledDate.getTime() - data[i].endTime * 60000);
            data[i].scheduledDateutc = new Date(data[i].scheduledDate).toUTCString();
            data[i].enddateutc = new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000).toUTCString();

            // recorded class

            if (data[i].scheduledDate > new Date()) {
              this.dataToCalender = {
                start: addMinutes(addHours(startOfDay(new Date(data[i].scheduledDate)), new Date(data[i].scheduledDate).getHours()), new Date(data[i].scheduledDate).getMinutes()),
                end: new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000),
                title: data[i].title,
                color: colors.yellow
              };
            }

            // upcoming class

            else if (data[i].scheduledDate < new Date()) {
              this.dataToCalender = {
                start: addMinutes(addHours(startOfDay(new Date(data[i].scheduledDate)), new Date(data[i].scheduledDate).getHours()), new Date(data[i].scheduledDate).getMinutes()),
                end: new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000),
                title: data[i].title,
                color: colors.red
              };
            }

            // live class

            else if (new Date() < data[i].enddate && new Date() > data[i].scheduledDate) {
              this.dataToCalender = {
                start: addMinutes(addHours(startOfDay(new Date(data[i].scheduledDate)), new Date(data[i].scheduledDate).getHours()), new Date(data[i].scheduledDate).getMinutes()),
                end: new Date(data[i].scheduledDate.getTime() + data[i].endTime * 60000),
                title: data[i].title,
                color: colors.green
              };
            } else {
              continue;
            }
           
            this.events.push(this.dataToCalender);
            //
          }
          this.refresh.next();
        },
        () => { },
        () => {
          this.truefalse = false;
        }
      );
    } else {
      const jsonForGuest = {
        gradeName: this.gradeName,
        month:datejson.month,
        year:datejson.year
      };

      this.appSettings.getGuestCalender(jsonForGuest).subscribe(
        (data: any) => {
          for (let i = 0; i < data.listOfClassSchedular.length; i++) {
            data.listOfClassSchedular[i].scheduledDate = new Date(data.listOfClassSchedular[i].scheduledDate);
            data.listOfClassSchedular[i].enddate = new Date(data.listOfClassSchedular[i].scheduledDate.getTime() + data.listOfClassSchedular[i].endTime * 60000);
            data.listOfClassSchedular[i].startdate = new Date(data.listOfClassSchedular[i].scheduledDate.getTime() - data.listOfClassSchedular[i].endTime * 60000);
            data.listOfClassSchedular[i].scheduledDateutc = new Date(data.listOfClassSchedular[i].scheduledDate).toUTCString();
            data.listOfClassSchedular[i].enddateutc = new Date(data.listOfClassSchedular[i].scheduledDate.getTime() + data.listOfClassSchedular[i].endTime * 60000).toUTCString();

            // recorded class

            if (data.listOfClassSchedular[i].scheduledDate > new Date()) {
              this.dataToCalender = {
                start: addMinutes(
                  addHours(startOfDay(new Date(data.listOfClassSchedular[i].scheduledDate)), new Date(data.listOfClassSchedular[i].scheduledDate).getHours()),
                  new Date(data.listOfClassSchedular[i].scheduledDate).getMinutes()
                ),
                end: new Date(data.listOfClassSchedular[i].scheduledDate.getTime() + data.listOfClassSchedular[i].endTime * 60000),
                title: data.listOfClassSchedular[i].title,
                color: colors.yellow
              };
            }

            // upcoming class

            else if (data.listOfClassSchedular[i].scheduledDate < new Date()) {
              this.dataToCalender = {
                start: addMinutes(
                  addHours(startOfDay(new Date(data.listOfClassSchedular[i].scheduledDate)), new Date(data.listOfClassSchedular[i].scheduledDate).getHours()),
                  new Date(data.listOfClassSchedular[i].scheduledDate).getMinutes()
                ),
                end: new Date(data.listOfClassSchedular[i].scheduledDate.getTime() + data.listOfClassSchedular[i].endTime * 60000),
                title: data.listOfClassSchedular[i].title,
                color: colors.red
              };
            }

            // live class

            else if (new Date() < data.listOfClassSchedular[i].enddate && new Date() > data.listOfClassSchedular[i].scheduledDate) {
              this.dataToCalender = {
                start: addMinutes(
                  addHours(startOfDay(new Date(data.listOfClassSchedular[i].scheduledDate)), new Date(data.listOfClassSchedular[i].scheduledDate).getHours()),
                  new Date(data.listOfClassSchedular[i].scheduledDate).getMinutes()
                ),
                end: new Date(data.listOfClassSchedular[i].scheduledDate.getTime() + data.listOfClassSchedular[i].endTime * 60000),
                title: data.listOfClassSchedular[i].title,
                color: colors.green
              };
            } else {
              continue;
            }
            this.events.push(this.dataToCalender);
            //
          }
          this.refresh.next();
        },
        () => { },
        () => {
          this.truefalse = false;
        }
      );
    }
  }

  // expand event of the particular date

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }


  // open dialog box to add new event

  openScheduleDialog(event) {
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      data: event
    });
    dialogRef.afterClosed().subscribe(
      result => {
        this.truefalse = true;
        if (result === undefined) {
          this.truefalse = false;
        } else {
          const date = result.date.getDate();
          const month = result.date.getMonth();
          const year = result.date.getFullYear();
          const time = result.time.split(":");
          const hour = time[0];
          const min = time[1];
          const d = new Date(year, month, date, hour, min);
          if (d < new Date()) {
            this.snackBar.open("schedule class after current time", null, { duration: 2000 });
            this.truefalse = false;
          } else {
            const end = new Date(d.getTime() + result.durationinMinutes * 60000);
            result.start = d;
            result.end = end;

            if (result) {
              if (!result.isEdit) {
                result.color = colors.yellow;
                result.actions = this.actions;
                this.events.push(result);
                this.refresh.next();
                setTimeout(() => {
                  this.truefalse = false;
                  this.ngOnInit();
                }, 3000);
              } else {
              }
            }
          }
        }
      },
      () => { },
      () => { }
    );
  }

  // open dialog box to edit the event

  openScheduleDialogforEdit(event) {
    event.isEdit = false;
    const index = this.events.findIndex((x: any) => x.sessionId === event.sessionId);
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      data: event
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.truefalse = true;
        if (result === undefined) {
          this.truefalse = false;
        } else {
          const date = result.date.getDate();
          const month = result.date.getMonth();
          const year = result.date.getFullYear();
          const time = result.time.split(":");
          const hour = time[0];
          const min = time[1];
          const d = new Date(year, month, date, hour, min);
          if (d < new Date()) {
            this.truefalse = false;
            this.snackBar.open("schedule class after current time", null, { duration: 2000 });
          } else {
            this.events.splice(index, 1);

            const end = new Date(d.getTime() + result.durationinMinutes * 60000);
            result.start = d;
            result.end = end;

            if (result) {
              if (result.isEdit) {
                result.color = colors.yellow;
                result.actions = this.actions;
                this.events.push(result);
                setTimeout(() => {
                  this.truefalse = false;
                }, 3000);
                this.refresh.next();
              } else {
              }
            }
          }
        }
      },
      () => { },
      () => { }
    );
  }

  // open dialog box to delete the recorded class

  openScheduleDialogforDelete(event) {
    alert()
    event.isEdit = true;
    const index = this.events.findIndex((x: any) => x.sessionId === event.sessionId);

    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      event.isEdit = false;
      this.truefalse = true;
      if (result === undefined) {
        this.truefalse = false;
      } else {
        this.truefalse = false;
        this.events.splice(index, 1);
        this.refresh.next();
      }
    });
  }
  datechange(event) {
    var d = new Date(event);
    var n = d.getMonth()+1;
    var w = d.getFullYear();
    var datejson = {
      month: n,
      year: w
    }
    this.dataToCalender={}
    this.scheduler(datejson);
    this.events=[]
    
  }
}


