import { Component, OnInit } from "@angular/core";
import { AppSettings } from "../../../../app.settings";
import { Settings } from "../../../../app.settings.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  public students: any = 0;
  public role: any;
  public messageCount: any;
  public users: any = 0;
  public guest = 0;
  public teachers: any = 0;
  public parent: any = 0;
  public settings: Settings;
  public notFound = true;

  constructor(public appSettings: AppSettings, private router: Router) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.role = this.appSettings.role;
    this.OtherUserCount();
    this.GuestCount();
  }

  // get student, teacher, parent, total user count

  OtherUserCount() {
    this.appSettings.getallusersfunction().subscribe(
      (data: any) => {
        this.students = data.numberOfStudents;
        this.teachers = data.numberOfTeachers;
        this.parent = data.numberOfParent;
        this.users = data.numberOfStudents + data.numberOfTeachers + data.numberOfParent;
      },
      () => {},
      () => {
        this.notFound = false;
      }
    );
  }

  // get Guest count

  GuestCount() {
    const jsonForPagiantion = {
      pageNo: 0,
      maxResult: 10
    };

    this.appSettings.getallDemoMembersfunction(jsonForPagiantion).subscribe(
      (data: any) => {
        if (data.count > 0) {
          this.guest = data.count;
        } else {
          this.guest = 0;
        }
      },
      () => {},
      () => {
        this.notFound = false;
      }
    );
  }
}
