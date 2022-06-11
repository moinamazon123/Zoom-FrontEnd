import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";

@Component({
  selector: "app-student-login",
  templateUrl: "./student-login.component.html",
  styleUrls: ["./student-login.component.scss"]
})
export class StudentLoginComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public passwordHide: any = true;
  public s: any;
  public imageurl;
  public show = false;
  public result;
  public s1: any;
  public showspinner = false;
  public jsondata: any;
  public users = [];
  public pusers = [];
  public suser=true;
  public puser=false;
  public time;
  public showOrHide = true;
  public colorArray = ["#f7d8a3", "#b2e5ea", "#d0d3e8", "#edd0e0"];
  step = 0;

  constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.form = this.fb.group({
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(new RegExp("^[A-Za-z0-9!.,#$%&'*+/=?^_`{|}~@-]+$"))])
      ]
    });
  }

  ngOnInit() {
    this.show = false;
    setTimeout(() => {
      this.showOrHide = false;
    }, 2000);

    // get list of student of parent

    this.appSettings.getstudentofparentfunction().subscribe(
      (data: any) => {
        this.users = data;
        
        
      },
      () => {},
      () => {
        for (let i = 0; i < this.users.length; i++) {
          if (!this.users[i].image) {
            const colorNumber = Math.round(Math.random() * (this.colorArray.length - 1));
            this.users[i].colorNumber = colorNumber;
            this.users[i].firstLetter = this.users[i].firstName.charAt(0);
          }

        }
        this.pusers=[this.users[0]];
        this.showOrHide = false;
      }
    );
  }

  // login for parent

  onloginforParent(data0, data1, data2, e) {
    e.stopPropagation();
    if (this.form.valid) {
      this.showspinner = true;
      this.jsondata = {
        primaryEmail: data1.primaryEmail,
        password: data0.password
      };

    

      this.appSettings.loginFunctionforparent(this.jsondata).subscribe(
        (data: any) => {
         
         
          if (data.message === "Login successful!") {
            this.snackBar.open("Login Successfull", null, { duration: 3000 });
            this.imageurl = "https://app.yolearn.com/appyolearn" + data.image;
            this.appSettings.profileimageobservable.next({
              text: data.image
            });
            this.appSettings.primaryEmail = data1.primaryEmail;
            this.appSettings.password = data1.password;
            this.appSettings.userdetails = data;
            this.appSettings.role = data2;
            sessionStorage.setItem("accountId", data.accountId);
            sessionStorage.setItem("primaryEmail", data.primaryEmail);
            sessionStorage.setItem("role", data1.userRole);
            sessionStorage.setItem("password", data1.password);

            this.router.navigate(["dashboard/parent"]);
          } else {
            this.snackBar.open(data.msg, null, { duration: 3000 });
            this.show = true;
            this.showspinner = false;
          }
        },
        () => {},
        () => {}
      );
    }
  }

  // login for student

  onloginforStudent(data0, data1, data2, e) {
    e.stopPropagation();
    if (this.form.valid) {
      this.showspinner = true;
      this.jsondata = {
        accountId: data1.sAccountId,
        password: data0.password
      };

      this.appSettings.loginFunctionforstudent(this.jsondata).subscribe(
        (data: any) => {
          // console.log(data)
          if (data.msg === "Login successful!") {
            const validTill: any = new Date(data.validTill);
            data.SubscriptionDayLeft = validTill;
            const jsondata = {
              studentAccountId: data.accountId
            };
            this.appSettings.saveLearntronLiveData(jsondata).subscribe((savedDataLive: any) => {
              // console.log(savedDataLive)
            });
            this.appSettings.sessionofstudent(data.accountId).subscribe((session: any) => {
              for (let i = 0; i < session.length; i++) {
                const jsondataforsave = {
                  studentAccountId: data.accountId,
                  sessionId: session[i].sessionId
                };

                this.appSettings.saveLearntronRecordedData(jsondataforsave).subscribe((savedDataRecorded: any) => {});
              }
            });

            this.result = data;
            this.snackBar.open("Login Successfull", null, { duration: 3000 });
            this.appSettings.primaryEmail = data1.primaryEmail;
            this.appSettings.gradeName = data1.gradeName;
            this.appSettings.password = data1.password;
            this.appSettings.userdetails = data;
            this.appSettings.imagedetail = data.image;
            this.appSettings.usedeatilschange.subscribe(_data => {});
            this.appSettings.role = data2;
            this.imageurl = "https://app.yolearn.com/appyolearn" + data.image;
            this.appSettings.profileimageobservable.next({
              text: data.image
            });
            sessionStorage.setItem("gradeId", data.gradeId);
            sessionStorage.setItem("SubId", data.subsTypeId);
            sessionStorage.setItem("batchId", data.batchId);
            sessionStorage.setItem("accountId", data.accountId);

            sessionStorage.setItem("primaryEmail", data.primaryEmail);
            sessionStorage.setItem("role", data2);
            sessionStorage.setItem("password", data1.password);

            this.router.navigate(["dashboard/student/upcomingClass"]);
          } else {
            this.showspinner = false;
            this.snackBar.open(data.msg, null, { duration: 3000 });
          }
        },
        () => {},
        () => {}
      );
    }
  }

  // open dialog box for forgot password

  public openUserDialog(user) {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.form.get("password").setValue("");
      }
    });
  }

  clearip(){
    this.form.get("password").setValue("");

    this.form.markAsUntouched();
  }

  ngAfterViewInit() {
    this.appSettings.settings.loadingSpinner = false;
  }

  setStep(index: number) {
    this.step = index;
  }
}
