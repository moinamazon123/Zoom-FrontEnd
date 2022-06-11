import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, PageEvent } from "@angular/material";
import { Location, DatePipe } from "@angular/common";
import { MissedClassComponent } from "../../../../shared-component/all-eclasses/missed-class/missed-class.component";
import { AppSettings } from "../../../../app.settings";
import { MoreInfoStudentComponent } from "../more-info-student/more-info-student.component";

@Component({
  selector: "app-student-missedclasslist",
  templateUrl: "./student-missedclasslist.component.html",
  styleUrls: ["./student-missedclasslist.component.scss"]
})
export class StudentMissedclasslistComponent implements OnInit {
  public pageEvent: PageEvent;
  public classes = ["Completed Class", "Incompleted Class", "Missed Classes"];
  public batchId: any;
  public accountId: any;
  public FullName;
  public DataSource: any;
  public noClassFound = false;
  public selectedClassroom = "Completed Class";
  public pageNo: any = 0;
  public pageSize: any = 10;
  public length: any;
  public lengthForPagination;
  public subjectlist;
  public teacherlist;
  public syllabuslist; mindate;
  public slectedteacher = "all";
  public slectedsubject = "all";
  public slectedsylabus = "";
  public startDate = "all";
  public endDate = "all";

  public filters = {
    "sAccountId": "",
    "syllabus": "",
    "subject": "all",
    "startDate": "all",
    "endDate": "all",
    "pageNo": "0",
    "pageSize": "10",
    "dateOrder": "desc",
    "titleOrder": "asc",
    "text": ""
  }
  public displayedColumnsName: string[] = ["Sl.No", "Title", "subjectName", "Teacher Name", "class held date", "percentage", " "];
  @ViewChild(MissedClassComponent) Missedchild: MissedClassComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() studentid: any;
  constructor(public cookieservice: CookieService, public location: Location, public dialog: MatDialog, public appSettings: AppSettings, public datepipe: DatePipe) { }

  ngOnInit() {


    this.batchId = sessionStorage.getItem("batchId");
    if (this.studentid) {
      this.accountId = this.studentid;
    } else {
      this.accountId = sessionStorage.getItem("accountId");
      this.studentid = false;
    }

    this.appSettings.getsylabus1(this.accountId).subscribe(subject => {
      this.slectedsylabus = subject[0]['syllabusId'];
      this.appSettings.slectedsylabus = this.slectedsylabus;
      this.syllabuslist = subject;

    }, () => {

    }, () => {
      this.appSettings.getsubjects1(this.slectedsylabus).subscribe(subject => {
        this.subjectlist = subject;
      });

      this.filters.sAccountId = this.accountId;
      this.filters.syllabus = this.slectedsylabus;
      this.Missedchild.missedClass(this.filters);

      // console.log("filters", this.filters);
    });




  }

  // missed class data

  applyFilter(filterValue: string) {
    this.filters.text = filterValue;

    this.filters.pageNo = "0";
    this.filters.pageSize = "10";
    this.filters.text = filterValue;
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    this.Missedchild.missedClass(this.filters);
  }
  missedclass(data) {

    this.DataSource = null;
    // console.log(data)

    if (data.length === 0) {
      this.noClassFound = true;
    } else {


      this.DataSource = new MatTableDataSource(data);
      // this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.sort;




      this.DataSource.sortingDataAccessor = (item, property) => {

        return new Date(item.scheduledDate);

      }
    }
    // this.appSettings.getsubjects(data[0].gradeId, data[0].syllabusId).subscribe(subject => {
    //   this.subjectlist = subject;
    // });
  }

  // move to previous page

  moveToPreviousPage() {
    this.location.back();
  }
  getsubjectsforgradestudent(data) {
    // alert(this.slectedsylabus)
    this.subjectlist = [];
    this.appSettings.subjectSelected = "all";
    this.slectedsubject = "all";

    this.appSettings.slectedsylabus = this.slectedsylabus;
    this.filters.syllabus = this.slectedsylabus;
    this.filters.subject = this.slectedsubject

    // console.log("filters", this.filters);


    this.appSettings.getsubjects1(this.slectedsylabus).subscribe(subject => {
      // console.log(subject)
      this.subjectlist = subject;
    });
    this.Missedchild.missedClass(this.filters);
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
    // this.DataSource = null;
    if (this.appSettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }

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
    this.Missedchild.missedClass(this.filters);
  }


  // sort data in ascending or descending order

  sortData(e) {

    if (e.active === "class held date") {
    //  console.log(e.direction)
     this.filters.dateOrder=e.direction;
     this.filters.pageNo = "0";
    this.filters.pageSize = "10";
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    this.DataSource=null;
    this.Missedchild.missedClass(this.filters);
    }
  }

  teacherChange() {
    this.appSettings.teacherSelected = this.slectedteacher;
    // console.log("selectedteacher", this.appSettings.teacherSelected);
    // this.Missedchild.missedClass();
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
    // console.log("selectedSubject", this.appSettings.subjectSelected);
    this.Missedchild.missedClass(this.filters);

  }

  //date filter
  finalstartendDate() {
    this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    // this.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
    // console.log(this.startDate == null)
    // console.log(this.endDate == null)
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
    // this.appSettings.endDate = this.endDate;
    this.Missedchild.missedClass(this.filters);
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
    this.Missedchild.missedClass(this.filters);
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
        "titleOrder": "desc",
      }
      this.pageNo = 0;
      this.pageSize = 10;
      this.length = 0;
      this.Missedchild.missedClass(this.filters);


    }, 100);

    this.ngOnInit();

  }
}
