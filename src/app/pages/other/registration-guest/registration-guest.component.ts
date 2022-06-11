import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { emailValidator, matchingPasswords } from "../../../theme/utils/app-validators";
import { AppSettings } from "../../../app.settings";
import { Settings } from "../../../app.settings.model";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-registration-guest",
  templateUrl: "./registration-guest.component.html",
  styleUrls: ["./registration-guest.component.scss"]
})
export class RegistrationGuestComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public isLinear = false;
  public send = false;
  public otpid = null;
  public isDisabled = true;
  public settings: Settings;
  public resend = false;
  public countriesDetails;
  public show = false;
  public id;
  public grades: any = [];
  public countryCodeJson = "assets/data/country-code.json";
  public countryCode;
  public selectedGrade;

  constructor(public appSettings: AppSettings, public http: HttpClient, public fb: FormBuilder, public router: Router, public snackBar: MatSnackBar, public route: ActivatedRoute) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group(
      {
        firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
        lastName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
        mobileNum: [null, Validators.compose([Validators.required, Validators.pattern(new RegExp("^[0-9]+$"))])],
        primaryEmail: [null, Validators.compose([Validators.required, emailValidator, Validators.minLength(5), Validators.maxLength(30)])],
        password: [
          null,
          Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(new RegExp("^[A-Za-z0-9!.,#$%&'*+/=?^_`{|}~@-]+$"))])
        ],
        gradeId: [null, Validators.compose([Validators.required])],
        confirmPassword: [null, Validators.compose([Validators.required])],
        countryCode: [null, Validators.compose([Validators.required])],
        userRole: "guest"
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
  }

  ngOnInit() {
    // load all grade

    this.appSettings.loadallgradefunction().subscribe(data => {
      this.grades = data;
    });

    // get all country code

    this.http.get(this.countryCodeJson).subscribe((data: any) => {
      this.countryCode = data.countries;
    });
    sessionStorage.clear();
    this.route.params.subscribe(data => {
      this.id = data.id;
    });
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  // select grade

  gradeChange(data) {
    this.selectedGrade = data.gradeName;
  }

  // Guest Registration

  public onSubmit(data, e) {
    delete data.confirmPassword;
    e.stopPropagation();
    this.appSettings.registration(data).subscribe(
      (msg: any) => {
        if (msg.msg === "Congratulations! Registration Successful.") {
          this.snackBar.open(msg.msg, null, { duration: 3000 });
          this.appSettings.userdetails = msg;
          sessionStorage.setItem("accountId", msg.accountId);
          sessionStorage.setItem("primaryEmail", msg.primaryEmail);
          sessionStorage.setItem("role", "guest");
          sessionStorage.setItem("password", msg.password);
          this.router.navigate(["/Demo/" + this.selectedGrade + "/class"]);
        } else {
          this.snackBar.open(msg.msg, null, { duration: 3000 });
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
