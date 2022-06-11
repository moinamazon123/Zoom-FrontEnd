import { Component, OnInit, Inject, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from "../../../app.settings";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Settings } from "../../../app.settings.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
  public settings: Settings;
  public form: FormGroup;
  public isDisabled = true;
  public otpid;
  public send;
  public resend = false;
  public show = false;
  public show1 = false;
  constructor(
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public user: any,
    public snackBar: MatSnackBar
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      pAccountId: null,
      otp: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(new RegExp("^[0-9]+$"))])],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(new RegExp("^[A-Za-z0-9!.,#$%&'*+/=?^_`{|}~@-]+$"))])
      ]
    });
  }

  ngOnInit() {}

  // send otp

  sendotp() {
    this.send = true;
    const jsondata = {
      primaryEmail: this.user.primaryEmail
    };
    this.appSettings.sendotpforForgetPassword(jsondata).subscribe((data: any) => {
  //  console.log(data)
      if (data.msg === "An OTP has been sent to your mail. Check the spam folder for OTP ") {
        this.form.controls.otp.enable();
        this.isDisabled = false;
        this.otpid = data.otpid;
        this.send = false;
        this.resend = true;
        // console.log(this.otpid)
        this.snackBar.open("An OTP has been sent to your mail. (Please check spam folder also)", null, { duration: 3000 });
      } else {
        this.snackBar.open(data.msg, null, { duration: 3000 });
        this.send = false;
      }
      
 
    });
  }

  // verify otp


  verifyotp(user) {
    const jsondata = {
      primaryEmail: this.user.primaryEmail,
      otp: user.otp,
      otpId: this.otpid
    };

    // console.log(jsondata)
    this.appSettings.verifyotp(jsondata).subscribe((data: any) => {
      if (data.msg === "OTP confirmed!") {
        this.isDisabled = true;
        this.show = true;
        this.show1 = true;
        this.form.controls.password.enable();

        this.snackBar.open(data.msg, null, { duration: 3000 });
      } else {
        this.snackBar.open(data.msg, null, { duration: 3000 });
      }
    });
  }

  // submit the new password for different user

  onSubmit(psw, detail) {
    this.settings.loadingSpinner = true;
    if (detail.userRole === "parent") {
      const jsondata = {
        parentAccountId: detail.pAccountId,
        password: psw.password
      };
      this.appSettings.resetpassword(jsondata).subscribe(
        (data: any) => {
         
          if (data.msg === "updated password") {
            this.snackBar.open("Reset Password Successfully", null, { duration: 3000 });
            this.dialogRef.close();
            this.form.value.password = "";
          } else {
            this.snackBar.open("please check all the fields are correct", null, { duration: 3000 });
          }
        },
        () => {
          this.settings.loadingSpinner = false;
        },
        () => {
          this.settings.loadingSpinner = false;
        }
      );
    } else if (detail.userRole === "Admin") {
      const jsondata = {
        adminAccountId: detail.accountId,
        password: psw.password
      };
      this.appSettings.forgetPasswordAdmin(jsondata).subscribe(
        (data: any) => {
          if (data.msg === "updated password") {
            this.snackBar.open("Reset Password Successfully", null, { duration: 3000 });
            this.dialogRef.close();
            this.form.value.password = "";
          } else {
            this.snackBar.open("please check all the fields are correct", null, { duration: 3000 });
          }
        },
        () => {
          this.settings.loadingSpinner = false;
        },
        () => {
          this.settings.loadingSpinner = false;
        }
      );
    } else if (detail.userRole === "student") {
      const jsondata = {
        studentAccountId: detail.sAccountId,
        password: psw.password
      };
      // console.log(jsondata)
      this.appSettings.forgetPasswordStudent(jsondata).subscribe(
        (data: any) => {
        
          if (data.msg === "Error null") {
            this.snackBar.open("Reset Password Successfully", null, { duration: 3000 });
            this.dialogRef.close();
            this.form.value.password = "";
          } else {
            this.snackBar.open("please check all the fields are correct", null, { duration: 3000 });
          }
        },
        () => {
          this.settings.loadingSpinner = false;
        },
        () => {
          this.settings.loadingSpinner = false;
        }
      );
    } else {
      const jsondata = {
        teacherAccountId: detail.teacherAccountId,
        password: psw.password
      };
      this.appSettings.forgetPasswordTeacher(jsondata).subscribe(
        (data: any) => {
          if (data.msg === "updated password") {
            this.snackBar.open("Reset Password Successfully", null, { duration: 3000 });
            this.dialogRef.close();
            this.form.value.password = "";
          } else {
            this.snackBar.open("please check all the fields are correct", null, { duration: 3000 });
          }
        },
        () => {
          this.settings.loadingSpinner = false;
        },
        () => {
          this.settings.loadingSpinner = false;
        }
      );
    }
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
