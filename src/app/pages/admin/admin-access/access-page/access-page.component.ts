import { Component, OnInit } from "@angular/core";
import { AppSettings } from "../../../../app.settings";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-access-page",
  templateUrl: "./access-page.component.html",
  styleUrls: ["./access-page.component.scss"]
})
export class AccessPageComponent implements OnInit {
  public form: FormGroup;
  public adminId: any;
  public fullName: any;

  // Sidenav Name
  sidenav = [
    "Admins",
    "Teachers",
    "Parents",
    "Students",
    "Demo Members",
    "Classrooms",
    "Recorded Classes",
    "Upcoming Classes",
    "Assignment",
    "Test",
    "Schedule",
    "Products",
    "Subscriptions",
    "Batch",
    "Talent Test"
  ];

  // Sidenav_Icon
  icon = [
    "supervised_user_circle",
    "local_library",
    "wc",
    "school",
    "person_pin",
    "meeting_room",
    "video_call",
    "videocam",
    "book",
    "assignment_turned_in",
    "live_tv",
    "list",
    "subscriptions",
    "style",
    "how_to_reg"
  ];

  //  sidenav access permission name for post request
  controlerName = [
    "adminAccess",
    "teacherAccess",
    "parentAccess",
    "studentAccess",
    "demoMemberAccess",
    "classRoomAccess",
    "recordedAccess",
    "upcomingAccess",
    "assignmentAccess",
    "testAccess",
    "scheduleAccess",
    "produtAccess",
    "subscriptionAccess",
    "batchAccess",
    "talentAccess"
  ];
  constructor(public appSettings: AppSettings, public fb: FormBuilder, public route: ActivatedRoute, public location: Location) {
    this.form = this.fb.group({
      adminAccess: false,
      teacherAccess: false,
      parentAccess: false,
      studentAccess: false,
      demoMemberAccess: false,
      classRoomAccess: false,
      recordedAccess: false,
      upcomingAccess: false,
      assignmentAccess: false,
      testAccess: false,
      scheduleAccess: false,
      produtAccess: false,
      subscriptionAccess: false,
      batchAccess: false,
      talentAccess: false
    });
  }

  ngOnInit() {
    // getting admin accountId from URL parameter

    this.route.params.subscribe(data => {
      this.adminId = data.id;
    });

    const jsonForAdminId = {
      accountId: this.adminId
    };

    // get all access permission of admin based on accountId

    this.appSettings.getAdminAccess(jsonForAdminId).subscribe((data: any) => {
      this.fullName = data.fullName;
      delete data.fullName;
      this.form.setValue(data);
    });
  }

  // Submit admin access permission
  submitAccess(data) {
    data.accountId = this.adminId;
    this.appSettings.updateAdminAccess(data).subscribe((result: any) => {});
  }

  // navigate to previous page
  goBack() {
    this.location.back();
  }
}
