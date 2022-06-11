import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSettings } from "../../../../app.settings";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";
import { Location } from "@angular/common";

@Component({
  selector: "app-talent-test-sectionwise",
  templateUrl: "./talent-test-sectionwise.component.html",
  styleUrls: ["./talent-test-sectionwise.component.scss"]
})
export class TalentTestSectionwiseComponent implements OnInit {
  public section1 = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"];
  public section2 = ["Q11", "Q12", "Q13", "Q14", "Q15", "Q16", "Q17", "Q18", "Q19", "Q20"];
  public section3 = ["Q21", "Q22", "Q23", "Q24", "Q25", "Q26", "Q27", "Q28", "Q29", "Q30"];
  public sectiondata;
  public candidateId;
  public dd;
  public section1count: any = 0;
  public section2count: any = 0;
  public section3count: any = 0;

  constructor(public appsetting: AppSettings, public route: ActivatedRoute, public location: Location) {}

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.candidateId = data.id;
    });
    this.getSectionWiseMark();
  }

  // get section wise mark based on candidateId

  getSectionWiseMark() {
    const self = this;
    const CandidateIdJson = {
      candidateId: this.candidateId
    };
    this.appsetting.talentTestSectionWiseResult(CandidateIdJson).subscribe(
      (data: any) => {
        this.dd = data;
      },
      () => {},
      () => {
        for (let i = 1; i <= 30; i++) {
          const myval = self.dd[0]["Q" + i];

          if (myval != null) {
            if (i <= 10) {
              if (myval.split("-")[1] === "C") {
                self.section1count++;

                self.dd[0]["Q" + i] = '<span style="color:green">' + myval.split("-")[0] + "</span>";
              } else {
                self.dd[0]["Q" + i] = '<span style="color:red">' + myval.split("-")[0] + "</span>";
              }
            } else if (i > 10 && i <= 20) {
              //
              if (myval.split("-")[1] === "C") {
                self.section2count++;
                self.dd[0]["Q" + i] = '<span style="color:green">' + myval.split("-")[0] + "</span>";
              } else {
                self.dd[0]["Q" + i] = '<span style="color:red">' + myval.split("-")[0] + "</span>";
              }
            } else {
              if (myval.split("-")[1] === "C") {
                self.section3count++;
                self.dd[0]["Q" + i] = '<span style="color:green">' + myval.split("-")[0] + "</span>";
              } else {
                self.dd[0]["Q" + i] = '<span style="color:red">' + myval.split("-")[0] + "</span>";
              }
              //
            }
          }
        }
        this.sectiondata = new MatTableDataSource(self.dd);
      }
    );
  }

  // move to previous page

  moveToPreviousPage() {
    this.location.back();
  }
}
