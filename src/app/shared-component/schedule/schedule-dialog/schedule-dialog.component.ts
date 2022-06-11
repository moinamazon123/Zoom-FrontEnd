import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from "../../../app.settings";
import { NgxXml2jsonService } from "ngx-xml2json";
import { MatDialog } from "@angular/material";
import { Schedule } from "../schedule.model";
import { SendmailDialogComponent } from "../sendmail-dialog/sendmail-dialog.component";
import { ZoomMeetingRequest } from "../zoom-model";
import { Settings } from "../../../app.settings.model";
import { MeetingSettings } from "../Settings";

declare var $: any;
@Component({
  selector: "app-schedule-dialog",
  templateUrl: "./schedule-dialog.component.html"
})
export class ScheduleDialogComponent implements OnInit {
  public form: FormGroup;
  public showloader = false;
  public timezone;
  public subs;
  public newmonth;
  public filenamefordisplay;
  public filename1fordisplay;
  public s1;
  public uploadtf: any = false;
  public uploadtf1: any = false;
  public filename;
  public selectedGrade: any;
  public selectedSyllabus: any;
  public isvalid: any;
  public isvalid1 = false;
  public truefalse = false;
  public truefalse1 = false;
  public filename1;
  public scheduledata;
  public resend = false;
  public resend1 = false;
  public isvalid3 = false;
  public formData: FormData = new FormData();
  public formData1: FormData = new FormData();
  public users: any = [];
  public grdaes: any = [];
  public sys: any = [];
  public sub: any = [];
  public sendmail: any = ["yes", "no"];
  access: string[] = ["Demo", "Members", "others (Admin & teacher)"];
  chapterName: string[] = ["chemistry"];
  public scheduleDate: any;
  public presenterDisplayName;
  public teacherselected;
  public finalScheduledData: any;
  minDate = new Date();
  public endTime: any;
  public chapter: any;
  public batches;
  public updatedResult;

