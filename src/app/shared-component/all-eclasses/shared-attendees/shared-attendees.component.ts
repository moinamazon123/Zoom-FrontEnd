import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatTableDataSource, MatSnackBar, MatPaginator } from "@angular/material";
import { Location } from "@angular/common";

@Component({
  selector: "app-shared-attendees",
  templateUrl: "./shared-attendees.component.html",
  styleUrls: ["./shared-attendees.component.scss"]
})
export class SharedAttendeesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() sessionId: any;
  @Input() title: any;
  public dataToDisplay: any;
  public classStartTime: any;
  public classEndTime: any;
  public dataSource: any;
  public notfound = false;
  displayedColumns: string[] = ["position", "name", "loginTime", "logoutTime", "exit", "progress"];

  constructor(public appSettings: AppSettings, public snackBar: MatSnackBar, public location: Location) {}

  ngOnInit() {
    this.Attendees(this.sessionId);
  }

  // get the attendees of the live class from learntron

  Attendees(sessionId) {
    this.dataToDisplay = [];
    if (this.appSettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }

    this.appSettings.classanalytics(sessionId).subscribe(
      (data: any) => {
        this.classStartTime = new Date(data[0].startTime).toLocaleString();
        this.classEndTime = new Date(data[0].endTime).toLocaleString();

        if (undefined === data[0].participants || data[0].participants.length === 0) {
          this.snackBar.open("No Student Attended The Live Class!!", null, {
            duration: 2000
          });
          this.notfound = true;
        } else {
          const k = 0;
          const starttime: any = new Date(data[0].startTime).getTime() / 1000;
          const endtime: any = new Date(data[0].endTime).getTime() / 1000;
          const teacherspent = endtime - starttime;

          for (let i = 0; i < data[0].participants.length; i++) {
            if (data[0].participants[i].durationInfos.length > 0) {
              this.dataToDisplay.push(data[0].participants[i]);

              data[0].participants[i].position = k + 1;
              data[0].participants[i].name = data[0].participants[i].participantDisplayName;
              data[0].participants[i].exit = data[0].participants[i].durationInfos.length - 1;

              data[0].participants[i].logintime = new Date(data[0].participants[i].durationInfos[0].startTime).toLocaleString();
              data[0].participants[i].logouttime = new Date(data[0].participants[i].durationInfos[data[0].participants[i].durationInfos.length - 1].endTime).toLocaleString();

              const studentstarttime: any = new Date(data[0].participants[i].durationInfos[0].startTime).getTime() / 1000;
              const studentendtime: any = new Date(data[0].participants[i].durationInfos[data[0].participants[i].durationInfos.length - 1].endTime).getTime() / 1000;
              const totaltimespentinclass = studentendtime - studentstarttime;
              const totaper = (totaltimespentinclass / teacherspent) * 100;
              data[0].participants[i].progress = totaper;
            } else {
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.dataToDisplay);
      },
      (error: any) => {
        this.snackBar.open(error.error.exceptionMessage, null, {
          duration: 2000
        });
        this.notfound = true;
      },
      () => {
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  // search the data

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

// move to previous page

  moveback() {
    this.location.back();
  }
}
