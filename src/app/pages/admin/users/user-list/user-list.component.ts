import { Component, OnInit, ViewChild } from "@angular/core";
import { BreadcrumbComponent } from "../../../../theme/components/breadcrumb/breadcrumb.component";
import { AppSettings } from "../../../../app.settings";
import { MatDialog, MatPaginator, MatSnackBar, MatSidenav, MatSort, MatTableDataSource, Sort, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserDialogComponent } from "../user-dialog/user-dialog.component";
import { User } from "../user.model";
import { UsersService } from "../users.service";
import { MoreInfoParentComponent } from "../more-info-parent/more-info-parent.component";
import { DatePipe } from "@angular/common";
import { count } from "console";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  providers: [UsersService, BreadcrumbComponent]
})
export class UserListComponent implements OnInit {
  public pageEvent: PageEvent;
  public studentfilters = {
    gradefilter: []
  };
  public users: any = [];
  public searchText = "";
  public dataSource;
  public orginaldata: any;
  public role: string;
  public page: any;
  public showDataTable = false;
  public length: any = 0;
  public pageNo;
  public SizeOfPage;
  public allchecked = false;
  public notfound = false;
  public mindate = new Date();

  public slectedgrade = 'all';
  public slectedprogram = 'all';
  public startDate = 'all';
  public endDate = 'all';
  public gradeSelected;
  public tempGrade;
  public gradelist;
  public lengthsearch;
  public searchFilterData;
  public sortdate = 'desc';
  public sortgrade= 'desc';
  public syllabuslist;