  shedulerformat: ZoomMeetingRequest;
  settings:MeetingSettings;
  validToken=false;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public user: Schedule,
    public appSettings: AppSettings,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(85)])],
      presenterUniqueName: [this.teacherselected, Validators.required],
      subjectId: ["", Validators.required],
      gradeId: ["", Validators.required],
      chapterId: ["", Validators.required],
      batchId: [""],
      syllabusId: ["", Validators.required],
      date: ["", Validators.required],
      time: ["", Validators.required],
      isEdit: false,
      durationinMinutes: ["", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5), Validators.pattern(new RegExp("^[0-9]+$"))])],
      for: ["", Validators.required],
      sessionId: null,
      start: null,
      end: null,
      actions: null,
      color: null
    });
  }

  ngOnInit() {

    // CHECK Token validity

    this.appSettings.isValidToken().subscribe(data=>{
        console.log(data);
        if(data){
          
        this.validToken = true;
        }else{
          this.validToken = false;
        }
    },
    (error) => { },
    );


    this.scheduledata = this.user;
    if (this.user) {
      if (this.user.for === "Guest") {
        this.user.for = "Demo";
      }
      this.form.setValue(this.user);
      this.filenamefordisplay = this.user.fileName;
      this.filename1fordisplay = this.user.fileName1;
      this.selectedSyllabus = this.form.value.syllabusId;
      this.selectsys(this.form.value.gradeId);
      this.selectsubup(this.form.value.gradeId, this.form.value.syllabusId);
      this.selectedBatch(this.form.value.gradeId, this.form.value.syllabusId);
      this.selectchapter(this.form.value.gradeId, this.form.value.syllabusId, this.form.value.subjectId);
    } else {
      this.user = new Schedule();
    }

    this.appSettings.loadallgradefunction().subscribe(data => {
      this.grdaes = data;
console.log(this.grdaes);
    });

    this.appSettings.getallsubscription().subscribe(data => {
      this.subs = data;
    });

    if (this.data) {
      this.form.patchValue({
        title: this.data.title,
        start: this.data.start,
        end: this.data.end,
        isEdit: true
      });
    }
    this.appSettings.getallteachersfunction().subscribe((data: any) => {
      this.users = data;
    });
  }

  // close the dialog box

  close(): void {
    this.dialogRef.close();
  }

  // select program

  selectsys(data) {
    // console.log(data);
    this.sub = [];
    this.chapter = [];
    this.appSettings.getsylabus(data).subscribe(sylabus => {
      this.sys = sylabus;
    });
  }

  // select subject

  selectsub(data) {
    // console.log(data);
    this.chapter = [];
    this.appSettings.getsubjects(this.selectedGrade, data).subscribe(
      subject => {
        this.sub = subject;
      },
      () => { },
      () => {
        const jsonForBatch = {
          syllabusId: data,
          gradeId: this.selectedGrade,
          pageNo:"0",
          maxResult:"1000",
          dateOrder:'desc'
        };
        this.appSettings.getBatcheBasedOnGradeSyllabus(jsonForBatch).subscribe(batch => {
          this.batches = batch["batchList"];
        });
      }
    );
  }

  // select subject for setting the form while edit

  selectsubup(a, b) {
    this.appSettings.getsubjects(a, b).subscribe(
      subject => {
        this.sub = subject;
        this.selectedGrade = a;
      },
      () => { },
      () => { }
    );
  }

  // select the batch

  selectedBatch(a, b) {
    const jsonForBatch = {
      syllabusId: b,
      gradeId: a,
	     pageNo:"0",
          maxResult:"1000",
          dateOrder:'desc'
    };
    this.appSettings.getBatcheBasedOnGradeSyllabus(jsonForBatch).subscribe(batch => {
      this.batches = batch["batchList"];
    });
  }

  // select the chapter

  selectchapter(grade, syllabus, subject) {
    this.appSettings.getChapters(grade, syllabus, subject).subscribe(chapter => {
      this.chapter = chapter;
    });
  }

  // schedule new class

  scheduleforNew(data) {
   
    this.appSettings.getallteachersfunction().subscribe(
      (data1: any) => {
        data1.forEach(_element => {
          this.s1 = data1.filter(x => x.accountId === data.presenterUniqueName);
        });
      },
      () => { },
      () => {
        const date = data.date.getDate();
        const month = data.date.getMonth();
        const year = data.date.getFullYear();

        const fullformat = data;
        const subscriptions = data.subscription;
        const teacherId = data.presenterUniqueName;
        const time = data.time.split(":");

        const hour = time[0];
        const min = time[1];
        this.scheduleDate = new Date(year, month, date, hour, min);
        this.endTime = new Date(this.scheduleDate.getTime() + data.durationinMinutes * 60000);
        this.timezone = new Date(this.scheduleDate).toString().slice(24, 32);
        this.newmonth = data.date.getMonth() + 1;

        if (this.scheduleDate < new Date()) {
          this.snackBar.open("schedule class after current time", null, { duration: 4000 });
        } else {
          const shedulerformat: any = {
            title: data.title,

            scheduledDate: this.scheduleDate,

            durationinMinutes: data.durationinMinutes,

            canExtend: true,

            redirectUrl: "https://app.yolearn.com/#/feedback/" + data.title,

            presenterUniqueName: this.s1[0].accountId,

            presenterDisplayName: this.s1[0].firstName,

            isRecordedSessionViewable: true,

            forceExitParticipants: false,

            restartSession: true
          };
          this.appSettings.liveclassroomsheduler(shedulerformat).subscribe(
            (learntrondata: any) => {
              const dd1 = year + "-" + this.newmonth + "-" + date + " " + hour + ":" + min + ":" + "00";
              const dd = new Date(this.scheduleDate)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              const endTimeISO = new Date(this.endTime)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              shedulerformat.sessionId = learntrondata.sessionId;
              shedulerformat.subscriptionId = subscriptions;
              shedulerformat.teacherId = teacherId;
              shedulerformat.guestUrl = learntrondata.guestUrl;
              shedulerformat.prepareUrl = learntrondata.prepareUrl;
              shedulerformat.presentUrl = learntrondata.presentUrl;
              shedulerformat.replayUrl = learntrondata.replayUrl;
              shedulerformat.scheduledDate = dd;
              shedulerformat.endDate = endTimeISO;
              shedulerformat.gradeId = fullformat.gradeId;
              shedulerformat.batchId = fullformat.batchId;
              shedulerformat.chapterId = fullformat.chapterId;
              shedulerformat.syllabusId = fullformat.syllabusId;
              shedulerformat.subjectId = fullformat.subjectId;
              shedulerformat.presenterDisplayName=this.s1[0].firstName;
              shedulerformat.durationinMinutes =  data.durationinMinutes;
              shedulerformat.sheduletimeformail = dd1;
              
            },
            () => { },
            () => {
              shedulerformat.fileName = this.filename;
              shedulerformat.assignment = this.filename1;
              if (fullformat.for === "Demo") {
                shedulerformat.accessTo = "Guest";
              } else {
                shedulerformat.accessTo = fullformat.for;
              }

              if (fullformat.for === "Demo" || fullformat.for === "others (Admin & teacher)") {
                shedulerformat.batchId = "";
              }
         
              this.appSettings.liveclassroomshedulerdb(shedulerformat).subscribe(
                (scheduledata: any) => {
                  this.finalScheduledData = scheduledata;
                  this.snackBar.open(scheduledata.msg, null, { duration: 2000 });
                  this.isvalid1 = false;
                  this.isvalid = 0;
                },
                () => { },
                () => {
                  if (this.finalScheduledData.msg === "class scheduled succesfully" && this.finalScheduledData.accessTo == "Members") {
                    this.openSendmailDialog(shedulerformat);
                  }
                }
              );
            }
          );
        }
      }
    );
  }

