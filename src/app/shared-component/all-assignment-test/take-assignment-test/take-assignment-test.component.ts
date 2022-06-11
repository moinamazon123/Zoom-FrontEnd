import { Component, OnInit, Input } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { TestResultComponent } from "../test-result/test-result.component";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-take-assignment-test",
  templateUrl: "./take-assignment-test.component.html",
  styleUrls: ["./take-assignment-test.component.scss"]
})
export class TakeAssignmentTestComponent implements OnInit {
  @Input() fileId: any;

  public FinalAnswers;
  public correctAnswer;
  public endTimer;
  public questionIndex;
  public solutionshow;
  public selectedanswer;
  public question = [];
  public count;
  public attemptedQuestions;
  public testCompleted = false;
  public fileName;
  public durationinMinutes = 0;
  public title;
  public colors = ["accent", "primary", "warn", "green"];
  constructor(public appSettings: AppSettings, public dialog: MatDialog, public router: Router) {}

  ngOnInit() {
    const jsonforFile = {
      fileId: this.fileId
    };

    this.appSettings.getDetailOfFileByFileId(jsonforFile).subscribe(
      (data: any) => {
        this.title = data.title;
        this.fileName = data.testFile;
        this.durationinMinutes = data.durationinMinutes;
      },
      () => {},
      () => {
        this.readfile();
      }
    );
  }

  // read the assignment file


  readfile() {
    this.FinalAnswers = {};
    this.correctAnswer = [];
    const self = this;
    this.appSettings.getTestfiles(this.fileName).subscribe(
      (data: any) => {
        const reader: any = new FileReader();
        reader.onload = function() {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(reader.result, "text/xml");
          self.xmlparser(xmlDoc);
        };
        reader.readAsText(data);
      },
      () => {},
      () => {
        const timerTime = new Date().getTime() + this.durationinMinutes * 60000;
        // const timerTime = new Date().getTime() + (0.2 * 60000);
        this.endTimer = new Date(timerTime);
      }
    );
    const ddata2 = {
      accountId: sessionStorage.getItem("accountId"),
      testId: this.fileId
    };
    this.appSettings.retrivetestreport(ddata2).subscribe((data: any) => {
      Object.keys(data).forEach(k => !data[k] && data[k] !== undefined && delete data[k]);
      delete data["accountId"];
      delete data["testId"];
      delete data["score"];
      delete data["writeAnswers"];
      delete data["wrongAnswers"];
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

  // xml parser function

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
          option = '<p class="right">' + option + "</p>";

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

// to check the selected answer right or wrong

  answerselected(ele, element, i, j) {
    this.attemptedQuestions = 0;
    this.FinalAnswers["qn" + i] = j.toString();

    this.count = Object.keys(this.FinalAnswers).length;

    for (let t = 0; t < this.count; t++) {
      if (this.FinalAnswers["qn" + t] !== "") {
      }
      this.attemptedQuestions++;
    }

    ele.checked = true;
    const el: any = document.createElement("p");
    el.innerHTML = element;
    // this.selectedanswer = 'Wrong Answer';
    if (el.firstChild.className === "right") {
      this.correctAnswer[i - 1] = el.firstChild;

      // this.selectedanswer = 'You Are Right'
    } else {
      this.correctAnswer.splice(i - 1, 1);
    }
  }

  // submit the test

  submit(total: number, attemptedQues: any, showResult: boolean, showExpireDialog: boolean) {
    this.testCompleted = true;
    const filtered = this.correctAnswer.filter(function(el) {
      return el != null;
    });
    this.FinalAnswers["accountId"] = sessionStorage.getItem("accountId");
    this.FinalAnswers["testId"] = this.fileId;
    this.FinalAnswers["score"] = total;
    this.FinalAnswers["writeAnswers"] = filtered.length;
    this.FinalAnswers["wrongAnswers"] = total - filtered.length;
    this.appSettings.savetestreport(this.FinalAnswers).subscribe(data => {});
    const dialogRef = this.dialog.open(TestResultComponent, {
      disableClose: true,
      data: {
        attemted: attemptedQues,
        total: total,
        correct: filtered.length,
        showResult: showResult,
        showExpireDialog: showExpireDialog
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.router.navigate(["/dashboard/student/Assignment&Test/Test"]);
    });
  }
}
