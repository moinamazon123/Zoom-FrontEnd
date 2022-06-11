import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { AppSettings } from "../../../../app.settings";
import { emailValidator } from "../../../../theme/utils/app-validators";
import { ProfileShowComponent } from "../profile-show/profile-show.component";

@Component({
  selector: "app-profile-dialog",
  templateUrl: "./profile-dialog.component.html",
  styleUrls: ["./profile-dialog.component.scss"]
})
export class ProfileDialogComponent implements OnInit {
  public form: FormGroup;
  public formForEdit: FormGroup;
  public formFormobilenumber: FormGroup;
  public showspinner = false;
  public role;
  public result;
  public pAccountId;
  public passwordHide = true;
  constructor(
    public fb: FormBuilder,
    public dialogref: MatDialogRef<ProfileShowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appsetting: AppSettings,
    public snackbar: MatSnackBar
  ) {
    this.form = this.fb.group({
      oldPassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(new RegExp("^[A-Za-z0-9!.,#$%&'*+/=?^_`{|}~@-]+$"))])
      ],
      newPassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(new RegExp("^[A-Za-z0-9!.,#$%&'*+/=?^_`{|}~@-]+$"))])
      ]
    });
    this.formForEdit = this.fb.group({
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
      lastName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(new RegExp("^[A-Za-z]+$"))])]
    });
    this.formFormobilenumber = this.fb.group({
      primaryEmail: [null, Validators.compose([Validators.required, emailValidator, Validators.minLength(5), Validators.maxLength(30)])],
      mobileNum: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern(new RegExp("^[0-9]+$"))])]
    });
  }

  ngOnInit() {
    this.role = sessionStorage.getItem("role");
    if (this.data) {
      // set the form value

      const withoutmobilenumber = {
        firstName: this.data.firstName,
        lastName: this.data.lastName
      };
      const mobilenumberdata = {
        primaryEmail: this.data.primaryEmail,
        mobileNum: this.data.mobileNum
      };
      this.formForEdit.setValue(withoutmobilenumber);
      this.formFormobilenumber.setValue(mobilenumberdata);
    }
  }

  // close dialog box

  close() {
    this.dialogref.close();
  }

  // edit profile

  EditProfile(data, dataformobilenumber) {
    if (this.role === "teacher" || this.role === "Admin") {
      const jsondata = {
        accountId: sessionStorage.getItem("accountId"),
        primaryEmail: dataformobilenumber.primaryEmail,
        mobile: dataformobilenumber.mobileNum.toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        userRole: this.role
      };
      // tslint:disable-next-line:no-shadowed-variable
      this.appsetting.updateprofile(jsondata).subscribe((data: any) => {
        this.result = data;
        if (data.msg === "Account details updated!") {
          sessionStorage.setItem("primaryEmail", data.primaryEmail);
          this.snackbar.open(data.msg, null, { duration: 2000 });
          data.dateOfCreation = this.appsetting.userdetails.dateOfCreation;
          this.appsetting.usedeatilschange.next(data);
        } else {
          this.snackbar.open(data.msg, null, { duration: 2000 });
        }
      });
    } else if (this.role === "parent") {
      const jsondataforParent = {
        accountId: this.appsetting.userdetails.pAccountId,
        primaryEmail: dataformobilenumber.primaryEmail,
        mobile: dataformobilenumber.mobileNum.toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        userRole: this.role
      };
      // tslint:disable-next-line:no-shadowed-variable
      this.appsetting.updateprofile(jsondataforParent).subscribe((data: any) => {
        if (data.msg === "Account details updated!") {
          sessionStorage.setItem("primaryEmail", data.primaryEmail);
          this.snackbar.open(data.msg, null, { duration: 2000 });
          data.dateOfCreation = this.appsetting.userdetails.dateOfCreation;
          this.appsetting.usedeatilschange.next(data);
        } else {
          this.snackbar.open(data.msg, null, { duration: 2000 });
        }
      });
    } else {
      const jsondataforStudent = {
        accountId: sessionStorage.getItem("accountId"),
        primaryEmail: dataformobilenumber.primaryEmail,
        firstName: data.firstName,
        lastName: data.lastName,
        userRole: this.role
      };
      // tslint:disable-next-line:no-shadowed-variable
      this.appsetting.updateprofile(jsondataforStudent).subscribe((data: any) => {
        if (data.msg === "Account details updated!") {
          this.snackbar.open(data.msg, null, { duration: 2000 });
          data.dateOfCreation = this.appsetting.userdetails.dateOfCreation;
          data.gradeName = this.appsetting.gradeName;
          this.appsetting.usedeatilschange.next(data);
        } else {
          this.snackbar.open(data.msg, null, { duration: 2000 });
        }
      });
    }
  }

  // change password function

  changepassword(data) {
    if (this.role === "student" || this.role === "teacher" || this.role === "Admin") {
      const jsondata = {
        accountId: sessionStorage.getItem("accountId"),
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        userRole: this.role
      };
      // tslint:disable-next-line:no-shadowed-variable
      this.appsetting.changepasswordbyhimself(jsondata).subscribe((data: any) => {
        this.snackbar.open(data.msg, null, { duration: 2000 });
      });
    } else {
      const jsonforparent = {
        accountId: this.appsetting.userdetails.pAccountId,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        userRole: this.role
      };
      // tslint:disable-next-line:no-shadowed-variable
      this.appsetting.changepasswordbyhimself(jsonforparent).subscribe((data: any) => {
        this.snackbar.open(data.msg, null, { duration: 2000 });
      });
    }
  }
}
