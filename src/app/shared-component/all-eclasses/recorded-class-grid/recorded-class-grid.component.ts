import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort, PageEvent } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { RecordedAnalyticsComponent } from "../recorded-analytics/recorded-analytics.component";
import { MoreInfoRecordedComponent } from "../more-info-recorded/more-info-recorded.component";
import { RecordedAnalyticsDialogComponent } from "../recorded-analytics-dialog/recorded-analytics-dialog.component";
import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-recorded-class-grid",
  templateUrl: "./recorded-class-grid.component.html",
  styleUrls: ["./recorded-class-grid.component.scss"]
})
export class RecordedClassGridComponent implements OnInit {
  public pageEvent: PageEvent;
  @Input() role: any;
  @Input() subsTypeId: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() accountId: any;
  @Input() gradeName: any;
  public urlchecker;
  public slectedgrade = "all";
  public slectedsylabus = "all";
  public slectedsubject = "all";
  public slectedchapter = "all";
  public startDateadmin = "all";
  public endDateadmin = "all";
  public slectedtype = "all";
  public slectedteacher = "all";
  public mindate = new Date();
  public gradelist;
  public syllabuslist;
  public subjectlist;
  public chapterlist;
  public teacherlist;
  public searchText;
  dataSourcetable: any;
  public pageNo = 0;
  public pageSize = 10;
  public length;
  displayedColumnsForrecorder: string[] = ["Select", "No.", "Title", "gradeName", "subjectName", "Teacher Name", "class held date", "view Recording"];

