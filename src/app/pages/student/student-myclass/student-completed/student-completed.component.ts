import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, PageEvent } from "@angular/material";
import { Location, DatePipe } from "@angular/common";
import { MissedClassComponent } from "../../../../shared-component/all-eclasses/missed-class/missed-class.component";
import { AppSettings } from "../../../../app.settings";
import { IncompletedClassComponent } from "../../../../shared-component/all-eclasses/incompleted-class/incompleted-class.component";
import { MoreInfoStudentComponent } from "../more-info-student/more-info-student.component";
import { CompletedClassComponent } from "../../../../shared-component/all-eclasses/completed-class/completed-class.component";

@Component({
  selector: "app-student-completed",
  templateUrl: "./student-completed.component.html",
  styleUrls: ["./student-completed.component.scss"]
})
export class StudentCompletedComponent implements OnInit {
  public pageEvent: PageEvent;
  public classes = ["Completed Class", "Incompleted Class", "Missed Classes"];
  public subsTypeId: any;
  public accountId: any;
  public FullName;
  public DataSource: any;
  public noClassFound = false;
  public selectedClassroom = "Completed Class";
  public pageNo: any = 0;
  public pageSize: any = 10;
  public length: any;
  public slectedsylabus = "all";
  public syllabuslist;
  public mindate;

