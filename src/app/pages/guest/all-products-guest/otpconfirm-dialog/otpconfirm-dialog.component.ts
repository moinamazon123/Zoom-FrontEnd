import { Component, OnInit, Inject, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { emailValidator, matchingPasswords } from "../../../../theme/utils/app-validators";
import { AppSettings } from "../../../../app.settings";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Settings } from "../../../../app.settings.model";

import { Router } from "@angular/router";
import { ProductGuestComponent } from "../product-guest/product-guest.component";

@Component({
  selector: "app-otpconfirm-dialog",
  templateUrl: "./otpconfirm-dialog.component.html",
  styleUrls: ["./otpconfirm-dialog.component.scss"]
})
export class OtpconfirmDialogComponent implements OnInit, AfterViewInit {
  public settings: Settings;
  public form: FormGroup;
  public isDisabled = true;
  public otpid;
  public send;
  public resend = false;
  public show = false;
  constructor(
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductGuestComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public user: any,
    public snackBar: MatSnackBar
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      otp: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(new RegExp("^[0-9]+$"))])]
    });
  }

  ngOnInit() {}

  // send otp to the particular mail
  sendotp() {
    this.send = true;
    const jsondata = {
      primaryEmail: this.user.Email
    };
    this.appSettings.sendotpforForgetPassword(jsondata).subscribe((data: any) => {
      // console.log(data)
      if (data.msg === "An OTP has been sent to your mail. Check the spam folder for OTP ") {
        this.form.controls.otp.enable();
        this.isDisabled = false;
        this.otpid = data.otpid;
        this.send = false;
        this.resend = true;

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
      primaryEmail: this.user.Email,
      otp: user.otp,
      otpId: this.otpid
    };

    // console.log(jsondata)

    this.appSettings.verifyotp(jsondata).subscribe((data: any) => {
      // console.log(data)
      if (data.msg === "OTP confirmed!") {
        this.isDisabled = true;
        this.show = true;
        this.dialogRef.close();
        this.snackBar.open(data.msg, null, { duration: 3000 });
        sessionStorage.setItem("SubId", this.user.product.subscriptionId);
        setTimeout(() => {
          this.router.navigate(["/Registration/forscorewell/" + this.user.product.subscriptionId]);
        }, 500);
      } else {
        this.snackBar.open(data.msg, null, { duration: 3000 });
      }
    });
  }

  // email verification complete when submit

  onSubmit() {
    sessionStorage.setItem("role", "guest");
    sessionStorage.setItem("SubId", this.user.product.subscriptionId);
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
