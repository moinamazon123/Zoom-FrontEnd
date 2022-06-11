import { Component, OnInit } from "@angular/core";
import { AppSettings } from "../../../../app.settings";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ClassroomDialogComponent } from "./classroom-dialog/classroom-dialog.component";

@Component({
  selector: "app-classroom",
  templateUrl: "./classroom.component.html",
  styleUrls: ["./classroom.component.scss"]
})
export class ClassroomComponent implements OnInit {
  public grades = ["1", "2", "3"];
  public grade: any = [];
  public syllabus: any = [];
  public selectedGrade: any = 0;
  public selectedProgram: any = 0;
  public selectedSubject: any = 0;
  public subjects: any = [];
  public chapters: any = [];
  public hideGrade = false;
  public hoverGradeId;
  public hoverSyllabusId;
  public hoverSubjectId;
  public hoverchapterId;
  public status = false;
  constructor(public appSettings: AppSettings, public dialog: MatDialog, public snackbar: MatSnackBar) {}

  ngOnInit() {
    this.loadGrade();
  }

  // load all grade function

  loadGrade() {
    this.grade = [];
    this.syllabus = [];
    this.subjects = [];
    this.chapters = [];
    this.appSettings.loadallgradefunction().subscribe(data => {
      // console.log(this.grade);
      this.grade = data;
    });
  }

  // get all program function

  getProgramFunction(grade) {
    this.hoverGradeId = null;
    this.hoverSyllabusId = null;
    this.hoverSubjectId = null;
    this.hoverchapterId = null;
    this.selectedGrade = grade;
    this.syllabus = [];
    this.subjects = [];
    this.chapters = [];
    this.appSettings.getsylabus(grade.gradeId).subscribe((data: any) => {
      if (data.length === 0) {
        this.snackbar.open("No Program found for this Grade... ", null, { duration: 2000 });
      } else {
        this.syllabus = data;
      }
    });
  }

  // get all subject function

  getSubjectFunction(syllabus) {
    this.hoverGradeId = null;
    this.hoverSyllabusId = null;
    this.hoverSubjectId = null;
    this.hoverchapterId = null;
    this.selectedProgram = syllabus;
    this.subjects = [];
    this.chapters = [];
    this.appSettings.getsubjects(this.selectedGrade.gradeId, syllabus.syllabusId).subscribe((data: any) => {
      if (data.length === 0) {
        this.snackbar.open("No Subject found for this Syllabus... ", null, { duration: 2000 });
      } else {
        this.subjects = data;
      }
    });
  }

  // get all chapter function

  getChapterFunction(subject) {
    this.hoverGradeId = null;
    this.hoverSyllabusId = null;
    this.hoverSubjectId = null;
    this.hoverchapterId = null;
    this.selectedSubject = subject;
    this.chapters = [];
    this.appSettings.getChapters(this.selectedGrade.gradeId, this.selectedProgram.syllabusId, subject.subjectId).subscribe((data: any) => {
      if (data.length === 0) {
        this.snackbar.open("No Chapter found for this Subject... ", null, { duration: 2000 });
      } else {
        this.chapters = data;
      }
    });
  }

  // open dialog box to add new grade

  addNewGrade() {
    const dialogRef = this.dialog.open(ClassroomDialogComponent, {
      data: {
        val: "grade"
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.loadGrade();
      }
    });
  }

  // open dialog box to add new program

  addprogram() {
    if (this.selectedGrade === 0) {
      this.snackbar.open("Please Select Any Grade Before Adding Programs...", null, { duration: 2000 });
    } else {
      const dialogRef = this.dialog.open(ClassroomDialogComponent, {
        data: {
          val: "sylabus",
          grade: this.selectedGrade.gradeName,
          data: this.selectedGrade.gradeId
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          setTimeout(() => {
            this.getProgramFunction(this.selectedGrade);
          }, 500);
        }
      });
    }
  }

  // open dialog box to add new subject

  addsubject() {
    if (this.selectedProgram === 0) {
      this.snackbar.open("Please Select Any Grade And Program Before Adding Subject...", null, { duration: 2000 });
    } else {
      const dialogRef = this.dialog.open(ClassroomDialogComponent, {
        data: {
          val: "subject",
          gradeId: this.selectedGrade.gradeId,
          sylabusId: this.selectedProgram.syllabusId,
          grade: this.selectedGrade.gradeName,
          sylabus: this.selectedProgram.syllabusName
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          setTimeout(() => {
            this.getSubjectFunction(this.selectedProgram);
          }, 200);
        }
      });
    }
  }

  // open dialog box to add new chapter

  addChapter() {
    if (this.selectedSubject === 0) {
      this.snackbar.open("Please Select Any Grade,Program and Subject Before Adding Chapter...", null, { duration: 2000 });
    } else {
      const dialogRef = this.dialog.open(ClassroomDialogComponent, {
        data: {
          val: "chapter",
          gradeId: this.selectedGrade.gradeId,
          syllabusId: this.selectedProgram.syllabusId,
          subjectId: this.selectedSubject.subjectId,
          grade: this.selectedGrade.gradeName,
          sylabus: this.selectedProgram.syllabusName,
          subject: this.selectedSubject.subjectName
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          setTimeout(() => {
            this.getChapterFunction(this.selectedSubject);
          }, 200);
        }
      });
    }
  }
 //status change for grade
  gradeStatuschange(data, event) {
  var jsonForgradeChange = {
  gradeId: data.gradeId
 }
    this.appSettings.classroomgradestatuschange(jsonForgradeChange).subscribe((responseData: any) => {
      this.snackbar.open("Status updated successfully", null, { duration: 2000 });
      this.loadGrade();
    },
    ()=>{},
    ()=>{
      // window.location.reload();
    }
    );
    
  }

 //status change for chapter
  chapterStatuschange(data, event) {
    var jsonForChapterChange = {
      chapterId: data.chapterId
     }
    this.appSettings.chapterroomgradestatuschange(jsonForChapterChange).subscribe((responseData: any) => {
      this.snackbar.open("Status updated successfully", null, { duration: 2000 });
    });
    
  }
}
