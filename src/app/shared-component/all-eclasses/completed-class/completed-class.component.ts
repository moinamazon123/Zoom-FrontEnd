import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { Observable, forkJoin, pipe } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-completed-class",
  templateUrl: "./completed-class.component.html",
  styleUrls: ["./completed-class.component.scss"]
})
export class CompletedClassComponent implements OnInit {
  @Input() accountId: any;
  @Output() AllCompletedClass = new EventEmitter();
  @Output() getAlllength = new EventEmitter();
  @Input() pageNo: any;
  @Input() pageSize: any;
  public sessionsOfStudent: any = [];
  public allclasses: any;
  public overallRating: any;
  public completedClassroom: any = []; checkurl;
  constructor(public appSettings: AppSettings) { }


  ngOnInit() {
    this.appSettings.startDate = "all";
    this.appSettings.subjectSelected = "all";
    // this.completedClass(filters);
  }

  // list of completed class
  completedClasses(jsonForMissedClass) {
    this.completedClassroom = [];
    if (this.checkurl) {
      this.checkurl.unsubscribe();
    }

    this.checkurl = this.appSettings.completedClasses(jsonForMissedClass).subscribe(
      (IncomletedClasses: any) => {
        // console.log(IncomletedClasses)
        const Imclassjson = IncomletedClasses.completedClasses;
        this.getAlllength.emit(IncomletedClasses.completedClassesCount);

        this.allclasses = Imclassjson;

        this.allclasses.sort(function (a, b) {
          const dtA = new Date(a["scheduledDate"]),
            dtB = new Date(b["scheduledDate"]);
          return dtB.getTime() - dtA.getTime();
        });

        for (let i: any = 0; i < this.allclasses.length; i++) {
          this.overallRating = 0;

          this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
          this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + this.allclasses[i].endTime * 60000);

          this.allclasses[i].status = "Incompleted Class";
          this.allclasses[i].slno = i + 1;
          this.completedClassroom.push(this.allclasses[i]);
        }
      },
      () => { },
      () => {
        this.AllCompletedClass.emit(this.completedClassroom);
        console.log(this.completedClassroom)
      }
    );
  }

// completedClass(filters) {
//   this.completedClassroom = [];
//   let k = 1;
//   this.appSettings.sessionofstudent(this.accountId).subscribe(
//     data => {
//       this.sessionsOfStudent = data;
//     },
//     () => { },
//     () => {
//       if (this.sessionsOfStudent.length > 0) {

//         this.completedClassFunc(this.sessionsOfStudent).subscribe(
//           (classDetail: any) => {
//             this.allclasses = classDetail;
//             console.log('edcdscsdcsd',this.allclasses);
//             this.allclasses.sort(function (a, b) {
//               const dtA = new Date(a["scheduledDate"]),
//                 dtB = new Date(b["scheduledDate"]);
//               return dtB.getTime() - dtA.getTime();
//             });

//             for (let i = 0; i < classDetail.length; i++) {
//               if (this.allclasses[i].msg !== "No Record Found!" && this.allclasses[i].msg !== "View duration is below 90%.") {
//                 this.overallRating = 0;
//                 this.allclasses[i].rating = 0;
//                 this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
//                 this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + this.allclasses[i].endTime * 60000);

//                 this.allclasses[i].status = "completed";
//                 this.allclasses[i].slno = k;
//                 this.completedClassroom.push(this.allclasses[i]);
//                 k++;
//               }
//             }
//           },
//           () => { },
//           () => {
//             // this.allCompletedClass.emit(this.completedClassroom);

//           }
//         );
//       } else {
//         this.allCompletedClass.emit(this.completedClassroom);
//       }
//     }
//   );
// }

// to get the completed class one by one from the backend

