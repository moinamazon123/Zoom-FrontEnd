import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { Location } from "@angular/common";
import { BreadcrumbComponent } from "../../../theme/components/breadcrumb/breadcrumb.component";
import { MatTableDataSource, MatPaginator } from "@angular/material";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
  providers: [BreadcrumbComponent]
})
export class AnalyticsComponent implements OnInit {
  @Input() role: string;
  @Input() userFullName: any;
  @Input() userAccountId: any;
  @Input() className: any;
  @Input() batchId: any;
  @Input() gradeId: any;

  public allclasses: any = [];
  public totalClass: any = 0;
  public attendedClass: any = 0;
  public precentage: any = 0;
  public remark: any = "Poor";
  public count: any = 0;
  public testReport: any = [];
  public countpoor: any = 0;
  public countSatisfactory: any = 0;
  public countGood: any = 0;
  public countBest: any = 0;
  public totalPerformance: any = 0;
  public remarkForTest: any = "Poor";
  public countForTest: any = 3;
  public dataForDonutGraph: any;
  public sessionIdofTeacher: any;
  public totalCountofRaing = 0;
  public Rating: any = 0;
  public averageRating: any = 0;
  public ratingRemark: any = "Poor";
  public countforRatingRemark: any = 3;
  public totalTestCount: any = 0;
  public showSkeleton = true;
  public showTestReport = false;
  public colorScheme = {
    domain: ["red", "#c5e02f", "#00dcff", "#00695c"]
  };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;
  public showEvaluatedTable = false;
  public grade;
  public classReport = false;
  public countdisplay = 0;
  public classstatic = [];
  public teachername;
  public spinnershow = false;
  public totaper: any = [];
  public title: any;
  public sessionid;
  public studentaccountid;
  public session: any = [];
  public page: any;
  public result: any;
  public attemptedTestCount: any = 0;
  public showTable = false;
  public accountId;
  public name;
  public class;
  public data;
  public showLegend = false;
  public gradient = true;

  public file;
  public spinnertf = false;
  public searchText: any;
  public colors = ["accent", "primary", "warn", "green"];
  public showclass = true;
  public testclasses: any = [];
  public questionIndex = 1;
  public solutionshow;
  public selectedanswer;
  public question = [];
  public dateObject;
  public answer;
  public attemptedQuestions = 0;
  public testname;
  public correctAnswer = [];
  public wrongAnswer = [];
  public testId;
  public retaketime;

  public FinalAnswers = {};
  displayedColumnsForTest: any = ["no", "title", "totalScore", "writeAnswers", "Remarks", "button"];
  datasourceforTest;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("resizedDiv") resizedDiv: ElementRef;

  constructor(private cdRef: ChangeDetectorRef, public breadcrumb: BreadcrumbComponent, public appsetting: AppSettings, public _location: Location) { }

  ngOnInit() {

    
    this.classDetails();
    if (this.role === "Teachers") {
      this.rating();
    }
    if (this.role === "Students") {
      this.testData();
    }
  }

  // get the attendence analytics of teacher and student

  classDetails() {
    if (this.role === "Students") {
      const jsondata = {
        sAccountId: this.userAccountId,
        
      };
      // console.log(jsondata)

      this.appsetting.sanalyitcs(jsondata).subscribe(
          (data: any) => {
            this.totalClass=data.recordedClassCount;
            this.attendedClass=data.attendedClassesCount
            // console.log(this.attendedClass , this.totalClass);
            if(this.attendedClass>0){
              this.precentage = parseFloat((( this.attendedClass/this.totalClass ) * 100).toFixed(2));

            }else{
              this.precentage=0;
            }

          })

      // console.log(jsondata)
      // this.appsetting.getclassbygrade(jsondata).subscribe(
      //   (data: any) => {
      //     if (data) {
      //       // console.log("receive:", data)
      //       this.totalClass = data.countRecordedClass + data.liveClassList.length + data.upcomingClassList.length;
      //       // console.log("totalclass", this.totalClass)
      //     }
      //   },
      //   () => { },
      //   () => {
      //     this.appsetting.sessionofstudent(this.userAccountId).subscribe(
      //       (data: any) => {
      //         if (data.length > 0) {
      //           // console.log(data);
      //           // console.log("attendedClass", data.length);
      //           this.attendedClass = data.length;

      //         }
      //       },
      //       () => { },
      //       () => {
      //         this.showSkeleton = false;
      //         if (this.totalClass > 0 && this.attendedClass > 0) {
      //           this.precentage = parseFloat(((this.attendedClass / this.totalClass) * 100).toFixed(2));

      //           if (this.precentage >= 85) {
      //             this.remark = "Best";
      //             this.count = 3;
      //           } else if (this.precentage >= 75 && this.precentage < 85) {
      //             this.remark = "Good";
      //             this.count = 2;
      //           } else if (this.precentage >= 50 && this.precentage < 75) {
      //             this.remark = "Satisfactory ";
      //             this.count = 1;
      //           } else {
      //             this.remark = "Poor";
      //             this.count = 0;
      //           }
      //         }
      //       }
      //     );
      //   }
      // );
    } else if (this.role === "Teachers") {
      this.appsetting.sessionofstudent(this.userAccountId).subscribe(
        (sessionId: any) => {
          if (sessionId.length > 0) {
            this.attendedClass = sessionId.length;
          }
        },
        () => { },
        () => {
          const jsondata = {
            pageNo: 0,
            teacherAccountId: this.userAccountId
          };
          this.appsetting.teacherclassrooms(jsondata).subscribe(
            (data: any) => {
              this.totalClass = data.countRecordedClass + data.upcomingClassList.length + data.liveClassList.length;
            },
            () => { },
            () => {
              // console.log(this.attendedClass)
              if (this.totalClass > 0 && this.attendedClass>0 ) {
                this.precentage = parseFloat(((this.totalClass / this.attendedClass) * 100).toFixed(2));
              //  console.log(this.precentage)
                if (this.precentage >= 85) {
                  this.remark = "Best";
                  this.count = 3;
                } else if (this.precentage >= 75 && this.precentage < 85) {
                  this.remark = "Good";
                  this.count = 2;
                } else if (this.precentage >= 50 && this.precentage < 75) {
                  this.remark = "Satisfactory ";
                  this.count = 1;
                } else {
                  this.remark = "Poor";
                  this.count = 0;
                }
              } else {
                this.precentage = 0;
              }
            }
          );
        }
      );
    }
  }

