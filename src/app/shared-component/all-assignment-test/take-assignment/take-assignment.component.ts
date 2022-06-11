import { Component, OnInit, Input } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { Location } from "@angular/common";

declare var MathJax: any;

@Component({
  selector: "app-take-assignment",
  templateUrl: "./take-assignment.component.html",
  styleUrls: ["./take-assignment.component.scss"]
})
export class TakeAssignmentComponent implements OnInit {
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
  public testCompleted;
  public fileName;
  public durationinMinutes = 0;
  public title;
  public colors = ["accent", "primary", "warn", "green"];
  constructor(public appSettings: AppSettings, public location: Location) {}

  ngOnInit() {
    const jsonforFile = {
      fileId: this.fileId
    };

    this.appSettings.getDetailOfFileByFileId(jsonforFile).subscribe(
      (data: any) => {
        this.title = data.title;
        this.fileName = data.assignmentFile;
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
    if (this.appSettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
    const self = this;
    this.appSettings.getAssignmentfiles(this.fileName).subscribe((data: any) => {
      const reader: any = new FileReader();
      reader.onload = function() {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(reader.result, "text/xml");
        self.xmlparser(xmlDoc);
      };
      reader.readAsText(data);
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
          let option = x[0].children[i].getElementsByTagName("options")[0].getElementsByTagName("li")[j].innerHTML;
          // let option = x[0].children[i].getElementsByTagName("options")[0].getElementsByTagName("li")[j].innerHTML;
          option = '<p class="wrong">' + option + "</p>";
          jsonquest.options.push(option);
        }
      }
      jsonquest.answer = x[0].children[i].getElementsByTagName("solution")[0].innerHTML;
      jsonquest.question = x[0].children[i].getElementsByTagName("questionpara")[0].innerHTML;
      this.question.push(jsonquest);
    }
  }

  // to show solution

  solution() {
    const math = document.getElementById("answers");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);
  }

  // to check the selected answer right or wrong

  answerselected(element) {
    const el: any = document.createElement("p");
    el.innerHTML = element;
    this.selectedanswer = "Wrong Answer";
    if (el.firstChild.className === "right") {
      this.selectedanswer = "You Are Right";
    }
  }

  // move to previous page

  moveback() {
    this.location.back();
  }
}