  public pageSize; public lengthForPagination;
  tabeldisplayedColumnsForStudent: string[] = ["No.", "name", "gradeName", "syllabusName", "parentFullName", "primaryEmail","class held date", "schoolName","mobileNumber", "block", "reports"];
  tabeldisplayedColumnsForteacher: string[] = ["No.", "id", "name", "phonenumber", "dateOfCreation", "primaryEmail", "reports", "Edit", "block"];
  tabeldisplayedColumnsForparent: string[] = ["No.", "id", "name", "phonenumber", "dateOfCreation", "primaryEmail", "moreinfo"];
  tabeldisplayedColumnsForGuest: string[] = ["No.", "id", "phonenumber", "dateOfCreation", "primaryEmail"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public usersService: UsersService,
    public breadcrumb: BreadcrumbComponent,
    public appSettings: AppSettings,
    public snackbar: MatSnackBar,
    public router: Router,
    public cookieservice: CookieService,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.role = this.breadcrumb.pageTitle.slice(3, this.breadcrumb.pageTitle.length);
    this.appSettings.loadallgradefunction().subscribe(data => {
      this.gradelist = data;
    });
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 10,
      dateOrder: "desc",
      text: this.searchText
    };
    this.getUsers(jsonForPagination);
  }

  public getUsers(jsonForPagiantion): void {
    if (this.appSettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
    this.pageNo = jsonForPagiantion.pageNo;
    this.SizeOfPage = jsonForPagiantion.maxResult;



    this.dataSource = null;
    this.length = 0;


    // list of teacher

    if (this.breadcrumb.pageTitle === " > Teachers") {
    // console.log(jsonForPagiantion)
      this.appSettings.getallteachersfunctionpost(jsonForPagiantion).subscribe(
        (data: any) => {

          if (data.length === 0) {
            this.snackbar.open("Oops...No Teacher!!!", null, { duration: 3000 });
            this.notfound = true;
          } else {
            this.users = data["teachersList"];
            this.lengthForPagination = data["no of records in this page"];
            this.length = data.count;
            
            // console.log(data)
          }
        },
        () => { },
        () => {
          this.dataSource = new MatTableDataSource(this.users);
          // this.dataSource.sort = this.sort;
        }
      );
    }

    // list of parents

    if (this.breadcrumb.pageTitle === " > Parents") {

      // console.log(jsonForPagiantion)

      this.appSettings.getallparentfunction(jsonForPagiantion).subscribe(
        (data: any) => {
          // console.log(data);
          this.lengthForPagination = data["no of records desplaying on this page"];
          if (data.count === 0) {

            this.snackbar.open("Oops...No Parent!!!", null, { duration: 3000 });
            this.notfound = true;
          } else {

            this.length = data.count;
            for (let i = 0; i < data.listOfParents.length; i++) {
              data.listOfParents[i].Slno = i + 1;
            }

            this.users = data.listOfParents;
          }
        },
        () => { },
        () => {
          this.dataSource = new MatTableDataSource(this.users);
          // this.dataSource.sort = this.sort;
        }
      );
    }

    // list of guest

    if (this.breadcrumb.pageTitle === " > Demo Members") {
      this.appSettings.getallDemoMembersfunction(jsonForPagiantion).subscribe(
        (data: any) => {
          this.showDataTable = true;
          if (data.count === 0) {
            this.snackbar.open("Oops...No Student!!!", null, { duration: 3000 });
            this.notfound = true;
          } else {
            this.length = data.count;
            for (let i = 0; i < data.guestDemo.length; i++) {
              data.guestDemo[i].Slno = i + 1;
            }
            this.users = data.guestDemo;
          }
        },
        () => { },
        () => {
          this.dataSource = new MatTableDataSource(this.users);

          this.orginaldata = this.users;

          this.dataSource.sort = this.sort;
        }
      );
    }

    // list of students

    if (this.breadcrumb.pageTitle === " > Students") {
      if (this.slectedgrade == "all") {

      } else {
        jsonForPagiantion["gradeFilter"] = [this.slectedgrade]
      }

      if (this.slectedprogram=='all') {

      } else {
        jsonForPagiantion["ProgramFilter"] = [this.slectedprogram]
      }
      
      jsonForPagiantion["dateRange"] = {
        "startDate": this.startDate,
        "endDate": this.endDate
      }

      jsonForPagiantion["gradeOrder"]=this.sortgrade;
      
      // console.log(jsonForPagiantion)
      this.appSettings.getallstudentsfunction(jsonForPagiantion).subscribe(
        (data: any) => {
          this.showDataTable = true;
          if (data.count === 0) {
            this.snackbar.open("Oops...No Student!!!", null, { duration: 3000 });
            this.notfound = true;
          } else {
            this.notfound = true;
            this.lengthForPagination = data["no of records displaying in this page"];
            this.length = data.count;
            data.listOfStudents.forEach(element => {
              var temp = element.dateOfCreation.split("-");
              element.formatedDate = new Date(temp[1] + "-" + temp[0] + "-" + temp[2])
            });

            this.users = data.listOfStudents;
          }
        },
        () => { },
        () => {
          this.dataSource = new MatTableDataSource(this.users);
          this.orginaldata = this.users;
          this.dataSource.sort = this.sort;
          // this.pageEvent.pageIndex = 0;
        }
      );
    }
  }

  // to search the user
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

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // sort user detail ascending or descending

  sortData(e) {
    // console.log(e.active)
    if (e.active === "dateOfCreation") {
      this.sortdate = e.direction;
      this.pageNo = 0;
      this.pageSize = 10;
      this.length = 0;
      const jsonForPagination = {
        pageNo: 0,
        maxResult: 10,
        dateOrder: this.sortdate,
        text: this.searchText
      };
      this.getUsers(jsonForPagination);
    }
    if (e.active === "class held date") {
      this.sortdate = e.direction;
      this.pageNo = 0;
      this.pageSize = 10;
      this.length = 0;
      const jsonForPagination = {
        pageNo: 0,
        maxResult: 10,
        dateOrder: this.sortdate,
        text: this.searchText
      };
      this.getUsers(jsonForPagination);
    }
    if (e.active === "gradeName") {
     this.sortgrade=e.direction;
      this.pageNo = 0;
      this.pageSize = 10;
      this.length = 0;
      const jsonForPagination = {
        pageNo: 0,
        maxResult: 10,
        dateOrder: this.sortdate,
        text: this.searchText
      };
      
      this.getUsers(jsonForPagination);
    }
  }



  // open report for teacher

  openReport(fullName: any, accountId: string) {
    this.cookieservice.set("userFullName", fullName);
    this.cookieservice.set("userAccountId", accountId);
    this.router.navigate(["dashboard/admin/", this.role, "report"]);
  }

  // open report for student

  openReportForStudent(data) {
    this.cookieservice.set("userFullName", data.fullName);
    this.cookieservice.set("userAccountId", data.accountId);
    this.cookieservice.set("batchId", data.batchId);
    this.router.navigate(["dashboard/admin/", this.role, "Studentreport"]);
  }

  //  show analytics

  showAnalytics(data) {
    this.cookieservice.set("userFullName", data.fullName);
    this.cookieservice.set("userAccountId", data.accountId);
    this.cookieservice.set("className", data.gradeName);
    this.cookieservice.set("batchId", data.batchId);
    this.cookieservice.set("gradeId", data.gradeId);
    this.router.navigate(["dashboard/admin/", this.role, "analytics"]);
  }

  // delete teacher

  public deleteUser(users: any) {
    if (this.breadcrumb.pageTitle === " > Teachers") {
      this.appSettings.deleteteachersfunction(users.accountId).subscribe((data: any) => {
        const objIndex = this.users.findIndex((o: any) => o.accountId === users.accountId);
        if (objIndex > -1) {
          this.users.splice(objIndex, 1);
          this.snackbar.open(data.message, null, { duration: 3000 });
        }
      });
    }
  }

  // update teacher

  public updateUser(user: User) {
    if (this.breadcrumb.pageTitle === " > Teachers") {
      this.appSettings.updateteacherfunction(user).subscribe((data: any) => {
        this.snackbar.open(data.msg, null, { duration: 3000 });
        const paginationJson = {
          pageIndex: this.pageNo,
          pageSize: this.SizeOfPage
        };
        this.getUsers(paginationJson);
      });
    }
  }

  // status change for student and teacher

  public statuschange(user: any) {
    if (this.breadcrumb.pageTitle === " > Teachers") {
      this.appSettings.updateteacherfunction(user).subscribe(data => {
        this.snackbar.open("status updated successfully", null, { duration: 3000 });
        const paginationJson = {
          pageIndex: this.pageNo,
          pageSize: this.SizeOfPage
        };
        this.getUsers(paginationJson);
      });
    }

    if (this.breadcrumb.pageTitle === " > Students") {
      const jsondataForStatus = {
        sAccountId: user.accountId
      };

      this.appSettings.statusUpdateStudent(jsondataForStatus).subscribe(data => {
        this.snackbar.open("status updated successfully", null, { duration: 3000 });
        const paginationJson = {
          pageIndex: this.pageNo,
          pageSize: this.SizeOfPage
        };
        this.getUsers(paginationJson);
      });
    }
  }

  // if any new user added

  public addUser(user: User) {
    const paginationJson = {
      pageIndex: this.pageNo,
      pageSize: this.SizeOfPage
    };
    this.getUsers(paginationJson);
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

  // open dialog box to update teacher

  public openUserDialogforUpdate(user) {
    delete user.Slno;
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

  dateConvertion(data) {
    return new Date(data)
  }


  //filter by grade
  gradeChange(event) {
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
  programchange(event) {
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
  finalstartendDate(event) {
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


  resetFilter(event) {
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
  focusOutFunction(event) {
    if (this.searchFilterData.length == 0) {
      this.paginator.pageIndex = 0;
      this.getUsers(event);
    }
  }


  teacherexporttoexcel() {

    this.appSettings.getteacherlist().subscribe((data: any) => {
      // console.log("Hiiii")
      this.snackbar.open("Excel is successfully generated", null, { duration: 2000 });
      var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Invoice.xls";
      link.click();

    },
      (err) => { }
    );
  }


  parentexporttoexcel() {

    this.appSettings.getparentlist().subscribe((data: any) => {
      // console.log("Hiiii")
      this.snackbar.open("Excel is successfully generated", null, { duration: 2000 });
      var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Invoice.xls";
      link.click();

    },
      (err) => { }
    );
  }

  //search filter
  searchFilter(event) {
    if (this.breadcrumb.pageTitle === " > Students") {
      this.pageNo = event.pageIndex;
      this.SizeOfPage = event.pageSize;
      //  this.pageEvent.pageIndex = event.pageIndex
      this.dataSource = null;
      this.length = 0;
      this.users = [];
      this.users = null; // for show spinner each time // for show spinner each time
      var jsonsearchFilterData;
      jsonsearchFilterData = {
        keyword: this.searchFilterData,
        pageNo: event.pageIndex,
        maxResult: event.pageSize
      };
      this.appSettings.searchFilterStudent(jsonsearchFilterData).subscribe(
        (data: any) => {
          this.showDataTable = true;
          if (data.count === 0) {
            this.length = data.count;
            this.snackbar.open("Oops...No Student!!!", null, { duration: 3000 });
            this.notfound = true;
          } else {

            this.length = data.count;
            this.lengthsearch = data.listOfStudents.length;
            for (let i = 0; i < data.listOfStudents.length; i++) {
              data.listOfStudents[i].Slno = i + 1;
            }
            data.listOfStudents.forEach(element => {
              var temp = element.dateOfCreation.split("-");
              element.formatedDate = new Date(temp[1] + "-" + temp[0] + "-" + temp[2])
            });

            this.users = data.listOfStudents;
          }
        },
        () => { },
        () => {
          this.dataSource = new MatTableDataSource(this.users);
          this.orginaldata = this.users;
          this.dataSource.sort = this.sort;
          // this.pageEvent.pageIndex = 0;
        }


      );

    }
  }

}
