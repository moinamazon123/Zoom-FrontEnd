import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

@Component({
  selector: "app-incompleted-class",
  templateUrl: "./incompleted-class.component.html",
  styleUrls: ["./incompleted-class.component.scss"]
})
export class IncompletedClassComponent implements OnInit {
  @Input() accountId: any;
  @Output() AllIncompetedClass = new EventEmitter();
  @Output() getAlllength = new EventEmitter();
  @Input() pageNo: any;
  @Input() pageSize: any;
  public sessionsOfStudent: any;
  public allclasses: any;
  public overallRating: any;
  public IncompletedClassrooms: any = [];checkurl;
  constructor(public appSettings: AppSettings) { }

  ngOnInit() {
    this.appSettings.startDate = "all";
    this.appSettings.subjectSelected = "all";
    // this.InCompletedClass();
  }

  // list of incompleted class

  InCompletedClass(jsonForMissedClass) {
    this.IncompletedClassrooms = [];
    var jsonForMissedClass: any;
    var jsonForMissedClass: any;
    if(this.checkurl){
      this.checkurl.unsubscribe();
     }
     
     this.checkurl=this.appSettings.incompletedClasses(jsonForMissedClass).subscribe(
      (IncomletedClasses: any) => {
        // console.log(IncomletedClasses)
        const Imclassjson = IncomletedClasses.inCompletedClasses;
        this.getAlllength.emit(IncomletedClasses.inCompletedClassesCount);

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
          this.IncompletedClassrooms.push(this.allclasses[i]);
        }
      },
      () => { },
      () => {
        this.AllIncompetedClass.emit(this.IncompletedClassrooms);
        // console.log(this.IncompletedClassrooms)
      }
    );
  }
}