  // to get the test report of the student

  testData() {
    const jsonForPagination = {
      pageNo: 0
    };
    this.appsetting.getAllTest(jsonForPagination).subscribe((data: any) => {
      const test = data.listOfTests.filter(x => x.gradeId === this.gradeId)
      this.totalTestCount = test.length;
    });
    const jsondata = {
      accountId: this.userAccountId
    };
    this.appsetting.getStudentTestReport(jsondata).subscribe(
      (result: any) => {
        this.testReport = result;
      },
      () => { },
      () => {
        if (this.testReport.length > 0) {
          for (let i = 0; i < this.testReport.length; i++) {
            this.testReport[i].remarks = (this.testReport[i].writeAnswers / this.testReport[i].totalScore) * 100;
            if (this.testReport[i].remarks < 50) {
              this.countpoor++;
            } else if (this.testReport[i].remarks >= 50 && this.testReport[i].remarks < 75) {
              this.countSatisfactory++;
            } else if (this.testReport[i].remarks >= 75 && this.testReport[i].remarks < 85) {
              this.countGood++;
            } else {
              this.countBest++;
            }
            this.totalPerformance = this.totalPerformance + (this.testReport[i].writeAnswers / this.testReport[i].totalScore) * 100;
          }
          this.totalPerformance = (this.totalPerformance / this.testReport.length).toFixed(2);

          if (this.totalPerformance > 0) {
            if (this.totalPerformance < 50) {
              this.remarkForTest = "Poor";
              this.countForTest = 3;
            } else if (this.totalPerformance >= 50 && this.totalPerformance < 75) {
              this.remarkForTest = "Satisfactory ";
              this.countForTest = 2;
            } else if (this.totalPerformance >= 75 && this.totalPerformance < 85) {
              this.remarkForTest = "Good";
              this.countForTest = 1;
            } else {
              this.remarkForTest = "Best";
              this.countForTest = 0;
            }
          }
        } else {
          this.totalPerformance = 0;
        }
        this.datasourceforTest = new MatTableDataSource<any>(this.testReport);
        this.datasourceforTest.paginator = this.paginator;
        this.dataForDonutGraph = [
          {
            name: "< 50",
            value: this.countpoor
          },
          {
            name: "50-75",
            value: this.countSatisfactory
          },
          {
            name: "75-85",
            value: this.countGood
          },
          {
            name: ">85",
            value: this.countBest
          }
        ];
      }
    );
  }

  // get the rating analytics of teacher

  rating() {
    this.appsetting.sessionofstudent(this.userAccountId).subscribe(
      (sessionId: any) => {
        this.sessionIdofTeacher = sessionId;
      },
      () => { },
      () => {
        if (this.sessionIdofTeacher.length > 0) {
          for (let i = 0; i < this.sessionIdofTeacher.length; i++) {
            const jsondata = {
              sessionId: this.sessionIdofTeacher[i].sessionId
            };
            // console.log(jsondata);
            this.appsetting.ratingBasedOnSessionId(jsondata).subscribe(
              (data: any) => {
                if (data.totalNumOfStudentForRating) {
                  this.totalCountofRaing = this.totalCountofRaing + data.totalNumOfStudentForRating;
                  this.Rating = this.Rating + data.avgRating;
                }
              },
              () => { },
              () => {
                if (this.totalCountofRaing > 0) {
                  this.averageRating = Math.round(this.Rating / this.totalCountofRaing);
                }

                if (this.averageRating === 1 || this.averageRating === 0) {
                  this.ratingRemark = "Poor";
                  this.countforRatingRemark = 3;
                } else if (this.averageRating === 2) {
                  this.ratingRemark = "satisfactory";
                  this.countforRatingRemark = 2;
                } else if (this.averageRating === 3) {
                  this.ratingRemark = "Good";
                  this.countforRatingRemark = 1;
                } else {
                  this.ratingRemark = "Best";
                  this.countforRatingRemark = 0;
                }
              }
            );
          }
        }
      }
    );
  }