completedClassFunc(session) {
  const completedClassData = [];

  // session.forEach(element => {
  // const jsonForCompletedClass = {
  //   studentAccountId: this.accountId,
  //   sessionId: element.sessionId
  // };
  var jsonForCompletedClass: any;
  var jsonForMissedClass: any;
  if (this.appSettings.slectedsylabus == "all") {
    jsonForCompletedClass = {

      studentAccountId: this.accountId

    };
    if (this.appSettings.startDate != "all") {
      jsonForCompletedClass['startDate'] = this.appSettings.startDate
    }
    if (this.appSettings.endDate != "all") {
      jsonForCompletedClass['endDate'] = this.appSettings.endDate
    }
  } else {
    jsonForCompletedClass = {
      syllabusFilter: [this.appSettings.slectedsylabus],
      studentAccountId: this.accountId
    };
    if (this.appSettings.startDate != "all") {
      jsonForCompletedClass['scheduledDate'] = this.appSettings.startDate
    }
  }

  if (this.appSettings.subjectSelected == "all") {
    if (this.appSettings.slectedsylabus == 'all') {
      jsonForCompletedClass = {


        studentAccountId: this.accountId
        // scheduledDate: this.startDate
      };
      if (this.appSettings.startDate != "all") {
        jsonForCompletedClass['startDate'] = this.appSettings.startDate
      }
      if (this.appSettings.endDate != "all") {
        jsonForCompletedClass['endDate'] = this.appSettings.endDate
      }
    } else {
      jsonForCompletedClass = {

        syllabusFilter: [this.appSettings.slectedsylabus],


        studentAccountId: this.accountId
        // scheduledDate: this.startDate
      };
      if (this.appSettings.startDate != "all") {
        jsonForCompletedClass['startDate'] = this.appSettings.startDate
      }
      if (this.appSettings.endDate != "all") {
        jsonForCompletedClass['endDate'] = this.appSettings.endDate
      }
    }

  } else {
    jsonForCompletedClass = {
      // gradeFilter: [this.appSettings.userdetails.gradeId],
      syllabusFilter: [this.appSettings.slectedsylabus],
      subjectFilter: [this.appSettings.subjectSelected],

      studentAccountId: this.accountId
      // scheduledDate: this.startDate
    };
    if (this.appSettings.startDate != "all") {
      jsonForCompletedClass['startDate'] = this.appSettings.startDate
    }
    if (this.appSettings.endDate != "all") {
      jsonForCompletedClass['endDate'] = this.appSettings.endDate
    }
  }
  if (jsonForCompletedClass['endDate'] == undefined) {
    delete jsonForCompletedClass['endDate'];
  }
  // jsonForCompletedClass.freeclass = this.appSettings.URL.Freeclass[sessionStorage.getItem('gradeId')];
  // console.log(jsonForCompletedClass)
  jsonForCompletedClass.ids = session;
  // console.log('sffssfsd', jsonForCompletedClass)
  let k = 1;
  // completedClassData.push(
  this.appSettings.completedClass(jsonForCompletedClass).subscribe((classDetail: any) => {
    // console.log(res)
    this.allclasses = classDetail;
    // console.log('edcdscsdcsd', this.allclasses);
    this.allclasses.sort(function (a, b) {
      const dtA = new Date(a["scheduledDate"]),
        dtB = new Date(b["scheduledDate"]);
      return dtB.getTime() - dtA.getTime();
    });

    for (let i = 0; i < classDetail.length; i++) {
      if (this.allclasses[i].msg !== "No Record Found!" && this.allclasses[i].msg !== "View duration is below 90%.") {
        this.overallRating = 0;
        this.allclasses[i].rating = 0;
        this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
        this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + this.allclasses[i].endTime * 60000);

        this.allclasses[i].status = "completed";
        this.allclasses[i].slno = k;
        this.completedClassroom.push(this.allclasses[i]);
        k++;
      }
    }
    this.AllCompletedClass.emit(this.completedClassroom);

  })
  // )
  // );
  // });
  return forkJoin(completedClassData);
}
}

