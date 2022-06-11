import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../user.model";
import { AppSettings } from "../../../../app.settings";
import { emailValidator } from "../../../../theme/utils/app-validators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.scss"]
})
export class UserDialogComponent implements OnInit {
  public form: FormGroup;
  public userId;
  public time: any;
  public callender: any = [];
  public selectedDate;
  public dateofcreation: any;
  public showspinner = true;
  // tslint:disable-next-line:no-inferrable-types
  public passwordHide: boolean = true;
  public currenttime;
  public newTeacher;
  public countryCodeJson = "assets/data/country-code.json";
  public countryCode;
  constructor(
    public appSettings: AppSettings,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: User,
    public fb: FormBuilder,
    public http: HttpClient
  ) {
    this.form = this.fb.group({
      accountId: null,
      fullName: null,
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(new RegExp("^[A-Za-z0-9!.,#$%&'*+/=?^_`{|}~@-]+$"))])
      ],
      lastName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
      mobileNum: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(new RegExp("^[0-9]+$"))])],
      address: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      countryCode: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
      dateOfCreation: null,
      primaryEmail: [null, Validators.compose([Validators.required, emailValidator, Validators.minLength(5), Validators.maxLength(30)])],
      userRole: "teacher",
      status: null,
      image: null
    });
  }

  ngOnInit() {
    // get all country code

    this.http.get(this.countryCodeJson).subscribe((data: any) => {
      this.countryCode = data.countries;
    });
    if (this.user && this.user.userRole === "teacher") {
      this.form.setValue(this.user);
    } else if (this.user && this.user.userRole === "student") {
      const dateParts: any = this.user.dateOfCreation.split("-");
      this.dateofcreation = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      this.userId = this.user.accountId;
      this.currenttime = new Date();
      this.time = (this.currenttime.getDate() < 10 ? "0" : "") + this.currenttime.getDate() + "-" + (this.currenttime.getMonth() + 1) + "-" + this.currenttime.getFullYear();
    } else {
      this.user = new User();
    }
  }

  // close dialog box

  close(): void {
    this.dialogRef.close();
  }

  // Register new teacher

  registertecaher(users) {
    this.appSettings.registration(users).subscribe(
      (data: any) => {
        this.newTeacher = data;
        this.snackBar.open(data.msg, null, { duration: 3000 });
      },
      () => {},
      () => {}
    );
  }

  // update teacher

  updateUser(user: User) {
    this.appSettings.updateteacherfunction(user).subscribe((data: any) => {
      if (data.msg === "updated teacher") {
        this.snackBar.open("Status Updated Successfully", null, { duration: 3000 });
      } else {
        this.snackBar.open(data.msg, null, { duration: 3000 });
      }
    });
  }
}
