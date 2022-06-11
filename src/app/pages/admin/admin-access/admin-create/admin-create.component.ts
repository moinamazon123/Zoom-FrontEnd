import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from "../../../../app.settings";
import { emailValidator } from "../../../../theme/utils/app-validators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-admin-create",
  templateUrl: "./admin-create.component.html",
  styleUrls: ["./admin-create.component.scss"]
})

export class AdminCreateComponent implements OnInit {
  public form: FormGroup;
  public userId;
  public time: any;
  public showspinner = true; /* to show and hide spinner */
  public passwordHide = true; /* to show and hide password visiblity */
  public countryCodeJson = "assets/data/country-code.json";
  public countryCode;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    public appSettings: AppSettings,
    public snackBar: MatSnackBar,
    public fb: FormBuilder,
    public http: HttpClient,
    public dialogRef: MatDialogRef<any>
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
      userRole: "Admin",
      status: null,
      image: null
    });
  }

  ngOnInit() {
  
    // get country_code with country name
    this.http.get(this.countryCodeJson).subscribe((data: any) => {
      this.countryCode = data.countries;
    });
    // get user_detail if user already registered
    if (this.user) {
      this.form.setValue(this.user);
    }
  }

  // close the dialog box

  close() {
    this.dialogRef.close();
  }

  // register new admin

  registeradmin(data) {
    delete data.accountId;
    delete data.fullName;
    delete data.status;
    delete data.image;
    delete data.dateOfCreation;
    this.appSettings.registration(data).subscribe(
      (result: any) => {
        this.snackBar.open(result.msg, null, { duration: 3000 });
      },
      () => {},
      () => {}
    );
  }

  // update the existing admin details

  updateAdmin(data) {
    this.appSettings.updateAdminFunc(data).subscribe((result: any) => {
      this.snackBar.open(result.msg, null, { duration: 3000 });
    });
  }
}