//schedule zoom meeting added by moin

scheduleforNewZoomMeeting(data) {
 
  this.appSettings.getallteachersfunction().subscribe(
    (data1: any) => {
      data1.forEach(_element => {
        this.s1 = data1.filter(x => x.accountId === data.presenterUniqueName);
      });
    },
    () => { },
    () => {
      const date = data.date.getDate();
      const month = data.date.getMonth();
      const year = data.date.getFullYear();

      const fullformat = data;
      const subscriptions = data.subscription;
      const teacherId = data.presenterUniqueName;
      const time = data.time.split(":");

      

      const hour = time[0];
      const min = time[1];
      this.scheduleDate = new Date(year, month, date, hour, min);
      this.endTime = new Date(this.scheduleDate.getTime() + data.durationinMinutes * 60000);
      this.timezone = new Date(this.scheduleDate).toString().slice(24, 32);
      this.newmonth = data.date.getMonth() + 1;

      if (this.scheduleDate < new Date()) {
        this.snackBar.open("schedule class after current time", null, { duration: 4000 });
      } else {
       
        const shedulerformat: any = {
          title: data.title,

          scheduledDate: this.scheduleDate,

          durationinMinutes: data.durationinMinutes,

          canExtend: true,

          redirectUrl: "https://app.yolearn.com/#/feedback/" + data.title,

          presenterUniqueName: this.s1[0].accountId,

          presenterDisplayName: this.s1[0].firstName,

          isRecordedSessionViewable: true,

          forceExitParticipants: false,

          restartSession: true
        };
        console.log("Date :",date ,"Time: ",time ,new Date(this.scheduleDate).toISOString().split("T")[0]+"T"+hour+":"+min+":00.000Z");

        this.settings = new MeetingSettings();
        this.settings.allow_multiple_devices=true;
        //this.settings.alternative_hosts="moinamazon123@gmail.com";
        this.settings.alternative_hosts_email_notification=true;
        this.settings.approval_type=2
        this.settings.enable = true;
        this.settings.method="approve";

        this.shedulerformat = new ZoomMeetingRequest();
        this.shedulerformat.agenda=data.title;
        this.shedulerformat.default_password=false;
        this.shedulerformat.duration=data.durationinMinutes;
        this.shedulerformat.pre_schedule=false;
        this.shedulerformat.settings=this.settings
        this.shedulerformat.audio="telephony";
        this.shedulerformat.start_time = new Date(this.scheduleDate).toISOString().split("T")[0]+"T"+hour+":"+min+":00.000Z";//Time zone fix in zoom; this.scheduleDate;
        this.shedulerformat.topic=data.title;
        this.shedulerformat.join_before_host=false;
        this.shedulerformat.in_meeting=false;
        this.shedulerformat.email_notification=true;
        this.shedulerformat.cn_meeting=false;
        this.shedulerformat.close_registration=false;
        this.shedulerformat.auto_recording="cloud";

        console.log(this.shedulerformat)
         this.appSettings.liveclassroomshedulerZoom(this.shedulerformat).subscribe(
          (learntrondata: any) => {
            const dd1 = year + "-" + this.newmonth + "-" + date + " " + hour + ":" + min + ":" + "00";
            const dd = new Date(this.scheduleDate)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
            const endTimeISO = new Date(this.endTime)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
           console.log(learntrondata)
           
           this.shedulerformat.sessionId = learntrondata.id;
           this.shedulerformat.subscriptionId = subscriptions;
           this.shedulerformat.teacherId = teacherId;
           this.shedulerformat.presentUrl = learntrondata.start_url;
           this.shedulerformat.replayUrl = learntrondata.join_url;
         
           this.shedulerformat.scheduledDate = new Date(this.scheduleDate).toISOString().split("T")[0]+" "+hour+":"+min+":00"//dd;
           this.shedulerformat.endDate = new Date(this.scheduleDate.getTime() + data.durationinMinutes * 60000);//new Date(this.endTime).toISOString().split("T")[0]+" "+hour+":"+min+":00"//dd;
           
           //endTimeISO;
           this.shedulerformat.gradeId = fullformat.gradeId;
           this.shedulerformat.batchId = fullformat.batchId;
           this.shedulerformat.chapterId = fullformat.chapterId;
           this.shedulerformat.syllabusId = fullformat.syllabusId;
           this.shedulerformat.subjectId = fullformat.subjectId;
           this.shedulerformat.sheduletimeformail = learntrondata.start_time;//dd1;
           this.shedulerformat.duration = data.durationinMinutes;
           this.shedulerformat.topic = learntrondata.topic;
           this.shedulerformat.title = learntrondata.topic;
           this.shedulerformat.presenterDisplayName=this.s1[0].firstName;
           this.shedulerformat.durationinMinutes =  data.durationinMinutes;


          },
          (error) => { 
            console.log(error); 
          },
          () => {
            this.shedulerformat.fileName = this.filename;
            this.shedulerformat.assignment = this.filename1;
            if (fullformat.for === "Demo") {
              this.shedulerformat.accessTo = "Guest";
            } else {
              this.shedulerformat.accessTo = fullformat.for;
            }

            if (fullformat.for === "Demo" || fullformat.for === "others (Admin & teacher)") {
              this.shedulerformat.batchId = "";
            }

            this.appSettings.liveclassroomshedulerdb(this.shedulerformat).subscribe(
              (scheduledata: any) => {
                this.finalScheduledData = scheduledata;
                this.snackBar.open(scheduledata.msg, null, { duration: 2000 });
                this.isvalid1 = false;
                this.isvalid = 0;
              },
              () => { },
              () => {
                if (this.finalScheduledData.msg === "class scheduled succesfully" && this.finalScheduledData.accessTo == "Members") {
                  this.openSendmailDialog(this.shedulerformat);
                }
              }
            );
          }
        );
      }
    }
  );
}


  // edit the scheduled class

  scheduleforUpdate(data) {
    this.appSettings.getallteachersfunction().subscribe(
      (data1: any) => {
        data1.forEach(_element => {
          this.s1 = data1.filter(x => x.accountId === data.presenterUniqueName);
        });
      },
      () => { },
      () => {
        const date = data.date.getDate();
        const month = data.date.getMonth();
        const year = data.date.getFullYear();
        const fullformat = data;
        const time = data.time.split(":");
        const hour = time[0];
        const min = time[1];
        this.newmonth = data.date.getMonth() + 1;

        this.scheduleDate = new Date(year, month, date, hour, min);
        this.endTime = new Date(this.scheduleDate.getTime() + data.durationinMinutes * 60000);
        if (this.scheduleDate < new Date()) {
          this.snackBar.open("schedule class after current time", null, { duration: 4000 });
        } else {
          const shedulerformat1: any = {
            title: data.title,

            scheduledDate: this.scheduleDate,

            durationinMinutes: data.durationinMinutes,

            canExtend: true,

            redirectUrl: "https://app.yolearn.com/#/feedback/" + data.title,

            presenterUniqueName: this.s1[0].accountId,

            presenterDisplayName: this.s1[0].firstName,

            isRecordedSessionViewable: true,

            sessionId: data.sessionId
          };

          this.appSettings.updateclassroomsheduler(shedulerformat1).subscribe(
            (_data: any) => {
              const dd1 = year + "-" + this.newmonth + "-" + date + " " + hour + ":" + min + ":" + "00";
              const dd = new Date(this.scheduleDate)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              const endTimeISO = new Date(this.endTime)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              shedulerformat1.teacherId = this.s1[0].accountId;
              shedulerformat1.scheduledDate = dd;
              shedulerformat1.endDate = endTimeISO;
              shedulerformat1.gradeId = fullformat.gradeId;
              shedulerformat1.chapterId = fullformat.chapterId;
              shedulerformat1.batchId = fullformat.batchId;
              shedulerformat1.syllabusId = fullformat.syllabusId;
              shedulerformat1.subjectId = fullformat.subjectId;
              shedulerformat1.sheduletimeformail = dd1;
            },
            () => { },
            () => {
              shedulerformat1.accessTo = this.form.value.for;
              if (this.form.value.for === "Demo") {
                this.form.value.for = "Guest";
                this.form.value.batchId = "";
              } else {
                this.form.value.for = this.form.value.for;
              }
              this.appSettings.updateclassroomshedulerdb(shedulerformat1).subscribe(
                (_data: any) => {
                  this.updatedResult = _data;
                  this.snackBar.open("updated class successfully", null, { duration: 4000 });
                },
                () => { },
                () => {
                  if (this.updatedResult.accessTo == "Members") {
                    this.openSendmailDialog(shedulerformat1);
                  }
                }
              );
            }
          );
        }
      }
    );
  }

  // delete upcoming class

  deleteupcomingclass(data: any) {
   /** this.appSettings.deleteclassfunction(data).subscribe((_data: any) => {
      this.snackBar.open("upcoming class has been deleted successfully", null, { duration: 2000 });
    });*/ 
    this.appSettings.deleteclassfunction(data).subscribe((_data: any) => {
      this.snackBar.open("upcoming class has been deleted successfully", null, { duration: 2000 });
    });
  }

  // open dialog box to send mail about the class scheduled details

  openSendmailDialog(event: any) {
    const dialogRef = this.dialog.open(SendmailDialogComponent, {
      data: event
    });
  }


}
