import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from "../../../app.settings";
import { AssignmentsTestsComponent } from "../assignments-tests/assignments-tests.component";

@Component({
  selector: "app-dialog-assignment-test",
  templateUrl: "./dialog-assignment-test.component.html",
  styleUrls: ["./dialog-assignment-test.component.scss"]
})
export class DialogAssignmentTestComponent implements OnInit {
  public form: FormGroup;
  public grades: any = [];
  public subject: any = [];
  public syllabus: any = [];
  public selectedValueOfGrade: any;
  public resendForAssignment = true;
  public resendForTest = true;
  public assignment: any = "";
  public test: any = "";
  public isDisabled = false;
  public isDisableduploadbutton = false;
  public uploadTrueFalaseForTest: any = false;
  public uploadTrueFalaseForAssign: any = false;
  public formDataforAssignment: FormData = new FormData();
  public formDataforTest: FormData = new FormData();
  access: string[] = ["Demo", "Members", "others (Admin & teacher)"];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    public appSettings: AppSettings,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AssignmentsTestsComponent>
  ) {
    this.form = this.formBuilder.group({
      title: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(85)])],
      subjectId: ["", Validators.required],
      gradeId: ["", Validators.required],
      syllabusId: ["", Validators.required],
      Assignment: null,
      Test: null,
      for: ["", Validators.required],
      durationinMinutes: ["", Validators.compose([Validators.minLength(1), Validators.maxLength(5), Validators.pattern(new RegExp("^[0-9]+$"))])],
      date: ["", Validators.required],
      time: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.appSettings.loadallgradefunction().subscribe(data => {
      this.grades = data;
    });
  }

  // select syllabus

  selectsys(data) {
    this.subject = [];
    this.appSettings.getsylabus(data).subscribe((syllabus: any) => {
      this.syllabus = syllabus;
    });
  }

  // select subject

  selectsub(data) {
    this.appSettings.getsubjects(this.selectedValueOfGrade, data).subscribe((subject: any) => {
      this.subject = subject;
    });
  }

  // select  file for upload (assignment)

  fileChangeforAssignment($event) {
    const files = $event.target.files || $event.srcElement.files;
    const assignment = files[0];
    if (assignment) {
      this.resendForAssignment = false;
      this.assignment = assignment.name;
      this.formDataforAssignment.delete("file");
      this.formDataforAssignment.append("file", assignment);
    }
  }

  // select file  for upload (test)

  fileChangeforTest($event) {
    const files = $event.target.files || $event.srcElement.files;
    const test = files[0];
    if (test) {
      this.resendForTest = false;
      this.test = test.name;
      this.formDataforTest.delete("file");
      this.formDataforTest.append("file", test);
    }
  }

  // upload assignment file

  uploadforAssignment() {
    this.isDisabled = true;
    this.isDisableduploadbutton = true;
    this.uploadTrueFalaseForAssign = true;
    this.appSettings.uploadfiles(this.formDataforAssignment).subscribe(
      (data: any) => {
        if (data.msg === "Assignment Xml has been uploaded!") {
          this.uploadTrueFalaseForAssign = false;
          this.resendForAssignment = true;
          this.snackBar.open(data.msg, null, { duration: 3000 });
        } else if (data.msg === "Something went wrong. Try Again!" || data.msg === "File already exists.") {
          this.resendForAssignment = false;
          this.snackBar.open(data.msg, null, { duration: 3000 });
          setTimeout(() => {
            this.snackBar.open("please upload a valid file", null, {
              duration: 2000
            });
          }, 3000);

          this.uploadTrueFalaseForAssign = false;
        } else {
          this.resendForAssignment = false;
          this.snackBar.open(data.msg, null, { duration: 5000 });
          setTimeout(() => {
            this.snackBar.open("please upload a valid file", null, {
              duration: 2000
            });
          }, 5000);

          this.uploadTrueFalaseForAssign = false;
        }
      },
      () => {
        this.uploadTrueFalaseForAssign = false;
        this.isDisabled = false;
        this.isDisableduploadbutton = false;
      },
      () => {
        this.isDisabled = false;
        this.isDisableduploadbutton = false;

        this.uploadTrueFalaseForAssign = false;
      }
    );
  }

  // upload test file

  uploadforTest() {
    this.uploadTrueFalaseForTest = true;
    this.isDisabled = true;
    this.isDisableduploadbutton = true;
    this.appSettings.uploadfiles1(this.formDataforTest).subscribe(
      (data: any) => {
        if (data.msg === "Test Xml has been uploaded!") {
          this.snackBar.open(data.msg, null, { duration: 3000 });

          this.uploadTrueFalaseForTest = false;
          this.resendForTest = true;
        } else if (data.msg === "Something went wrong. Try Again!" || data.msg === "File already exists.") {
          this.resendForTest = false;
          this.snackBar.open(data.msg, null, { duration: 3000 });
          setTimeout(() => {
            this.snackBar.open("please upload a valid file", null, {
              duration: 2000
            });
          }, 3000);

          this.uploadTrueFalaseForAssign = false;
        } else {
          this.snackBar.open(data.msg, null, { duration: 5000 });
          setTimeout(() => {
            this.snackBar.open("please upload a valid file", null, {
              duration: 2000
            });
          }, 5000);

          this.uploadTrueFalaseForTest = false;
        }
      },
      () => {
        this.isDisableduploadbutton = false;
        this.uploadTrueFalaseForAssign = false;
        this.isDisabled = false;
      },
      () => {
        this.isDisabled = false;
        this.isDisableduploadbutton = false;
      }
    );
  }

// submit the assignment or test

  newAssignmentorTest(data) {
    const date = data.date.getDate();
    const month = data.date.getMonth();
    const year = data.date.getFullYear();
    const time = data.time.split(":");
    const hour = time[0];
    const min = time[1];
    if (data.for == "Demo") {
      data.for = "Guest";
    }
    const scheduledTime = new Date(year, month, date, hour, min)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const savedata: any = {
      title: data.title,
      gradeId: data.gradeId,
      syllabusId: data.syllabusId,
      subjectId: data.subjectId,
      assignmentFile: this.assignment,
      testFile: this.test,
      accessTo: data.for,
      durationinMinutes: data.durationinMinutes,
      scheduledDate: scheduledTime
    };

    if (this.assignment == null && this.test == null) {
      this.snackBar.open("No Assignment/Test is Uploaded...", null, {
        duration: 4000
      });
    } else {
      this.appSettings.AssignmentOrTestSave(savedata).subscribe((message: any) => {
        this.snackBar.open(message.msg, null, { duration: 4000 });
      });
    }
  }

  // close the dialogbox

  close(): void {
    this.dialogRef.close();
  }
}
