import { Component, OnInit } from "@angular/core";
import { BreadcrumbComponent } from "../../../../theme/components/breadcrumb/breadcrumb.component";
import { AppSettings } from "../../../../app.settings";
import { MatSnackBar, MatDialog } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { UserDialogComponent } from "../user-dialog/user-dialog.component";
import { _getComponentHostLElementNode } from "@angular/core/src/render3/instructions";
import { MoreInfoParentComponent } from "../more-info-parent/more-info-parent.component";
import { all } from "q";
import { DatePipe } from '@angular/common';


@Component({
  selector: "app-user-grid",
  templateUrl: "./user-grid.component.html",
  styleUrls: ["./user-grid.component.scss"],
  providers: [BreadcrumbComponent]
})
export class UserGridComponent implements OnInit {
  public studentfilters = {
    gradefilter: []
  };
  public allchecked = false;
  public users: any = [];
  public searchText = "";
  public dummyArray: any = [];
  public role: any;
  public page: any;
  public skeleton = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  public skeletonHide = false;
  public DataFrom = 1;
  public DataTo = 10;
  public currentPage = 0;
  public orginaldata: any;
  public slectedgrade = 'all';
  public slectedprogram = 'all';
  arr = Array;
  public length = 0;
  public gradeSelection = false;
  public gradeSelected;
  public tempGrade;
  public gradelist;
  public pageSize = 9;
  public pageNo = 0;
  public mindate = new Date();
  public startDate = 'all';
  public endDate = 'all';
  public searchFilterData = '';
  public lengthsearch;
  public syllabuslist;
  public lengthForPagination; public SizeOfPage; public sortdate = 'desc';
  constructor(
    public breadcrumb: BreadcrumbComponent,
    public appSettings: AppSettings,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public cookieservice: CookieService,
    public router: Router,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.role = this.breadcrumb.pageTitle.slice(3, this.breadcrumb.pageTitle.length);
    this.appSettings.loadallgradefunction().subscribe(data => {
      this.gradelist = data;
    });
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 9,
      dateOrder: "desc",
      text: this.searchText
    };
    this.getUsers(jsonForPagination);

  }


  public getUsers(jsonForPagination): void {
    this.users = [];
    this.pageNo = jsonForPagination.pageNo;
    this.SizeOfPage = jsonForPagination.maxResult;


    this.lengthsearch = 0;
    this.page = event;
    if (this.appSettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
    this.skeletonHide = false;
    this.users = null; // for show spinner each time

    // get all teacher details

    if (this.breadcrumb.pageTitle === " > Teachers") {
      this.appSettings.getallteachersfunctionpost(jsonForPagination).subscribe(
        (data: any) => {

          if (data.length === 0) {
            this.snackbar.open("Oops...No Teacher!!!", null, { duration: 3000 });
            // this.notfound = true;
          } else {
            // this.dummyArray = data["teachersList"];
            // this.lengthForPagination = data["no of records in this page"];
            // this.length = data.count;
            this.lengthForPagination = data["no of records in this page"];
            this.length = data.count;
            this.dummyArray = data.teachersList;
            // console.log(data)
          }
        },
        () => { },
        () => {
          this.users = this.dummyArray;
          this.orginaldata = this.users;
          this.skeletonHide = true;
        }
      );
      // this.appSettings.getallteachersfunction().subscribe(
      //   (data: any) => {
         


      //     if (data.count === 0) {
      //       this.dummyArray = [];
      //       this.snackbar.open("Oops...No Teacher!!!", null, { duration: 3000 });
      //       this.skeletonHide = true;
      //     } else {
      //       this.length = data.count;
      //       this.dummyArray = data;
      //     }
      //   },
      //   () => { },
      //   () => {
      //     this.users = this.dummyArray;
      //     this.orginaldata = this.users;
      //     this.skeletonHide = true;
      //   }
      // );
    }

    // get all parents

    if (this.breadcrumb.pageTitle === " > Parents") {
      this.appSettings.getallparentfunction(jsonForPagination).subscribe(
        (data: any) => {
          this.lengthForPagination = data["no of records desplaying on this page"];
          if (data.count === 0) {
            this.dummyArray = [];
            this.snackbar.open("Oops...No parent!!!", null, { duration: 3000 });
            this.skeletonHide = true;
          } else {
            this.length = data.count;
            this.dummyArray = data.listOfParents;
          }
        },
        () => { },
        () => {
          this.users = this.dummyArray;
          this.orginaldata = this.users;
          this.skeletonHide = true;
        }
      );
    }

    // get all Demo members

    if (this.breadcrumb.pageTitle === " > Demo Members") {
      this.appSettings.getallDemoMembersfunction(jsonForPagination).subscribe(
        (data: any) => {
          if (data.count === 0) {
            this.snackbar.open("Oops...No Student!!!", null, { duration: 3000 });
            this.skeletonHide = true;
          } else {
            this.length = data.count;
            this.dummyArray = data.guestDemo;
          }
        },
        () => { },
        () => {
          this.users = this.dummyArray;
          this.orginaldata = this.users;
          this.skeletonHide = true;
        }
      );
    }

    // get all students

    if (this.breadcrumb.pageTitle === " > Students") {
      if (this.slectedgrade == "all") {

      } else {
        jsonForPagination["gradeFilter"] = [this.slectedgrade]
      }

      if (this.slectedprogram=='all') {

      } else {
        jsonForPagination["ProgramFilter"] = [this.slectedprogram]
      }


      jsonForPagination["dateRange"] = {
        "startDate": this.startDate,
        "endDate": this.endDate
      }
      jsonForPagination["gradeOrder"]= "desc";
      

      // console.log(jsonForPagination)
      this.appSettings.getallstudentsfunction(jsonForPagination).subscribe(
        (data: any) => {
          // console.log(data)
          this.lengthForPagination = data["no of records displaying in this page"];
          if (data.count === 0) {
            this.dummyArray = [];
            this.snackbar.open("Oops...No Student!!!", null, { duration: 3000 });
            this.skeletonHide = true;
          } else {
            this.length = data.count;
            this.dummyArray = data.listOfStudents;
          }
        },
        () => { },
        () => {
          this.users = this.dummyArray;
          this.orginaldata = this.users;
          this.skeletonHide = true;
          // this.uniqueGrade();
        }
      );
    }
  }

  // route to report component for teacher
  applyFilter(filterValue: string) {
    this.searchText = filterValue;
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;

    const jsonForPagination = {
      pageNo: 0,
      maxResult: 10,
      dateOrder: this.sortdate,

      text: this.searchText
    };

    this.getUsers(jsonForPagination)

  }

  pageno(event) {

    var mydiv = document.getElementById('main-content');

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
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = 0;
    const jsonForPagination = {
      pageNo: event.pageIndex,
      maxResult: event.pageSize,
      dateOrder: this.sortdate,
      text: this.searchText
    };

    this.getUsers(jsonForPagination)
  }
  openReport(role: any, fullName: any, accountId: string) {

    this.cookieservice.set("userFullName", fullName);
    this.cookieservice.set("userAccountId", accountId);
    this.router.navigate(["dashboard/admin/", this.role, "report"]);
  }

  // route to report component for student

  openReportForStudent(data) {
    this.cookieservice.set("userFullName", data.fullName);
    this.cookieservice.set("userAccountId", data.accountId);
    this.cookieservice.set("batchId", data.batchId);
    this.router.navigate(["dashboard/admin/", this.role, "Studentreport"]);
  }

  // route to analytics for teacher and student

  showAnalytics(data) {
    this.cookieservice.set("userFullName", data.fullName);
    this.cookieservice.set("userAccountId", data.accountId);
    this.cookieservice.set("className", data.gradeName);
    this.cookieservice.set("batchId", data.batchId);
    this.cookieservice.set("gradeId", data.gradeId);

    this.router.navigate(["dashboard/admin/", this.role, "analytics"]);
  }

  // change the status of teacher and student

  public statuschange(user: any, event) {
    if (this.breadcrumb.pageTitle === " > Teachers") {
      this.appSettings.updateteacherfunction(user).subscribe(data => {
        this.snackbar.open("status updated successfully", null, { duration: 3000 });
        this.getUsers(this.page);
      });
    }

    if (this.breadcrumb.pageTitle === " > Students") {
      const jsondataForStatus = {
        sAccountId: user.accountId
      };

      this.appSettings.statusUpdateStudent(jsondataForStatus).subscribe(data => {
        this.snackbar.open("status updated successfully", null, { duration: 3000 });
        this.getUsers(this.page);
      });
    }
  }

  // if any new user added...(get the list of user)

  public addUser(user: any) {
    this.getUsers(this.page);
  }

  // open dialog box to add new teacher

  public openUserDialogforAdd(user) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users = [];
        setTimeout(() => {
          this.addUser(result);
        }, 1000);
      }
    });
  }

  // open dialog box to update the teacher details

  public openUserDialogforUpdate(user) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users = [];

        setTimeout(() => {
          this.addUser(result);
        }, 1000);
      }
    });
  }

  // open more-info for parent

  openParentInfo(user) {
    this.dialog.open(MoreInfoParentComponent, {
      data: user
    });
  }

  //onpage change
  public onPageChanged(event) {
    if (this.lengthsearch > 0) {
      this.searchFilter(event);
      this.page = event;
    } else {
      this.getUsers(event);
      this.page = event;
    }
  }


  //filter by grade
  // gradeChange(event) {
  //   this.searchFilterData = '';
  //   // this.users=this.orginaldata.filter(user => user.gradeName === this.slectedgrade); 
  //   this.getUsers(1);
  // }
  // get all user details
  public gradeChange(data) {
    // this.searchText = '';
    // this.syllabuslist = [];
    // this.subjectlist = [];
    // this.slectedsylabus = "all";
    // this.slectedsubject = "all";
    // this.slectedchapter = "all";
    this.appSettings.getsylabus(this.slectedgrade).subscribe(sylabus => {
      this.syllabuslist = sylabus;
    });
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 9,
      dateOrder: "desc",
      text: this.searchText
    };
    this.getUsers(jsonForPagination)
  }

  programchange(event){
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 9,
      dateOrder: "desc",
      text: this.searchText
    };
    this.getUsers(jsonForPagination)
  }
  //export to excel
  onExportExcel() {
    var jsonDataforExcel;
    if (this.slectedgrade && this.endDate && this.startDate) {
      jsonDataforExcel = {
        gradeId: this.slectedgrade,
        dateRange: {
          startDate: this.startDate,
          endDate: this.endDate
        },
      }
    } else {
      jsonDataforExcel = {
        gradeId: this.slectedgrade
      }
    }
    this.appSettings.getallparentfunctionbyFilter(jsonDataforExcel).subscribe((data: any) => {
      this.snackbar.open("Excel is successfully generated", null, { duration: 2000 });
      var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "studentReport.xls";
      link.click();

    },
      (err) => { 
        // console.log(err)
       }
    );
  }


  //ffinalstartendDate
  finalstartendDate() {
    // console.log(this.startDate,this.endDate)
    this.searchFilterData = '';
    this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    if(this.endDate!="all"){
      this.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
    }
    
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 9,
      dateOrder: "desc",
      text: ""
    };
    this.getUsers(jsonForPagination);
  }

  //reset all filters
  resetFilter(data) {
    setTimeout(() => {
      this.searchFilterData = '';
      this.slectedgrade = "all";
      this.slectedprogram = "all";
      this.endDate = "all";
      this.startDate = "all";
      this.searchText="";
      const jsonForPagination = {
        pageNo: 0,
        maxResult: 9,
        dateOrder: "desc",
        text: ""
      };
      this.getUsers(jsonForPagination);
    }, 100);

  }

  //focus out from input search
  focusOutFunction() {
    if (this.searchFilterData.length == 0) {
      this.getUsers(1);
    }
  }

  //search filter
  searchFilter(event) {
    this.users = [];
    this.pageNo = event - 1;
    this.currentPage = this.pageNo;
    var jsonsearchFilterData;
    this.page = event;
    this.orginaldata = [];
    this.dummyArray = [];
    jsonsearchFilterData = {
      keyword: this.searchFilterData,
      pageNo: this.pageNo,
      maxResult: 9
    }
    this.appSettings.searchFilterStudent(jsonsearchFilterData).subscribe(
      (data: any) => {
        if (data.count === 0) {
          this.dummyArray = [];
          this.snackbar.open("Oops...No Student!!!", null, { duration: 3000 });
          this.skeletonHide = true;
        } else {
          this.lengthsearch = data.listOfStudents.length;
          this.length = data.count;
          this.dummyArray = data.listOfStudents;
        }
      },
      () => { },
      () => {
        this.users = this.dummyArray;
        this.orginaldata = this.users;
        this.skeletonHide = true;
        // this.uniqueGrade();
      }

    );

  }


}
