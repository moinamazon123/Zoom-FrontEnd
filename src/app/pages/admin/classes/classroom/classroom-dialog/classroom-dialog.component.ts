import { Component, EventEmitter, Input, Output, OnInit, Inject, forwardRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from "../../../../../app.settings";
import { ClassroomComponent } from "../classroom.component";

@Component({
  selector: "app-classroom-dialog",
  templateUrl: "./classroom-dialog.component.html",
  styleUrls: ["./classroom-dialog.component.scss"]
})
export class ClassroomDialogComponent implements OnInit {
  public role: any;
  public form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public appSettings: AppSettings,
    public dialogRef: MatDialogRef<ClassroomComponent>,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      addnew: ["", Validators.required],
      desc: [""]
    });
  }
  ngOnInit() {
    if (this.data.result) {
      this.form.setValue(this.data.result);
    }
    this.role = sessionStorage.getItem("role");
  }

  // add new grade

  postnewgrade(classroom) {
    this.appSettings.addnewgrade(classroom.addnew).subscribe((data: any) => {
      this.dialogRef.close();

      this.snackBar.open(data.msg, null, { duration: 2000 });
    });
  }

  // add new syllabus

  postnewsyllabus(classroom) {
    const jsondata = {
      syllabusName: classroom.addnew,
      syllabusDesc: classroom.desc,
      gradeId: this.data.data
    };
    this.appSettings.addnewsylabus(jsondata).subscribe(
      (data: any) => {
        this.dialogRef.close();
        this.snackBar.open(data.msg, null, { duration: 2000 });
      },
      () => {},
      () => {}
    );
  }

  // add new subject

  postnewsubject(classroom) {
    const jsondata = {
      subjectName: classroom.addnew,
      subjectDesc: classroom.desc,
      syllabusId: this.data.sylabusId,
      gradeId: this.data.gradeId
    };
    this.appSettings.addnewsubject(jsondata).subscribe((data: any) => {
      this.dialogRef.close();
      this.snackBar.open(data.msg, null, { duration: 1000 });
    });
  }

  // add new chapter

  postnewchapter(chapter) {
    const jsondata = {
      gradeId: this.data.gradeId,
      syllabusId: this.data.syllabusId,
      subjectId: this.data.subjectId,
      chapterName: chapter.addnew,
      chapterDesc: chapter.desc
    };
    this.appSettings.addNewChapter(jsondata).subscribe((data: any) => {
      this.dialogRef.close();
      this.snackBar.open(data.msg, null, { duration: 1000 });
    });
  }

  // close dialog box

  close(): void {
    this.dialogRef.close();
  }
}
