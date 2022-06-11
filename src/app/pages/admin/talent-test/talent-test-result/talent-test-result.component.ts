import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSettings } from "../../../../app.settings";
import { MatPaginator, MatSort, MatTableDataSource, Sort } from "@angular/material";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-talent-test-result",
  templateUrl: "./talent-test-result.component.html",
  styleUrls: ["./talent-test-result.component.scss"]
})
export class TalentTestResultComponent implements OnInit {
  public grades: any = ["6", "7", "8", "9"];
  public selectedGrade: any = "6";
  public winnerTable: any = ["candidateId", "candidateName", "schoolname", "duration", "mark", "FullResult"];
  public winnerData: any = [];
  public gradeWiseData: any;
  public dummyGradeWiseData: any = [];
  public selectedSorting = true;

  @ViewChild("paginator", { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public appsettings: AppSettings, public router: Router, public location: Location) {}

  ngOnInit() {
    this.ResultByGrade(this.selectedGrade);
  }

  // sort in ascending order

  sortAsending() {
    this.selectedSorting = true;
    this.ResultByGrade(this.selectedGrade);
  }

  // sort in descending order

  sortDescending() {
    this.selectedSorting = false;
    this.ResultByGrade(this.selectedGrade);
  }

  // get result by gradeId

  ResultByGrade(grade) {
    this.selectedGrade = grade;
    this.gradeWiseData = [];
    this.winnerData = [];
    const jsonGrade = {
      grade: grade
    };
    this.appsettings.talentTestResultByGrade(jsonGrade).subscribe(
      (data: any) => {
        // sort based on mark (Asceending or descending).
        // if mark is same check the time
        if (!this.selectedSorting) {
          data.sort(function(a, b) {
            if (a.totalMarks === b.totalMarks) {
              const minb = parseFloat(b.duration.split(":")[0]) * 60 + parseFloat(b.duration.split(":")[1]);
              const mina = parseFloat(a.duration.split(":")[0]) * 60 + parseFloat(a.duration.split(":")[1]);
              return mina - minb;
            }
            // tslint:disable-next-line:radix
            return parseInt(a.totalMarks) > parseInt(b.totalMarks) ? 1 : -1;
          });
        } else {
          data.sort(function(a, b) {
            if (a.totalMarks === b.totalMarks) {
              const minb = parseFloat(b.duration.split(":")[0]) * 60 + parseFloat(b.duration.split(":")[1]);
              const mina = parseFloat(a.duration.split(":")[0]) * 60 + parseFloat(a.duration.split(":")[1]);
              return minb - mina;
            }
            // tslint:disable-next-line:radix
            return parseInt(b.totalMarks) > parseInt(a.totalMarks) ? 1 : -1;
          });
        }

        this.dummyGradeWiseData = data;
        this.gradeWiseData = new MatTableDataSource(data);
        this.gradeWiseData.paginator = this.paginator;
        this.gradeWiseData.sort = this.sort;
      },
      () => {},
      () => {
        // get the winner of grade 6, 7, 8 and 9

        const winner6 = this.dummyGradeWiseData.filter(x => x.candidateId === "CAND000013");
        const winner7 = this.dummyGradeWiseData.filter(x => x.candidateId === "CAND000020");
        const winner8 = this.dummyGradeWiseData.filter(x => x.candidateId === "CAND000086");
        const winner9 = this.dummyGradeWiseData.filter(x => x.candidateId === "CAND000045");
        if (this.selectedGrade === "6") {
          this.winnerData = new MatTableDataSource(winner6);
        }
        if (this.selectedGrade === "7") {
          this.winnerData = new MatTableDataSource(winner7);
        }
        if (this.selectedGrade === "8") {
          this.winnerData = new MatTableDataSource(winner8);
        }
        if (this.selectedGrade === "9") {
          this.winnerData = new MatTableDataSource(winner9);
        }
      }
    );
  }

  // routing to section wise mark component

  sectionWiseMarkRouting(candidateId) {
    this.router.navigate(["/dashboard/admin/Talenttest/Section-wise", candidateId]);
  }

  // move to previous page

  moveToPreviousPage() {
    this.location.back();
  }
}
