import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatSnackBar, MatTableDataSource, MatDialog } from "@angular/material";
import { MoreInfoUpcomingComponent } from "../more-info-upcoming/more-info-upcoming.component";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-upcoming-class",
  templateUrl: "./upcoming-class.component.html",
  styleUrls: ["./upcoming-class.component.scss"]
})
export class UpcomingClassComponent implements OnInit {
  @Input() accountId: any;
  @Input() role: any;
  public urls = "assets/url/url.json";
  public pageNo = 0;
  public pageSize = 100;
  public page;
  public notfound = false;
  public skeleton = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  public liveclass = [];
  public liveclassroom = [];
  dataSource: any;
  public skeletonHide = false;
  public urlParameter;

  public URL;
  displayColumn: string[] = ["no", "Title", "Teacher Name", "grade", "subject", "buttons"];
  constructor(public appSettings: AppSettings, private http: HttpClient, public snackBar: MatSnackBar, public dialog: MatDialog, public route: ActivatedRoute,public router:Router) { }

  ngOnInit() {
    // this.route.pathFromRoot[1].url.subscribe(val => (this.urlParameter = val[0].path));
    this.route.params.subscribe(data => {
      this.urlParameter = data.id;
    });

    this.upcomingClass();

    this.http.get(this.urls).subscribe((data: any) => {
      this.URL = data;
      console.log(this.URL.zoomSdkUrl);
    });

   
  }

  // get all upcoming class based on the user role

  upcomingClass() {
    if (this.role === "Admin") {
      const jsonForAdmin = {
        pageNo: 0,
        maxResult: 9,
        gradeFilter: ["all"],
        syllabusFilter: ["all"],
        chapterFilter: ["all"],
        teacher: "all",
        subjectFilter: ["all"],
        startDate: "all",
        endDate: "all",
        accessTo: "all",
        dateOrder:"Asc",
        text:""

      };

      // console.log(jsonForAdmin);
      this.appSettings.getallclasses(jsonForAdmin).subscribe(
        (data: any) => {
          // console.log('hiii',data);
          this.liveclass = data.upcomingClassList.concat(data.liveClassList);
          this.liveclass.sort((a, b) => {
            const dA = a["scheduledDate"];
            const dB = b["scheduledDate"];
            return dA - dB;
          });
          if (this.liveclass.length === 0) {
            this.notfound = true;
          } else {
            for (let i = 0; i < this.liveclass.length; i++) {
              if (this.liveclass[i].sessionId != null) {
                this.liveclass[i].enable = false;
                this.liveclass[i].status = "upcoming";
                this.liveclassroom.push(this.liveclass[i]);
              }
              this.liveclass[i].scheduledDateutc = this.liveclass[i].scheduledDate;
              this.liveclass[i].enddateutc = this.liveclass[i].enddate;
            }
          }
        },
        () => { },
        () => {
          this.skeletonHide = true;
        }
      );
    } else if (this.role === "guest") {
      const jsonForGuest = {
        pageNo: 0,
        gradeName: this.urlParameter
      };

      this.appSettings.getclassbygradeForGuest(jsonForGuest).subscribe(
        (data: any) => {
          this.liveclass = data.upcomingClassList.concat(data.liveClassList);
          this.liveclass.sort((a, b) => {
            const dA = a["scheduledDate"];
            const dB = b["scheduledDate"];
            return dA - dB;
          });
          if (this.liveclass.length === 0) {
            this.notfound = true;
          } else {
            const number = 0;
            for (let i = 0; i < this.liveclass.length; i++) {
              this.liveclass[i].scheduledDate = new Date(this.liveclass[i].scheduledDate);
              this.liveclass[i].enddate = new Date(this.liveclass[i].scheduledDate.getTime() + this.liveclass[i].endTime * 60000);
              if (this.liveclass[i].sessionId != null && this.liveclass[i].accessTo != "others (Admin & teacher)") {
                this.liveclass[i].status = "upcoming";
                this.liveclass[i].enable = false;
                this.liveclass[i].position = number + 1;
                this.liveclassroom.push(this.liveclass[i]);
              }
            }
          }
        },
        () => { },
        () => {
          this.skeletonHide = true;
        }
      );
    } else if (this.role === "teacher" || this.role === "Teacher") {
		
      const data1 = {
        teacherAccountId: sessionStorage.getItem("accountId"),
        pageNo: this.pageNo
      };
      const jsonForAdmin = {
        pageNo: 0
      };
      this.appSettings.teacherclassrooms(data1).subscribe(
        (data: any) => {
          this.liveclass = data.upcomingClassList.concat(data.liveClassList);
        
          this.liveclass.sort((a, b) => {
            const dA = a["scheduledDate"];
            const dB = b["scheduledDate"];
            return dA - dB;
          });
          if (this.liveclass.length === 0) {
            this.snackBar.open("No Class assigned!!!", null, { duration: 2000 });
            this.notfound = true;
          } else {
            for (let i = 0; i < this.liveclass.length; i++) {
              this.liveclass[i].startTime = new Date(this.liveclass[i].startTime);
              this.liveclass[i].enddate = new Date(this.liveclass[i].startTime.getTime() + this.liveclass[i].endTime * 60000);
              this.liveclass[i].status = "upcoming";
              this.liveclass[i].enable = false;
              this.liveclassroom.push(this.liveclass[i]);
            }
          }
        },
        () => { },
        () => {
          this.skeletonHide = true;
        }
      );
    } else if (this.role === "otherTeacherClass") {
		
      const jsonForotherTeacherClass = {
        pageNo: 0,
        maxResult: 9,
        gradeFilter: ["all"],
        syllabusFilter: ["all"],
        chapterFilter: ["all"],
        teacher: "all",
        subjectFilter: ["all"],
        startDate: "all",
        endDate: "all",
        accessTo: "all",
		  dateOrder:"Asc",
        text:""
      };
	  
	 

      this.appSettings.getallclasses(jsonForotherTeacherClass).subscribe(
        (data: any) => {
			console.log(data)
          this.liveclass = data.upcomingClassList.concat(data.liveClassList);
          this.liveclass.sort((a, b) => {
            const dA = a["scheduledDate"];
            const dB = b["scheduledDate"];
            return dA - dB;
          });
          if (this.liveclass.length === 0) {
            this.snackBar.open("No Training Class Found!!!", null, { duration: 2000 });
            this.notfound = true;
          } else {
            for (let i = 0; i < this.liveclass.length; i++) {
              this.liveclass[i].scheduledDate = new Date(this.liveclass[i].scheduledDate);
              this.liveclass[i].enddate = new Date(this.liveclass[i].scheduledDate.getTime() + this.liveclass[i].endTime * 60000);
              if (this.liveclass[i].presenterUniqueName !== sessionStorage.getItem("accountId") && this.liveclass[i].accessTo == "others (Admin & teacher)") {
                this.liveclass[i].status = "upcoming";
                this.liveclass[i].enable = false;
                this.liveclassroom.push(this.liveclass[i]);
              }
            }
          }
        },
        () => { },
        () => {
          this.skeletonHide = true;
        }
      );
    } else {
      const jsonforStudent = {
        pageNo: 0,
        batchId: sessionStorage.getItem("accountId"),
        dateOrder:"desc",
        titleOrder:"asc"
      };
      // console.log(jsonforStudent)
   

      this.appSettings.getclassbygrade(jsonforStudent).subscribe(
        (data: any) => {
          // console.log("Hiiii",data);
          this.liveclass = data.upcomingClassList.concat(data.liveClassList);
          this.liveclass.sort((a, b) => {
            const dA = a["scheduledDate"];
            const dB = b["scheduledDate"];
            return dA - dB;
          });
          const number: any = 0;
          if (this.liveclass.length === 0) {
            this.notfound = true;
          } else {
            for (let i = 0; i < this.liveclass.length; i++) {
              // console.log(this.liveclass)
              this.liveclass[i].scheduledDate = new Date(this.liveclass[i].scheduledDate);
              this.liveclass[i].enddate = new Date(this.liveclass[i].scheduledDate.getTime() + this.liveclass[i].endTime * 60000);
              this.liveclass[i].status = "upcoming";
              this.liveclass[i].enable = false;
              this.liveclass[i].position = number + 1;
              this.liveclassroom.push(this.liveclass[i]);
            }
          }
        },
        () => { },
        () => {
          this.skeletonHide = true;
        }
      );
    }
    console.log( this.liveclassroom);
  }

