import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {
  public userImage = "../assets/img/users/user.jpg";
  public firstname;
  public lastname;
  public accountId;
  public size;
  public image;
  public img;
  public role;
  public urlParameter;
  public formDataimg: FormData = new FormData();

  constructor(public appsettings: AppSettings, public snackBar: MatSnackBar, public http: HttpClient, public route: ActivatedRoute) {}

  ngOnInit() {
    this.role = sessionStorage.getItem("role");
    this.route.pathFromRoot[1].url.subscribe(val => (this.urlParameter = val[0].path));

    this.accountId = this.appsettings.userdetails.accountId;

    this.appsettings.usedeatilschange.subscribe((value: any) => {
      this.accountId = value.accountId;
    });
    this.appsettings.profileimageobservable.subscribe(message => {
      this.image = message.text;
    });
    this.retriveimage(sessionStorage.getItem("accountId"));
  }
  clearlocalstorage() {
    sessionStorage.clear();
    const backlen = history.length;
    window.history.go(-backlen);
    window.location.href = "https://yolearn.com";
    this.appsettings.sessionkill().subscribe(data => {});
  }

  retriveimage(data) {
    const self = this;
    const img = "https://app.yolearn.com/appyolearn/UserImages/" + data + ".jpg?" + new Date().getTime();
    this.image = img;

    // this.appSettings.profileimageobservable.next({
    //   text:this.img
    //  })
  }
}
