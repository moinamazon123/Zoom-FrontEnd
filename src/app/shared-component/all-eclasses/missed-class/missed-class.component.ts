import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

@Component({
  selector: "app-missed-class",
  templateUrl: "./missed-class.component.html",
  styleUrls: ["./missed-class.component.scss"]
})
export class MissedClassComponent implements OnInit {
  @Input() accountId: any;
  @Input() batchId: any;
  @Output() AllmissedClass = new EventEmitter();
  @Output() getAlllength = new EventEmitter();
  @Input() pageNo: any;
  @Input() pageSize: any;
  public sessionsOfStudent: any;
  public allclasses: any;
  public overallRating: any;
  public missedClassrooms: any = [];
  checkurl;
  constructor(public appSettings: AppSettings) { }

  ngOnInit() {
    this.appSettings.startDate = "all";
    this.appSettings.subjectSelected = "all";
    // this.missedClass();
  }

  // list of missed class

  missedClass(filters) {
    this.missedClassrooms = [];
    
    // console.log(filters)

    if(this.checkurl){
     this.checkurl.unsubscribe();
    }
    
    this.checkurl=this.appSettings.missedClasses(filters).subscribe(
      (MissedClasses: any) => {
        // console.log(MissedClasses)
        this.getAlllength.emit(MissedClasses.missedClassesCount);
        const missedclassjson = MissedClasses.missedClasses;
        this.allclasses = missedclassjson;

        for (let i: any = 0; i < this.allclasses.length; i++) {
          this.overallRating = 0;

          this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
          this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + this.allclasses[i].endTime * 60000);

          this.allclasses[i].status = "Missed Class";
          this.allclasses[i].slno = i + 1;
          this.missedClassrooms.push(this.allclasses[i]);
        }
      },
      () => { },
      () => {
        this.AllmissedClass.emit(this.missedClassrooms);
      }
    );
  }
}