  public subjectlist;
  public teacherlist;
  public startDate = "all";
  public endDate = "all";
  lengthForPagination;
  public slectedteacher = "all";
  public slectedsubject = "all";
  public displayedColumnsName: string[] = ["Sl.No", "Title", "subjectName", "Teacher Name", "class held date", "percentage", " "];
  public filters = {
    "sAccountId": "",
    "syllabus": "",
    "subject": "all",
    "startDate": "all",
    "endDate": "all",
    "pageNo": "0",
    "pageSize": "10",
    "text": "",
    "dateOrder": "desc",
    "titleOrder": "asc",
  }
  @Input() studentid: any;
  @ViewChild(MissedClassComponent) Missedchild: MissedClassComponent;
  @ViewChild(CompletedClassComponent) completechild: CompletedClassComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public datepipe: DatePipe, public cookieservice: CookieService, public location: Location, public dialog: MatDialog, public appSettings: AppSettings) { }

  ngOnInit() {
    console.log(this.studentid)
    this.subsTypeId = sessionStorage.getItem("gradeId");
    this.subsTypeId = sessionStorage.getItem("SubId");

    if (this.studentid) {
      this.accountId = this.studentid;
    } else {
      this.accountId = sessionStorage.getItem("accountId");
      this.studentid = false;
    }

    //load all subjects
    //  this.appSettings.getsubjects(this.appSettings.userdetails.gradeId, this.appSettings.userdetails.syllabusId).subscribe(subject => {
    //   this.subjectlist = subject;
    // });
    this.appSettings.getsylabus1(this.accountId).subscribe(subject => {
      this.slectedsylabus = subject[0]['syllabusId'];
      this.appSettings.slectedsylabus = this.slectedsylabus;
      this.syllabuslist = subject;
      this.appSettings.getsubjects1(this.slectedsylabus).subscribe(subject => {
        // console.log(subject)
        this.subjectlist = subject;
      });

      this.filters.sAccountId = this.accountId;
      this.filters.syllabus = this.slectedsylabus;
      this.completechild.completedClasses(this.filters);
      // console.log("filters", this.filters);
    });
    //load all teachers
    this.appSettings.getallteachersfunction().subscribe(
      (data: any) => {
        this.teacherlist = data;
      }
    );
  }

  // incompleted class data
  getsubjectsforgradestudent(data) {
    this.subjectlist = [];
    this.appSettings.subjectSelected = "all";
    this.slectedsubject = "all";
    this.appSettings.slectedsylabus = this.slectedsylabus;

    this.appSettings.getsubjects1(this.slectedsylabus).subscribe(subject => {
      // console.log(subject)
      this.subjectlist = subject;
    });

    this.filters.syllabus = this.slectedsylabus;
    this.filters.subject = this.slectedsubject;
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    this.filters.pageNo = "0";
    this.filters.pageSize = "10";
    this.completechild.completedClasses(this.filters);
    // console.log("filters", this.filters);
  }

  completedClasses(data) {
    // console.log(data)
    this.DataSource = null;

    if (data.length === 0) {
      this.noClassFound = true;
    } else {
      // console.log(data);

      this.DataSource = new MatTableDataSource(data);
      // this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.sort;
    }
  }

  // move to previous page

  applyFilter(filterValue: string) {
    this.filters.text = filterValue;

    this.filters.pageNo = "0";
    this.filters.pageSize = "10";
    this.filters.text = filterValue;
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    this.completechild.completedClasses(this.filters);

  }
  moveToPreviousPage() {
    this.location.back();
  }

  // get total count of data


  getAlllength(event) {
    this.lengthForPagination = event;
    // console.log(event)
  }

  // open dialog box for more info

  openmoreinfo(result) {
    const dialogRef = this.dialog.open(MoreInfoStudentComponent, {
      data: result
    });
  }

  // for pagination


  pageno(event) {
    var $:any;
    var mydiv=document.getElementById('main-content');

    const scrollDuration = 200;
    const scrollStep = -mydiv.scrollTop / (scrollDuration / 20);
    const scrollInterval = setInterval(() => {
      if (mydiv.scrollTop !== 0) {
        mydiv.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      mydiv.scrollTop = 0;
    }
    

    this.DataSource = new MatTableDataSource();
  

    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = 0;

    const jsonForPagination = {
      pageNo: event.pageIndex,
      maxResult: event.pageSize
    };
    this.filters.pageNo = event.pageIndex;
    this.filters.pageSize = event.pageSize;

    // console.log("filters", this.filters);
    this.completechild.completedClasses(this.filters);
  }

  // sort data in ascending or descending order

  sortData(e) {
    if (e.active === "class held date") {
      // console.log(e.direction)
      this.filters.dateOrder = e.direction;
      this.filters.pageNo = "0";
      this.filters.pageSize = "10";
      this.pageNo = 0;
      this.pageSize = 10;
      this.length = 0;
      this.DataSource = null;
      this.completechild.completedClasses(this.filters);
    }
  }


  teacherChange() {
    this.appSettings.teacherSelected = this.slectedteacher;
    // console.log("selectedteacher",this.appSettings.teacherSelected);
    // this.Incompletechild.InCompletedClass();
  }

  subjectChange() {
    this.appSettings.subjectSelected = this.slectedsubject;
    this.filters.subject = this.slectedsubject;
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    this.filters.pageNo = "0";
    this.filters.pageSize = "10";
    // console.log("filters", this.filters);
    this.completechild.completedClasses(this.filters);


  }

  //date filter
  finalstartendDate() {
    this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    // console.log(this.startDate == null)
    if (this.startDate == null) {
      this.startDate = "all";
    }
    this.appSettings.startDate = this.startDate;
    this.filters.startDate = this.startDate;
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    this.filters.pageNo = "0";
    this.filters.pageSize = "10";
    // console.log("filters", this.filters);

    // console.log("filters", this.filters);
    this.appSettings.startDate = this.startDate;
    this.completechild.completedClasses(this.filters);
  }
  finalstartendDate1() {
    // this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
    // console.log(this.startDate == null)
    // console.log(this.endDate == null)

    if (this.endDate == null) {
      this.endDate = "all";
    }
    this.appSettings.endDate = this.endDate;
    this.filters.endDate = this.endDate;
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    this.filters.pageNo = "0";
    this.filters.pageSize = "10";


    // console.log("filters", this.filters);
    this.completechild.completedClasses(this.filters);
  }

  resetFilter() {
    setTimeout(() => {
      this.slectedteacher = "all";
      this.slectedsubject = "all";
      this.slectedsylabus = "all";
      this.startDate = "all";
      this.endDate = "all";
      this.appSettings.startDate = "all";
      this.appSettings.endDate = "all";
      this.appSettings.subjectSelected = "all";
      this.slectedteacher = "all";
      this.startDate = "all";
      this.appSettings.startDate = "all";
      this.appSettings.subjectSelected = "all";
      this.filters = {
        "sAccountId": "",
        "syllabus": "",
        "subject": "all",
        "startDate": "all",
        "endDate": "all",
        "pageNo": "0",
        "pageSize": "5",
        "text": "",
        "dateOrder": "desc",
        "titleOrder": "asc",
      }
      this.pageNo = 0;
      this.pageSize = 10;
      this.length = 0;
    }, 100);
    this.ngOnInit();

  }
}