  // change status for student
  // if less than 4hr, show the timer
  // if current time greater than class time, change the status to live

  enableLiveClass(data, event) {
    if (event === "Upcoming Class") {
      data.enable = true;
      data.status = "upcoming";
    } else {
      data.status = "live";
      data.enable = true;
      return;
    }
  }

  // change status for teacher
  // if less than 4hr, enable prepare url
  // if current time greater than class time, change the status to live

  enableLiveClassForTeacher(data, event) {
    if (event === "teacher Class") {
      data.status = "upcoming";
      data.enable = true;
    } else {
      data.status = "live";
      data.enable = true;
      return;
    }
  }

  // open dialog box for more info about the upcoming class

  openmoreinfoupcoming(data) {
    this.dialog.open(MoreInfoUpcomingComponent, {
      data: data
    });
  }

  // get into class(learntron)

  getintoclass(session) {
    if (this.role === "student" || this.role === "teacher") {
      this.storeToUserHistroy(session);
    }
    if (this.role === "student" || this.role === "otherTeacherClass" || this.role == "Admin") {
      this.appSettings.launchstudentclassroom(session.sessionId).subscribe((url: any) => {
        window.open(url.urls[0].url, "_self");
      });
    } else {
      window.open(session.presentUrl, "_self");
    }
  }

  getZoomMeeting(session,roleName){
      let role;
    if (roleName === "student"){
      role=0;

    }else{
      role=1;
    }
    window.open(this.URL.zoomSdkUrl+'?meetingNumber='+session.sessionId+'&role='+role,"_blank" //Need to change with zoom sdk url
    );
   
  }

  // to store the watched class sessionId in DB

  storeToUserHistroy(session) {
    const jsondata = {
      sAccountId: sessionStorage.getItem("accountId"),
      sessionId: session.sessionId,
      title: session.title
    };
    this.appSettings.studenthistory(jsondata).subscribe(
      result => { },
      () => { },
      () => {
        sessionStorage.setItem("sessionId", session.sessionId);
      }
    );
  }

  // prepare URL for teacher

  prepareUrl(session) {
    window.open(session.prepareUrl, "_self");
  }
}
