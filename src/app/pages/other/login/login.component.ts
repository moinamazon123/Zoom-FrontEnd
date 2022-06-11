import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { emailValidator } from "../../../theme/utils/app-validators";
import { AppSettings } from "../../../app.settings";
import { Settings } from "../../../app.settings.model";
import { MatSnackBar, MatDialog } from "@angular/material";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public imageurl: any;
  public settings: Settings;
  public passwordHide = true;
  public user: any;
  public showspinner = false;
  public allLoginDetail: any;
  public registartion=false;

  constructor(
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public route: ActivatedRoute
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      primaryEmail: [null, Validators.compose([Validators.required, emailValidator, Validators.minLength(5), Validators.maxLength(30)])],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(new RegExp("^[A-Za-z0-9!.,#$%&'*+/=?^_`{|}~@-]+$"))])
      ]
    });
  }

  ngOnInit() {
    sessionStorage.clear();
    this.route.params.subscribe(data => {
      // console.log(this.route.url)
      if (data.id) {
        sessionStorage.setItem("gradeName", data.id);
      }
      if (data.registartion) {
        this.registartion=true;
      }
    });
  }

  // submit login form
  // first get details of user by email
  // if role is parent route to loginscreen
  // else route to particular dashboard

  public onSubmit(values: any, event): void {
    this.showspinner = true;
    event.stopPropagation();
    this.appSettings.getdetailoflogin(values).subscribe((data: any) => {
      this.showspinner = false;
      if (data.msg) {
        this.snackBar.open(data.msg, null, { duration: 3000 });
      }

      this.allLoginDetail = data;
      this.user = data.userRole;
      if (this.user === "parent") {
        this.showspinner = true;
        sessionStorage.setItem("primaryEmail", values.primaryEmail);
        this.router.navigate(["/StudentLogin"]);
      } else {
        if (this.form.valid) {

          this.showspinner = true;
          const jsondata = {
            primaryEmail: values.primaryEmail,
            password: values.password,
            userRole: this.user
          };
          // tslint:disable-next-line:no-shadowed-variable


          this.appSettings.loginFunction(jsondata).subscribe((data: any) => {
            console.log(data)
            if (data.msg === "Login successful!") {
              this.snackBar.open(data.msg, null, { duration: 3000 });
              this.appSettings.userdetails = data;
              this.appSettings.profileimageobservable.next({
                text: data.image
              });
              this.appSettings.role = this.user;
              sessionStorage.setItem("accountId", data.accountId);
              sessionStorage.setItem("primaryEmail", data.primaryEmail);
              sessionStorage.setItem("role", data.userRole);
              sessionStorage.setItem("password", data.password);
              if (this.user === "Admin") {
               
                this.router.navigate(["dashboard/admin"]);
              }

              if (this.user === "teacher") {
                this.router.navigate(["dashboard/teacher"]);
              }
              if (this.user === "guest") {
                this.showspinner = false;
                this.router.navigate(["/Demo/" + data.gradeName + "/class"]);
              }
            } else {
              if (this.form.valid) {
                this.showspinner = false;
                this.snackBar.open(data.msg, null, { duration: 3000 });
              }
            }
          });
        }
      }
    });

  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  // route to guest registration page

  guestRegistration() {
    this.router.navigate(["/Demo/Register"]);
  }

  scprewellRegistration() {
    this.router.navigate(["/Registration/scorewell/ScorewellRegistation"]);
  }

  //  open dialog box for forgot password

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

  // go to yolearn.com product page

  goToLandingPage() {
    window.open("https://yolearn.com/#/products", "_self");
  }
}