  public allcheckedteacher = true;
  public allcheckedsub = true;
  public allcheckedgrade = true;
  public allcheckedsys = true;
  orginalrecorderclasses;
  livedataSourcetable: any;
  public settings: any;
  public allclasses = [];
  public notfoundrecordedclass = false;
  public notfoundlive = false;
  public classrooms: any = [];
  public teacherdatatoattend: any = [];
  public liveclassroom: any = [];
  public spinnertf = false;
  public recordedclassrooms: any = [];
  public testclasses: any = [];
  public teacherId: any;
  public liveclass;
  public overallRating: any = 0;
  public lengthForPagination = 0;
  public currentPage;
  public maxSizeForPage;
  public urlParameter;
  selection = new SelectionModel(true, []);
  public deleteMultipleArr: any = [];
  public numSelected;
  public numRows;
  public filters;
  public startDate = "all";
  public endDate = "all";
  constructor(
    public cookieservice: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    public appSettings: AppSettings,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public datepipe: DatePipe
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {


    //get all grades
    this.appSettings.loadallgradefunction().subscribe(data => {
      this.gradelist = data;
    });

    //load all teachers
    this.appSettings.getallteachersfunction().subscribe(
      (data: any) => {
        this.teacherlist = data;
      });

    this.route.pathFromRoot[1].url.subscribe(val => (this.urlParameter = val[0].path));

    this.route.params.subscribe(data => {
      this.gradeName = data.id;
    });
    if (sessionStorage.getItem("role") != "Admin") {
      this.appSettings.getsylabus1(sessionStorage.getItem("accountId")).subscribe(subject => {

        this.slectedsylabus = subject[0]['syllabusId'];
        const jsonForPagination = {
          pageNo: 0,
          maxResult: this.pageSize
        };
        this.syllabuslist = subject;
        console.log(this.syllabuslist)
        this.appSettings.getsubjects1(this.slectedsylabus).subscribe(subject => {
          this.subjectlist = subject;
        });
        this.recordedclass(jsonForPagination);
      });
    }

    const jsonForPagination = {
      pageNo: this.pageNo,
      maxResult: this.pageSize
    };
    this.recordedclass(jsonForPagination);
    // this.sort.sortChange.subscribe(() => {
    //   this.paginator.pageIndex = 0;

    //   this.recordedclass(jsonForPagination);
    // });
  }

  // get all recorded class based on the role of the user

  recordedclass(pageevent) {
    // console.log(this.appSettings.userdetails)
    this.pageNo = pageevent.pageNo;
    this.pageSize = pageevent.maxResult;
    this.currentPage = pageevent.pageNo;
    this.maxSizeForPage = pageevent.maxResult;
    this.dataSourcetable = null;
    this.allclasses = [];
    this.recordedclassrooms = [];
    this.lengthForPagination = 0;
    this.teacherdatatoattend = [];
    if (this.role === "student") {
     
      var jsonForPagination: any;
      // this.appSettings.getsubjects(this.appSettings.userdetails.gradeId, this.appSettings.userdetails.syllabusId).subscribe(subject => {
      //   this.subjectlist = subject;

      // });
      if (this.slectedsubject == "all") {
        jsonForPagination = {
          // gradeFilter: [this.appSettings.userdetails.gradeId],
          syllabusFilter: [this.slectedsylabus],
          // subjectFilter:[this.slectedsubject],
          pageNo: pageevent.pageNo,
          maxResult: pageevent.maxResult,
          batchId: sessionStorage.getItem("accountId"),
          dateOrder: "desc",
          titleOrder: "asc"
        };

      } else {
        this.appSettings.getChapters(this.appSettings.userdetails.gradeId, this.appSettings.userdetails.syllabusId, this.slectedsubject).subscribe(chapter => {
          this.chapterlist = chapter;
        });
        if (this.slectedchapter == "all") {
          jsonForPagination = {
            gradeFilter: [this.appSettings.userdetails.gradeId],
            // syllabusFilter: [this.appSettings.userdetails.syllabusIds],
            subjectFilter: [this.slectedsubject],
            pageNo: pageevent.pageNo,
            maxResult: pageevent.maxResult,
            batchId: sessionStorage.getItem("accountId"),
            dateOrder: "desc",
            titleOrder: "asc"
          };
        } else {
          jsonForPagination = {
            gradeFilter: [this.appSettings.userdetails.gradeId],
            // syllabusFilter: [this.appSettings.userdetails.syllabusIds],
            subjectFilter: [this.slectedsubject],
            chapterFilter: [this.slectedchapter],
            pageNo: pageevent.pageNo,
            maxResult: pageevent.maxResult,
            batchId: sessionStorage.getItem("accountId"),
            dateOrder: "desc",
            titleOrder: "asc"
          };
        }
      }
      this.filters = {

        syllabusFilter: [this.slectedsylabus],
        subjectFilter: [this.slectedsubject],
        chapterFilter: [this.slectedchapter],
        pageNo: pageevent.pageNo,
        maxResult: pageevent.maxResult,
        batchId: sessionStorage.getItem("accountId"),
        dateOrder: "desc",
        titleOrder: "asc"
      }
      jsonForPagination.freeclass = this.appSettings.URL.Freeclass[sessionStorage.getItem('gradeId')];
      // jsonForPagination.text = pageevent.text;
      if(jsonForPagination['text']!== 'undefined'){
        jsonForPagination['text'] = this.searchText;
      }
      if (this.startDate != "all") {
        jsonForPagination['startDate'] = this.startDate
      } else {
        jsonForPagination['startDate'] = "all"
      }
      if (this.endDate != "all") {
        jsonForPagination['endDate'] = this.endDate
      } else {
        jsonForPagination['endDate'] = "all"

      }
      // console.log('jsonForPagination', jsonForPagination);
      if (this.urlchecker) {
        this.urlchecker.unsubscribe();
      }
      this.urlchecker = this.appSettings.getclassbygrade(jsonForPagination).subscribe(
        (data: any) => {
          this.allclasses=[];
          this.recordedclassrooms=[];
          this.lengthForPagination = data['countRecordedClass'];
          this.allclasses = data.recordedClassList;

          // console.log(data)

          for (let i = 0; i < this.allclasses.length; i++) {
            this.overallRating = 0;
            this.allclasses[i].rating = 0;
            this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
            this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + this.allclasses[i].endTime * 60000);

            if (this.allclasses[i].sessionId != null) {
              this.allclasses[i].status = "completed";
              if (this.recordedclassrooms.length < this.lengthForPagination) {
                this.recordedclassrooms.push(this.allclasses[i]);
              }
            }
          }
        },
        () => { },
        () => {
          this.dataSourcetable = new MatTableDataSource(this.recordedclassrooms);

          // console.log(this.dataSourcetable)
          this.dataSourcetable.sort = this.sort;
        }
      );
    } else if (this.role === "admin") {
      let k = 1;




      jsonForPagination = {
        pageNo: this.pageNo,
        maxResult: pageevent.maxResult,
        gradeFilter: [this.slectedgrade],
        syllabusFilter: [this.slectedsylabus],
        chapterFilter: [this.slectedchapter],
        teacher: this.slectedteacher,
        subjectFilter: [this.slectedsubject],
        startDate: this.startDateadmin,
        dateOrder: "desc",
        endDate: this.endDateadmin,
        accessTo: this.slectedtype
      };
      if (this.slectedgrade != "all") {
        this.appSettings.getsylabus(this.slectedgrade).subscribe(sylabus => {
          this.syllabuslist = sylabus;
        });
      }
      if (this.slectedsylabus != "all") {
        this.appSettings.getsubjects(this.slectedgrade, this.slectedsylabus).subscribe(subject => {
          this.subjectlist = subject;
        });
      }
      if (this.slectedsubject != "all") {
        this.appSettings.getChapters(this.slectedgrade, this.slectedsylabus, this.slectedsubject).subscribe(chapter => {
          this.chapterlist = chapter;
        });
      }

      jsonForPagination['text'] = this.searchText;

      console.log(jsonForPagination)

      this.appSettings.getallclasses(jsonForPagination).subscribe(
        (data: any) => {
          // console.log(data)
          this.allclasses=[];
          this.recordedclassrooms=[];
          this.lengthForPagination = data['no of recordedClasses displaying in this page'];
          this.allclasses = data.recordedClassList;

          this.overallRating = 0;
          for (let i = 0; i < this.allclasses.length; i++) {
            this.allclasses[i].rating = 0;
            this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
            this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + data.recordedClassList[i].endTime * 60000);

            if (data.recordedClassList[i].sessionId != null) {
              this.allclasses[i].status = "completed";
              this.allclasses[i].slno = k;
              if (this.recordedclassrooms.length < this.lengthForPagination) {
                this.recordedclassrooms.push(this.allclasses[i]);
              }
              k++;
            }
            this.allclasses[i].scheduledDateutc = this.allclasses[i].scheduledDate.toLocaleString();
            this.allclasses[i].enddateutc = this.allclasses[i].enddate.toLocaleString();
          }
        },
        () => { },
        () => {
          this.orginalrecorderclasses = this.recordedclassrooms;
          this.pageNo=0;
          this.dataSourcetable = new MatTableDataSource(this.recordedclassrooms);
        
          // this.dataSourcetable.paginator = this.paginator;
          this.dataSourcetable.sort = this.sort;

          //
        }
      );
    } else if (this.role === "guest") {
      const jsonForPagination = {
        pageNo: pageevent.pageNo,
        gradeName: this.gradeName,
        maxResult: pageevent.maxResult
      };
      this.appSettings.getclassbygradeForGuest(jsonForPagination).subscribe(
        (data: any) => {
          this.lengthForPagination = data.countRecordedClass;
          this.allclasses = data.recordedClassList;

          for (let i = 0; i < this.allclasses.length; i++) {
            this.overallRating = 0;
            this.allclasses[i].rating = 0;
            this.allclasses[i].scheduledDate = new Date(this.allclasses[i].scheduledDate);
            this.allclasses[i].enddate = new Date(this.allclasses[i].scheduledDate.getTime() + this.allclasses[i].endTime * 60000);
            if (this.allclasses[i].sessionId != null && this.allclasses[i].accessTo != "others (Admin & teacher)") {
              this.allclasses[i].status = "completed";
              if (this.recordedclassrooms.length < this.lengthForPagination) {
                this.recordedclassrooms.push(this.allclasses[i]);
              }
            }
          }
        },
        () => { },
        () => {
          this.dataSourcetable = new MatTableDataSource(this.recordedclassrooms);

          // this.dataSourcetable.paginator = this.paginator;
          this.dataSourcetable.sort = this.sort;
        }
      );
    } else {
      this.role = "teacher";
      if (this.slectedgrade == "all") {
        jsonForPagination = {
		  gradeFilter: [this.slectedgrade],
          pageNo: this.pageNo,
          maxResult: pageevent.maxResult,
          teacherAccountId: this.accountId
        };
      } else {
        jsonForPagination = {
          gradeFilter: [this.slectedgrade],
          pageNo: this.pageNo,
          teacherAccountId: this.accountId,
          maxResult: pageevent.maxResult
        };
      }
	  
	   var jsonForPagination1 = {
        pageNo: 0,
        maxResult:500,
        gradeFilter: ['all'],
        syllabusFilter: ['all'],
        chapterFilter: ['all'],
        teacher: this.slectedteacher,
        subjectFilter: ['all'],
        startDate: "all",
        dateOrder: "desc",
        endDate: "all",
        accessTo: "others (Admin & teacher)"
      };
	  
	   this.appSettings.getallclasses(jsonForPagination1).subscribe(
        (data: any) => {
			console.log(data)
		})

   
      jsonForPagination['text'] = "";
	     console.log(jsonForPagination)
      this.appSettings.teacherclassrooms(jsonForPagination).subscribe(
        (data: any) => {
		  console.log(data)
          this.classrooms=[];
          this.recordedclassrooms=[];
          this.lengthForPagination = data['no of recordedClasses displaying in this page'];
          this.classrooms = data.recordedClassList;

          // console.log(data)

          // this.classrooms = data.recordedClassList;

          // this.lengthForPagination = data.countRecordedClass;

        

          if (this.classrooms.length === 0) {
            this.snackBar.open("No Recorded Class Found!!!", null, { duration: 2000 });
          } else {
            for (let i = 0; i < this.classrooms.length; i++) {
             
              this.overallRating = 0;
              this.classrooms[i].rating = 0;

              this.classrooms[i].scheduledDate = new Date(this.classrooms[i].scheduledDate);
              this.classrooms[i].enddate = new Date(this.classrooms[i].scheduledDate.getTime() + this.classrooms[i].endTime * 60000);

              if (this.classrooms[i].sessionId != null) {
                this.classrooms[i].status = "completed";
                // console.log(this.recordedclassrooms.length , this.lengthForPagination)
                if (this.recordedclassrooms.length < this.lengthForPagination) {
                
                  this.recordedclassrooms.push(this.classrooms[i]);
                }
              }
            }
          }
        },
        () => { },
        () => {
		this.appSettings.getallclasses(jsonForPagination1).subscribe(
        (data: any) => {
			console.log()
			this.recordedclassrooms.concat(data['recordedClassList'])
		},()=>{
			
		})
          this.dataSourcetable = new MatTableDataSource(this.recordedclassrooms);
          // this.dataSourcetable.paginator = this.paginator;
          this.dataSourcetable.sort = this.sort;
        }
      );
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    this.numSelected = this.selection.selected.length;
    this.numRows = this.recordedclassrooms.length;
    return this.numSelected === this.numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(event) {


    if (event.checked) {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourcetable.data.forEach(row => this.selection.select(row));
      this.dataSourcetable.data.forEach(element => {
        this.deleteMultipleArr.push(element.sessionId);
      });
    } else {
      this.deleteMultipleArr = [];
      this.selection.clear();
    }

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  // sort the data in ascending or descending data

  sortData(e) {
    if (e.active === "class held date") {
      this.dataSourcetable.data = this.dataSourcetable.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.scheduledDate.getTime() - b.scheduledDate.getTime();
        }

        if (e.direction === "desc") {
          return b.scheduledDate.getTime() - a.scheduledDate.getTime();
        }
      });
    }
    if (e.active === "Title") {
      this.dataSourcetable.data = this.dataSourcetable.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.title.localeCompare(b.title);
        }

