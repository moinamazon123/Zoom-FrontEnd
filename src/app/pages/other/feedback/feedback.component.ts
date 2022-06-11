import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from "../../../app.settings";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"]
})
export class FeedbackComponent implements OnInit, AfterViewInit {
  public setting: any;
  public form: FormGroup;
  public rate: any;
  public optionSelected;
  public rating: any = 0;
  public role: any;
  public sessionId;
  public showSpinner = false;
  public sessionDetails;
  public optionSwitch: any = 2;
  public option1to3: any = ["Uncomfortable class", "Audio/Video is not proper", "Not understand the concept", "My reason is not listed"];
  public option4to5: any = ["Polite and Professional teacher", "Clear and Comfortable", "Teacher was well professional", "My reason is not listed"];
  constructor(public appsetting: AppSettings, public formbuilder: FormBuilder, public router: Router, public snackbar: MatSnackBar, public route: ActivatedRoute) {
    this.setting = this.appsetting.settings;
    this.form = this.formbuilder.group({
      comment: [null, Validators.compose([Validators.maxLength(255)])]
    });
  }

  ngOnInit() {
    this.role = sessionStorage.getItem("role");
    if (this.role === "teacher") {
      this.router.navigate(["/dashboard/teacher"]);
    } else if (this.role === "Admin") {
      this.router.navigate(["/dashboard/admin"]);
    } else if (this.role === "student") {
    } else {
      window.history.go(-3);
    }
    const jsonSessionId = {
      sessionId: sessionStorage.getItem("sessionId")
    };
    this.appsetting.getSessionDetails(jsonSessionId).subscribe(data => {
      this.sessionDetails = data;
    });
  }

  ngAfterViewInit() {
    this.setting.loadingSpinner = false;
  }

  // for switching between the two options (below 3 and above 4)

  ratefunction(event) {
    this.rating = event;
    if (event === 4 || event === 5) {
      this.optionSwitch = 2;
    } else {
      this.optionSwitch = 1;
    }
  }

  // submit the feedback

  submit(comment) {
    const jsondata = {
      sesionId: sessionStorage.getItem("sessionId"),
      comment: comment.comment,
      studentId: sessionStorage.getItem("accountId"),
      totalRating: this.rating.toString(),
      feedBack: this.optionSelected
    };
    this.appsetting.submitFeedback(jsondata).subscribe(
      (data: any) => {
        if (data) {
          this.snackbar.open("Thank you for your response!!!", null, { duration: 3000 });
          this.showSpinner = true;
          this.router.navigate(["dashboard/student"]);
        }
      },
      () => {},
      () => {
        sessionStorage.removeItem("sessionId");
      }
    );
  }

  // skip the feedback

  goToDashboard() {
    sessionStorage.removeItem("sessionId");
    this.router.navigate(["dashboard/student"]);
  }
}
