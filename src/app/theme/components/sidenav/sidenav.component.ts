import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { Settings } from "../../../app.settings.model";
import { MenuService } from "../menu/menu.service";
import { MatBadgeModule } from "@angular/material/badge";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Session } from "protractor";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidenavComponent implements OnInit, AfterViewChecked {
  public GetURLdata;
  public role;
  public dateNow;
  public userImage = "../assets/img/users/user.jpg";
  public firstname;
  public lastname;
  public img;
  public access;
  // public imagedetail;
  public dateofcreation;
  public formDataimg: FormData = new FormData();
  public menuItems: Array<any>;
  public settings: Settings;
  public accountId;
  constructor(
    public route: ActivatedRoute,
    public appSettings: AppSettings,
    public menuService: MenuService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public cdr: ChangeDetectorRef
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.GetURLdata = this.route.snapshot.url[0].path;

    // this.cdr.detectChanges();
    //  this.imagedetail=this.appSettings.imagedetail;
    //   this.appSettings.profileimageobservable.subscribe(message => {
    //   this.img = message.text;
    // });

    //  this.appSettings.imagedetails.subscribe(message=>{
    //
    //    this.imagedetail=message
    //  });

    this.accountId = this.appSettings.userdetails.accountId;

    this.appSettings.usedeatilschange.subscribe((value: any) => {
      this.accountId = value.accountId;
    });
    this.role = sessionStorage.getItem("role");

    if (sessionStorage.getItem("role") === "Admin") {
      this.menuItems = this.menuService.getAdminMenuItems();

      const jsonForAdminId = {
        accountId: sessionStorage.getItem("accountId")
      };
      this.appSettings.getAdminAccess(jsonForAdminId).subscribe(
        data => {
          this.access = data;
          // console.log(this.access)
        },
        () => {},
        () => {
          if (!this.access.adminAccess) {
            this.menuItems[1].routerLink = "/no-access/admin/1";
          } else {
            this.menuItems[1].routerLink = "/dashboard/admin/admin-access/admin-list";
          }
          if (!this.access.assignmentAccess) {
            this.menuItems[11].routerLink = "/no-access/assignments/11";
          } else {
            this.menuItems[11].routerLink = "/dashboard/admin/Assignment&Test/Assignment";
          }
          if (!this.access.batchAccess) {
            this.menuItems[16].routerLink = "/no-access/batch/16";
          } else {
            this.menuItems[16].routerLink = "/dashboard/admin/Batch";
          }
          if (!this.access.classRoomAccess) {
            this.menuItems[6].routerLink = "/no-access/classRoom/6";
          } else {
            this.menuItems[6].routerLink = "/dashboard/admin/Classes";
          }
          if (!this.access.demoMemberAccess) {
            this.menuItems[5].routerLink = "/no-access/demo-Member/5";
          } else {
            this.menuItems[5].routerLink = "/dashboard/admin/Demo Members";
          }
          if (!this.access.parentAccess) {
            this.menuItems[3].routerLink = "/no-access/parent/3";
          } else {
            this.menuItems[3].routerLink = "/dashboard/admin/Parents";
          }
          if (!this.access.produtAccess) {
            this.menuItems[14].routerLink = "/no-access/product/14";
          } else {
            this.menuItems[14].routerLink = "/dashboard/admin/Product";
          }
          if (!this.access.recordedAccess) {
            this.menuItems[8].routerLink = "/no-access/recorded-class/8";
          } else {
            this.menuItems[8].routerLink = "/dashboard/admin/e-Classes/recorded";
          }
          if (!this.access.scheduleAccess) {
            this.menuItems[13].routerLink = "/no-access/schedule/13";
          } else {
            this.menuItems[13].routerLink = "/dashboard/admin/Schedule";
          }
          if (!this.access.studentAccess) {
            this.menuItems[4].routerLink = "/no-access/student/4";
          } else {
            this.menuItems[4].routerLink = "/dashboard/admin/Students/Grid";
          }
          if (!this.access.subscriptionAccess) {
            this.menuItems[15].routerLink = "/no-access/subscription/15";
          } else {
            this.menuItems[15].routerLink = "/dashboard/admin/Subscription";
          }
          if (!this.access.talentAccess) {
            this.menuItems[17].routerLink = "/no-access/talent/17";
          } else {
            this.menuItems[17].routerLink = "/dashboard/admin/Talenttest";
          }
          if (!this.access.teacherAccess) {
            this.menuItems[2].routerLink = "/no-access/teacher/2";
          } else {
            this.menuItems[2].routerLink = "/dashboard/admin/Teachers";
          }
          if (!this.access.testAccess) {
            this.menuItems[12].routerLink = "/no-access/test/12";
          } else {
            this.menuItems[12].routerLink = "/dashboard/admin/Assignment&Test/Test";
          }
          if (!this.access.upcomingAccess) {
            this.menuItems[9].routerLink = "/no-access/upcoming-class/9";
          } else {
            this.menuItems[9].routerLink = "/dashboard/admin/e-Classes/upcomingClass";
          }
        }
      );
    }
    if (sessionStorage.getItem("role") === "student") {
      if(sessionStorage.getItem("SubId")=='SUBST000006' || sessionStorage.getItem("SubId")=='SUBST000007' || sessionStorage.getItem("SubId")=='SUBST000008' || sessionStorage.getItem("SubId")=='SUBST000009' || sessionStorage.getItem("SubId")=='SUBST000010'){
        const menuItems1 = this.menuService.getstudentMenuItems1();
        this.menuItems = menuItems1;
      }else{
        const menuItems1 = this.menuService.getstudentMenuItems();
        this.menuItems = menuItems1;
      }
     
    }
    if (sessionStorage.getItem("role") === "parent") {
      this.menuItems = this.menuService.getparentMenuItems();
    }
    if (sessionStorage.getItem("role") === "teacher") {
      this.menuItems = this.menuService.getteacherMenuItems();
    }
    if (this.GetURLdata === "Guest") {
      this.menuItems = this.menuService.getguetsMenuItems();
    }
    if (this.GetURLdata === "Demo") {
      this.menuItems = this.menuService.getdemoMenuItems();
    }
    this.retriveimage(sessionStorage.getItem("accountId"));
  }

  clearsessionStorage() {
    sessionStorage.clear();
    const backlen = history.length;
    window.history.go(-backlen);
    window.location.href = "https://yolearn.com";
    this.appSettings.sessionkill();
  }

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
      self.appSettings.profileimageobservable.next({
        text: self.img
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
    }

    this.upload();
  }

  upload() {
    this.appSettings.uploadimage(this.formDataimg, sessionStorage.getItem("accountId")).subscribe(
      (data: any) => {
        this.snackBar.open(data.msg, null, { duration: 1000 });
      },
      () => {},
      () => {}
    );
  }

  retriveimage(data) {
    const self = this;
    this.img = "https://app.yolearn.com/appyolearn/UserImages/" + data + ".jpg?" + new Date().getTime();
  }

  public closeSubMenus() {
    const menu = document.querySelector(".sidenav-menu-outer");
    if (menu) {
      for (let i = 0; i < menu.children[0].children.length; i++) {
        const child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains("expanded")) {
            child.children[0].classList.remove("expanded");
            child.children[1].classList.remove("show");
          }
        }
      }
    }
  }

  ngAfterViewChecked() {
    this.dateNow = new Date();
    this.cdr.detectChanges();
    this.appSettings.profileimageobservable.subscribe(message => {
      this.img = [];
      this.img = message.text;
    });
  }
}

