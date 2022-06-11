import { Component, OnInit, Inject, AfterViewInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from "../../../../app.settings";
import { Router } from "@angular/router";
import { ListOfStudentComponent } from "../list-of-student/list-of-student.component";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"]
})
export class AddStudentComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public formForAllotment: FormGroup;
  public allgrades: any;
  public settings;
  public date;
  public studentDetail: any;
  public passwordHide = true;
  public Subscription_Pakage: any = [];
  public Selected_Sub_Pakage: any;
  public updatedData: any;
  public sys;
  constructor(
    public appSettings: AppSettings,
    public dialogRef: MatDialogRef<ListOfStudentComponent>,
    public snackBar: MatSnackBar,
    public fb: FormBuilder,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      accountId: this.appSettings.userdetails.accountId,
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      lastName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
      address: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      countryCode: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(new RegExp("^[0-9]+$"))])],
      city: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
      schoolName: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      subsTypeId: [null],
      dateOfCreation: null,
      primaryEmail: this.appSettings.userdetails.primaryEmail,
      userRole: "student",
      sAccountId: null,
      gradeName: null,
      gradeId: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      syllabusId: [null, Validators.compose([Validators.required])],
      status: null,
      image: null,
      batchId: null,
      validTill: null,
      syllabusName: null,
      validFrom: null,
      noOfDaysLeft: null
      // allotedTo: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    // get the details of the purchased product

    const jsondata = {
      parentAccountId: sessionStorage.getItem("accountId")
    };

    this.appSettings.getDeatailsOfPurchasedProduct(jsondata).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        const Present_Date: any = new Date();
        const Valid_Till: any = new Date(data[i].validTill);
        const Remaining_Date = Math.ceil((Valid_Till - Present_Date) / (1000 * 60 * 60 * 24));
        if (Remaining_Date > 0 && data[i].allotedStudentId == "null") {
          this.Subscription_Pakage.push(data[i]);
        }
      }
    });

    // to load all grade

    this.appSettings.loadallgradefunction().subscribe(data => {
      this.allgrades = data;
    });

    // set the form controler value

    if (this.user) {
      this.form.setValue(this.user);
      this.getProgram(this.user.gradeId);
    } else {
      this.user = 0;
    }
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  // close the dialog box

  close(): void {
    this.dialogRef.close();
  }

  // register new student (not using this function in live)

  registerstudent(formdata) {
    formdata.accountId = this.appSettings.userdetails.accountId;
    this.appSettings.addstudentfromparent(formdata).subscribe(
      (data: any) => {
        this.studentDetail = data;
        this.snackBar.open(data.msg, null, { duration: 2000 });
      },
      () => {},
      () => {
        const jsondata = {
          parentAccountId: sessionStorage.getItem("accountId"),
          studentAccountId: this.studentDetail.sAccountId,
          orderId: this.Selected_Sub_Pakage
        };
        this.appSettings.allotPackageToStudent(jsondata).subscribe((data: any) => {});
        this.date = new Date();
        this.date = (this.date.getDate() < 10 ? "0" : "") + this.date.getDate() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getFullYear();
      }
    );
  }

  // update the student details

  updatestudent(user: any) {
    const jsondata = {
      sAccountId: user.sAccountId,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      countryCode: user.countryCode,
      address: user.address,
      city: user.city,
      schoolName: user.schoolName,
      gradeId: user.gradeId,
      syllabusId: user.syllabusId
    };
    this.appSettings.updatestudentfunction(jsondata).subscribe(
      (data: any) => {
        if (data.msg === "updated Student") {
          this.snackBar.open("updated successfully", null, { duration: 1000 });
          this.updatedData = data;
        } else {
          this.snackBar.open(data.msg, null, { duration: 1000 });
        }
      },
      () => {},
      () => {
        if (this.Selected_Sub_Pakage) {
          const jsondata1 = {
            parentAccountId: sessionStorage.getItem("accountId"),
            studentAccountId: this.updatedData.sAccountId,
            orderId: this.Selected_Sub_Pakage
          };
          this.appSettings.allotPackageToStudent(jsondata1).subscribe((alloted: any) => {
            setTimeout(() => {
              this.snackBar.open(alloted.msg, null, { duration: 1000 });
            }, 1000);
          });
        }
      }
    );
  }

  // route to the purchase page

  gotoPurchase() {
    this.dialogRef.close();
    this.router.navigate(["/Purchase"]);
  }

  // get program of particular grade

  getProgram(grade) {
    this.appSettings.getsylabus(grade).subscribe(sylabus => {
      this.sys = sylabus;
    });
  }
}
