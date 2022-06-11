import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { AppSettings } from "../../../../app.settings";
import { MatSnackBar, MatDialog } from "@angular/material";
import { ProfileDialogComponent } from "../profile-dialog/profile-dialog.component";

@Component({
  selector: "app-profile-show",
  templateUrl: "./profile-show.component.html",
  styleUrls: ["./profile-show.component.scss"]
})
export class ProfileShowComponent implements OnInit, AfterViewChecked {
  public email;
  public img;
  public role;
  public firstName;
  public spinnertf = false;
  public formDataimg: FormData = new FormData();
  constructor(public appsetting: AppSettings, public snackbar: MatSnackBar, private cdr: ChangeDetectorRef, public dialog: MatDialog) {}

  ngOnInit() {
    // this.cdr.detectChanges();
    this.firstName = this.appsetting.userdetails.firstName;
    this.appsetting.profileimageobservable.subscribe(message => {
      this.img = message.text;
    });
    this.role = sessionStorage.getItem("role");
    this.email = sessionStorage.getItem("primaryEmail");
    this.retriveimage(sessionStorage.getItem("accountId"));
  }

  // image mouseover and mouseout effect

  displayuploadimgIcon() {
    (<HTMLElement>document.getElementById("uploadimgicon")).style.display = "block";
    (<HTMLElement>document.getElementById("img")).style.opacity = "0.5";
  }

  displaynoneuploadimgIcon() {
    (<HTMLElement>document.getElementById("uploadimgicon")).style.display = "none";
    (<HTMLElement>document.getElementById("img")).style.opacity = "1.0";
  }

  iconhover() {
    (<HTMLElement>document.getElementById("uploadimgicon")).style.display = "block";
    (<HTMLElement>document.getElementById("img")).style.opacity = "0.5";
  }

  // retrieve profile image of user

  retriveimage(data) {
    const self = this;
    this.img = "http://app.yolearn.com/appyolearn/UserImages/" + data + ".jpg?" + new Date().getTime();
  }

  // select image file to upload

  fileChange($event) {
    const self = this;
    const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    this.formDataimg.delete("file");
    this.formDataimg.append("file", file);
    const reader = new FileReader();

    reader.onloadend = function() {
      self.img = "";
      self.img = reader.result;
      self.appsetting.profileimageobservable.next({
        text: self.img
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
    }
    this.upload();
  }

  // upload image

  upload() {
    this.spinnertf = true;
    this.appsetting.uploadimage(this.formDataimg, sessionStorage.getItem("accountId")).subscribe(
      (data: any) => {
        this.snackbar.open(data.msg, null, { duration: 1000 });
      },
      () => {},
      () => {
        this.spinnertf = false;
        (<HTMLElement>document.getElementById("img")).style.opacity = "1.0";
        (<HTMLElement>document.getElementById("uploadimgicon")).style.display = "none";
      }
    );
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  // open dialog box for edit profile details

  openUserDialogforEdit(event) {
    if (this.role === "teacher" || this.role === "Admin" || this.role === "parent") {
      const dialogRefnonstudent = this.dialog.open(ProfileDialogComponent, {
        data: {
          firstName: this.appsetting.userdetails.firstName,
          lastName: this.appsetting.userdetails.lastName,
          primaryEmail: this.appsetting.userdetails.primaryEmail,
          mobileNum: this.appsetting.userdetails.mobileNum
        }
      });

      dialogRefnonstudent.afterClosed().subscribe(result => {
        if (result) {
          this.spinnertf = true;
          setTimeout(() => {
            this.spinnertf = false;
          }, 2000);
        }
      });
    }

    if (this.role === "student") {
      const dialogRefstudent = this.dialog.open(ProfileDialogComponent, {
        data: {
          firstName: this.appsetting.userdetails.firstName,
          lastName: this.appsetting.userdetails.lastName,
          primaryEmail: this.appsetting.userdetails.primaryEmail,
          mobileNum: null
        }
      });
    }
  }

  // open dialog box for password

  openUserDialogforPassword(event) {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      data: event
    });
  }

  // delete profile photo

  deleteprofilephoto() {
    this.appsetting.deleteProfilePhoto(sessionStorage.getItem("accountId")).subscribe(
      data => {},
      () => {},
      () => {
        this.retriveimage(sessionStorage.getItem("accountId"));
      }
    );
  }

  // unsubscribe/subscribe to mail

  Unsubscribe() {
    const jsondata = {
      accountId: sessionStorage.getItem("accountId"),
      status: !this.appsetting.userdetails.mailStatus
    };

    this.appsetting.unsubscribe(jsondata).subscribe((data: any) => {
      if (data.msg === "updated") {
        if (!this.appsetting.userdetails.mailStatus) {
          this.snackbar.open("Unsubscribed from getting notification!!!", null, { duration: 3000 });
        } else {
          this.snackbar.open("Subscribed for getting notification!!!", null, { duration: 3000 });
        }
      }
      this.appsetting.userdetails.mailStatus = !this.appsetting.userdetails.mailStatus;
    });
  }
}