        if (e.direction === "desc") {
          return b.title.localeCompare(a.title);
        }
      });
    }
    if (e.active === "subjectName") {
      this.dataSourcetable.data = this.dataSourcetable.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.subjectName.localeCompare(b.subjectName);
        }

        if (e.direction === "desc") {
          return b.subjectName.localeCompare(a.subjectName);
        }
      });
    }
  }

  // for pagination

  pageno(event) {

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
    this.recordedclass(jsonForPagination);
  }

  // for search

  applyFilter(filterValue: string) {

    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    this.allclasses=[];
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 10,
      text: filterValue
    };
    this.recordedclass(jsonForPagination);
  }

  // get into recorded class (learntron)

  getintorecordedclass(session) {
    if (this.role === "admin") {
      window.open(session.replayUrl, "_self");
    } else {
      if (this.role === "student") {
        sessionStorage.setItem("sessionId", session.sessionId);
        this.dialog.open(RecordedAnalyticsDialogComponent, {
          data: session
        });
      } else {
        this.appSettings.launchstudentclassroom(session.sessionId).subscribe((data: any) => {
          window.open(data.urls[0].url, "_self");
        });
      }
    }
  }

  // route to attendees page

  getAttendees(session) {
    this.router.navigate(["dashboard/admin/e-Classes/attendees", session.sessionId, session.title]);
  }

  // route to viewers page

  getViewers(session) {
    this.router.navigate(["dashboard/admin/e-Classes/viewers", session.sessionId, session.title]);
  }

  // routing to grid view for different users

  gridRouting() {
    if (this.role === "admin") {
      this.router.navigate(["/dashboard/" + this.role + "/e-Classes/recorded"]);
    } else if (this.role === "student") {
      this.router.navigate(["/dashboard/student/myClass/recordedClassGrid"]);
    } else if (this.role === "teacher") {
      this.router.navigate(["/dashboard/teacher/recordedClass/Grid"]);
    } else if (this.urlParameter === "Demo") {
      this.router.navigate(["/Demo/" + this.gradeName + "/class/Member/Recorded"]);
    } else if (this.urlParameter === "Guest") {
      this.router.navigate(["/Guest/" + this.gradeName + "/Member/Recorded"]);
    }
  }

  // open dialog box for more info about the class

  openmoreinfo(data) {
    this.dialog.open(MoreInfoRecordedComponent, {
      data: data
    });
  }

  // open dialog box for recorded analytics

  openrecordedStat(data) {
    this.dialog.open(RecordedAnalyticsComponent, {
      data: data
    });
  }

  // delete recorded class

  deleteclass(data) {
    this.recordedclassrooms = [];
    this.appSettings.deleteclassfunction(data).subscribe(
      (result: any) => {
        this.snackBar.open("Recorded video has been deleted successfully", null, { duration: 2000 });
      },
      () => { },
      () => {
        const jsonForPagination = {
          pageNo: this.currentPage,
          maxResult: this.maxSizeForPage
        };
        this.recordedclass(jsonForPagination);
      }
    );
  }

  // for filter

  // gradeChange(data) {
  //   this.searchText = '';
  //   this.paginator.pageIndex = 0;
  //   this.recordedclassrooms = [];
  //   this.dataSourcetable = null;
  //   this.slectedsylabus = "all";
  //   this.slectedsubject = "all";
  //   this.slectedchapter = "all";
  //   this.recordedclass(data);
  // }

  // syllabusChange(data) {
  //   this.searchText = '';
  //   this.recordedclassrooms = [];
  //   this.slectedsubject = "all";
  //   this.slectedchapter = "all";
  //   this.recordedclass(data);
  // }

  // subjectChange(data) {
  //   this.searchText = '';
  //   this.recordedclassrooms = [];
  //   this.slectedchapter = "all";
  //   this.recordedclass(data);
  // }

  // chapterChange(data) {
  //   this.searchText = '';
  //   this.recordedclassrooms = [];
  //   this.recordedclass(data);
  // }

  //click checkBoxs
  onClickCheckBox(event, session) {

    if (event.checked) {

      this.deleteMultipleArr.push(session.sessionId)


    } else {
      this.deleteMultipleArr.splice(this.deleteMultipleArr.indexOf(session.sessionId), 1);
    }
    //   if(this.deleteMultipleArr.indexOf("session.sessionId") !== -1){

    //    this.deleteMultipleArr.push(session.sessionId);

    // }else {
    // } 
  }


  // for filter
  //grade filter
  gradeChange(data) {
    this.pageNo = 0
    this.searchText = '';
    this.syllabuslist = [];
    this.subjectlist = [];
    this.slectedsylabus = "all";
    this.slectedsubject = "all";
    this.slectedchapter = "all";
    this.appSettings.getsylabus(this.slectedgrade).subscribe(sylabus => {
      this.syllabuslist = sylabus;
    });
    this.recordedclass(data);
  }
  getsubjectsforgradestudent(data) {
    this.subjectlist = [];
    this.slectedsubject = "all";

    this.appSettings.getsubjects1(this.slectedsylabus).subscribe(subject => {
      // console.log(subject)
      this.subjectlist = subject;
    });
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 10,
    };
    this.recordedclass(jsonForPagination);
  }
  //syllabus filter
  syllabusChange(data) {
    this.pageNo = 0;

    this.searchText = '';
    this.subjectlist = [];
    this.chapterlist = [];
    this.slectedsubject = "all";
    this.slectedchapter = "all";
    this.appSettings.getsubjects(this.slectedgrade, this.slectedsylabus).subscribe(
      subject => {
        this.subjectlist = subject;
      }
    );
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 10,
    };

    this.recordedclass(jsonForPagination);
    // this.recordedclass(data);
  }

  //subject filter
  subjectChange(data) {
    this.pageNo = 0;

    this.searchText = '';
    this.chapterlist = [];
    this.slectedchapter = "all";
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    this.paginator.pageIndex = 0;
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 10
    };

    this.recordedclass(jsonForPagination);
  }

  //subject filter
  chapterChange(data) {
    this.searchText = '';

    this.pageNo = 0;
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 10
    };

    this.recordedclass(jsonForPagination);
  }

  //date filter
  finalstartendDate(data) {
    this.searchText = '';
    if (this.startDateadmin != "all") {
      this.startDateadmin = this.datepipe.transform(this.startDateadmin, 'yyyy-MM-dd');
    }

    if (this.endDateadmin != "all") {
      this.endDateadmin = this.datepipe.transform(this.endDateadmin, 'yyyy-MM-dd');
    }

    if (this.startDate != "all") {
      this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    }

    if (this.endDate != "all") {
      this.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
    }
    this.pageNo = 0;
    this.pageSize = 10;
    this.length = 0;
    const jsonForPagination = {
      pageNo: 0,
      maxResult: 10,
    };

    this.recordedclass(jsonForPagination);
    // this.recordedclass(data);
  }

  //teacher filter
  teacherChange(data) {
    this.searchText = '';
    this.recordedclass(data);
  }

  //type of class filter
  typeChange(data) {
    this.searchText = '';
    this.recordedclass(data);
  }

  // reset button
  resetFilter(data) {
    setTimeout(() => {
      this.searchText = '';
      this.slectedgrade = 'all';
      this.slectedsylabus = 'all'
      this.slectedsubject = 'all';
      this.slectedteacher = 'all';
      this.slectedchapter = "all";
      this.startDateadmin = "all";
      this.endDateadmin = "all";
      this.slectedtype = "all";
      this.syllabuslist = [];
      this.subjectlist = [];
      this.chapterlist = [];
      this.recordedclass(data);
    }, 100);
  }

  //panel close reset filters
  // panelState(data) {
  //   setTimeout(() => {
  //     this.slectedgrade = 'all';
  //     this.slectedsylabus = 'all'
  //     this.slectedsubject = 'all';
  //     this.slectedteacher = 'all';
  //     this.startDate = "all"
  //     this.syllabuslist = [];
  //     this.subjectlist = [];
  //     this.recordedclass(data);
  //   }, 100);
  // }
  listRouting() {
    if (this.role === "admin") {
      this.router.navigate(["/dashboard/" + this.role + "/e-Classes/recordedList"]);
    } else if (this.role === "student") {
      this.router.navigate(["/dashboard/student/myClass/recordedClass"]);
    } else if (this.role === "teacher") {
      this.router.navigate(["/dashboard/teacher/recordedClass"]);
    } else if (this.urlParameter === "Demo") {
      this.router.navigate(["/Demo/" + this.gradeName + "/class/Member/Recordedlist"]);
    } else if (this.urlParameter === "Guest") {
      this.router.navigate(["/Guest/" + this.gradeName + "/Member/Recordedlist"]);
    }
  }

  //delete multiple records
  ondeleteRecord(data) {
    if (this.deleteMultipleArr.length > 0) {
      this.recordedclassrooms = [];
      this.numRows = 0;
      this.numSelected = 0;
      var jsonforDelete = {
        sessionIds: this.deleteMultipleArr
      }
      this.appSettings.deleteclassMultiple(jsonforDelete).subscribe((Responsedata: any) => {
        this.snackBar.open("Recorded video has been deleted successfully", null, { duration: 2000 });
      },
        () => { },
        () => {
          const jsonForPagination = {
            pageNo: this.currentPage,
            maxResult: this.maxSizeForPage
          };
          // this.dataSourcetable = [];
          this.deleteMultipleArr = [];
          this.recordedclass(jsonForPagination);

        }
      );
    }
  }


}