  // move to previous page

  moveToPreviousPage() {
    this._location.back();
  }

  // read the test file

  readfile(filename, title, testId) {
    this.FinalAnswers = {};
    this.correctAnswer = [];
    this.testname = title;
    this.testId = testId;
    this.showclass = false;
    const self = this;
    this.appsetting.getTestfiles(filename).subscribe((data: any) => {
      const reader: any = new FileReader();
      reader.onload = function () {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(reader.result, "text/xml");
        self.xmlparser(xmlDoc);
      };
      reader.readAsText(data);
    });
    const ddata2 = {
      accountId: this.userAccountId,
      testId: this.testId
    };
    this.appsetting.retrivetestreport(ddata2).subscribe((data: any) => {
      this.retaketime = data.count;
      if (this.retaketime === undefined) {
        this.retaketime = 0;
      }
      Object.keys(data).forEach(k => !data[k] && data[k] !== undefined && delete data[k]);
      delete data["accountId"];
      delete data["testId"];
      delete data["score"];
      delete data["writeAnswers"];
      delete data["wrongAnswers"];
      if (data.msg) {
      } else {
        this.FinalAnswers = data;
      }
    });
  }

  // move to previous question

  tabChangedprev() {
    if (this.questionIndex <= 0) {
    } else {
      this.solutionshow = false;
      this.selectedanswer = "";
      this.questionIndex = this.questionIndex - 1;
    }
  }

  // change question

  questionchange() {
    this.solutionshow = false;
    this.selectedanswer = "";
  }

  // move to next question

  tabChangednext() {
    if (this.questionIndex < this.question.length - 1) {
      this.solutionshow = false;
      this.selectedanswer = "";
      this.questionIndex = this.questionIndex + 1;
    } else {
    }
  }

  // xml parser

  xmlparser(xmlDoc) {
    this.questionIndex = 0;
    this.solutionshow = false;
    this.selectedanswer = "";
    this.question = [];
    const x = xmlDoc.getElementsByTagName("questionbank");

    for (let i = 0; i < x[0].children.length; i++) {
      const jsonquest = {
        question: "",
        options: [],
        answer: []
      };

      for (let j = 0; j < x[0].children[i].getElementsByTagName("options")[0].getElementsByTagName("li").length; j++) {
        if (
          x[0].children[i]
            .getElementsByTagName("options")[0]
            .getElementsByTagName("li")
          [j].classList.contains("answer")
        ) {
          let option = x[0].children[i].getElementsByTagName("options")[0].getElementsByTagName("li")[j].innerHTML;
          option = "<p class=\"right\" style=\"color: green\">" + option + "</p>";
          jsonquest.options.push(option);
        } else {
          const option = x[0].children[i].getElementsByTagName("options")[0].getElementsByTagName("li")[j].innerHTML;
          jsonquest.options.push(option);
        }
      }
      jsonquest.answer = x[0].children[i].getElementsByTagName("solution")[0].innerHTML;
      jsonquest.question = x[0].children[i].getElementsByTagName("questionpara")[0].innerHTML;
      this.question.push(jsonquest);
      this.count = Object.keys(this.FinalAnswers).length;
      this.attemptedQuestions = 0;
      for (let t = 1; t < this.count; t++) {
        if (this.FinalAnswers["qn" + t] !== "") {
          this.attemptedQuestions++;
        }
      }
      if (Object.keys(this.FinalAnswers).length === 0) {
        this.FinalAnswers["qn" + (i + 1)] = "";
      }
    }
  }

  // to get the selected answer

  answerselected(element) {
    this.cdRef.detectChanges();
    //  console.log(element,checked);
    const el: any = document.createElement("p");
    el.innerHTML = element;
    this.selectedanswer = "Wrong Answer";
    if (el.firstChild.className === "right") {
      this.selectedanswer = "You Are Right";
    }
    const math = document.getElementById("answers");
  }

  // search the test report

  applyFilterforTest(filterValue: string) {
    this.datasourceforTest.filter = filterValue.trim().toLowerCase();
    if (this.datasourceforTest.paginator) {
      this.datasourceforTest.paginator.firstPage();
    }
  }
}
