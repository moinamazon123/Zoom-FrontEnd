import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, Input, ɵConsole } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { Router, RouterLinkWithHref } from "@angular/router";
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort, PageEvent } from "@angular/material";
import { DatePipe } from '@angular/common';
import { isThisISOYear } from "date-fns";
import { DateConvert } from "../../../date-convert";

declare var $: any;
@Component({
  selector: "app-all-subscription",
  templateUrl: "./all-subscription.component.html",
  styleUrls: ["./all-subscription.component.scss"]
})
export class AllSubscriptionComponent implements OnInit, AfterViewInit {
  pageEvent: PageEvent;
  public length = 0;
  @Input() role: any;
  public subscription: any = [];
  displayedColumns: string[] = ["no", "billingName", "studentName","product_name","syllabusName", "Transaction_Date", "validTill", "price", "Netpayable", "order_status"];
  dataSource: any;
  public settings: any;
  public spinnertf = false;
  public searchText: string;
  public page;
  public NoSubscription = false;
  public pageNo = 0;
  public pageSize = 50;public syllabuslist;
  color = "warn";
  mode = "determinate";
  public filter = false;
  public slectedprogram = 'all';
  public filterstatus: any = [];
  public filterdata = {
    startDate: "",
    endDate: "",
    order_status: ""
  }
  public startDate = "all";
  public endDate = "all";
  public slectedstatus = "all";
  public selecteddate = [];
  public mindate = new Date();
  public tempfilterData;
  public gradelist: any
  public slectedgrade = "all";
  public searchFilterData;
  public lengthsearch = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dateConver: DateConvert, public appSettings: AppSettings, public router: Router, public snackbar: MatSnackBar, private cdr: ChangeDetectorRef, public datepipe: DatePipe) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.appSettings.loadallgradefunction().subscribe(data => {
      this.gradelist = data;
    });
    const jsonForPagination = {
      pageIndex: this.pageNo,
      pageSize: this.pageSize
    };
    this.getSubscription(jsonForPagination);
  }

  // get all Subscription based on role

  getSubscription(pagination) {
    if (this.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
    this.pageNo = pagination.pageIndex;
    this.pageSize = pagination.pageSize;

    this.length = 0;
    this.dataSource = null;
    if (this.role === "parent") {
      this.appSettings.getsubscriptionsofparent(sessionStorage.getItem("accountId")).subscribe(
        (data: any) => {
          // console.log(data)
          this.length = data.count;
          if (this.length == 0) {
            this.NoSubscription = true;
          } else {
            this.NoSubscription = false;
            for (let i = 0; i < data.length; i++) {
              if (
                data[i].msg === "Empty list in syllabus" ||
                data[i].msg === "Empty list in Grade" ||
                data[i].msg === "Empty list in registration" ||
                data[i].msg === "Empty list in subscription type" ||
                data[i].msg === "Empty list"
              ) {
              } else {
                // console.log(this.subscription);
                if (data[i].mer_amount != 0) {
                  this.subscription.push(data[i]);
                }

              }
            }
          }
        },
        () => { },
        () => {
          this.spinnertf = true;

          this.dataSource = new MatTableDataSource(this.subscription);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
    } else if (this.role === "Admin") {
      var jsonForPagiantion: any;
     
      this.subscription = [];
     
      jsonForPagiantion = {
        gradeFilter: [this.slectedgrade],
        pageNo: pagination.pageIndex,
        maxResult: pagination.pageSize,
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.slectedstatus,
        "subScriptionFilter": ["all"],
        "syllabusFilter":[this.slectedprogram]
      };
     
      // console.log(jsonForPagiantion)
      this.appSettings.getsubscriptionsForAdmin(jsonForPagiantion).subscribe(
        (data: any) => {
          // console.log(data);
          this.length = data["no of records displaying on this page"];
          if (this.length == 0) {
            this.NoSubscription = true;
          } else {
            this.NoSubscription = false;
            for (let i = 0; i < data.listOfPayments.length; i++) {
              if (
                data.listOfPayments[i].msg === "Empty list in Syllabus" ||
                data.listOfPayments[i].msg === "Empty list in Grade" ||
                data.listOfPayments[i].msg === "Empty list in registration" ||
                data.listOfPayments[i].msg === "Empty list in subscription type" ||
                data.listOfPayments[i].msg === "Empty list" ||
                data.listOfPayments[i].msg==="No Payment found!"
              ) {
              } else {
                if (data.listOfPayments[i].trans_date != "null" || data.listOfPayments[i].trans_date != "Invalid Date") {
                  data.listOfPayments[i].trans_date = this.dateConver.convert(data.listOfPayments[i].trans_date);

                  // data.listOfPayments[i].formated  = data.listOfPayments[i].trans_date = new Date(data.listOfPayments[i].trans_date).getTime();
                  // data.listOfPayments[i].trans_date =  this.datepipe.transform(data.listOfPayments[i].trans_date, 'dd-MM-yyyy');
                }
                if (this.subscription.length < this.length) {

                  this.subscription.push(data.listOfPayments[i]);
                }
              }
            }
          }
        },
        () => { },
        () => {
          this.spinnertf = true;
          this.dataSource = new MatTableDataSource(this.subscription);
          // this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.onFilterstatus();
        }
      );

    }

  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
    this.cdr.detectChanges();

  }

  // for pagination

  public onPageChanged(event) {
    this.page = event;

    if (this.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
  }

  // sort the data in ascending or descending order

  sortData(e) {

    if (e.active === "Transaction_Date") {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        if (a.trans_date && b.trans_date) {
          if (e.direction === "asc") {
            return a.trans_date.getTime() - b.trans_date.getTime();
          }

          if (e.direction === "desc") {
            return b.trans_date.getTime() - a.trans_date.getTime();
          }
        }
      });
    }
    if (e.active === "product_name") {

      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.subscriptionName.localeCompare(b.subscriptionName);
        }

        if (e.direction === "desc") {
          return b.subscriptionName.localeCompare(a.subscriptionName);
        }
      });
    }
    if (e.active === "order_status") {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.order_status.localeCompare(b.order_status);
        }

        if (e.direction === "desc") {
          return b.order_status.localeCompare(a.order_status);
        }
      });
    }
    if (e.active === "price") {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.mer_amount.localeCompare(b.mer_amount);
        }

        if (e.direction === "desc") {
          return b.mer_amount.localeCompare(a.mer_amount);
        }
      });
    }
  }

  // search the data

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // route to invoice detail page
  goToInvoice(data) {
    if (data.order_status == "Success") {
      this.router.navigate(["/Invoice"], { queryParams: { ord_id: data.orderId, subId: data.subsctypeId } });
    }
  }

  onFilterstatus() {
    if (this.filterstatus.length == 0) {
      var data = this.dataSource.data;
      var i;
      var uniqueNames = [];
      for (i = 0; i < data.length; i++) {
        if (uniqueNames.indexOf(data[i].order_status) === -1) {
          uniqueNames.push(data[i].order_status);
        }
      }
      this.filterstatus = uniqueNames
    }
  }


  onExportExcel() {
    this.tempfilterData = {
      gradeFilter: [this.slectedgrade],
      startDate: this.startDate,
      endDate: this.endDate,
      order_status: this.slectedstatus
    }
    // if (this.slectedstatus != "all" && this.startDate && this.endDate) {
    //   this.tempfilterData = {
    //     startDate: this.startDate,
    //     endDate: this.endDate,
    //     order_status: this.slectedstatus
    //   }

    // } else if (this.slectedstatus != "all") {
    //   this.tempfilterData = {
    //     startDate: "",
    //     endDate: "",
    //     order_status: this.slectedstatus
    //   }
    // } else if (this.endDate && this.startDate) {
    //   this.tempfilterData = {
    //     startDate: this.startDate,
    //     endDate: this.endDate,
    //     order_status: ""
    //   }
    // } else {
    //   this.tempfilterData = {
    //     startDate: "",
    //     endDate: "",
    //     order_status: ""
    //   }

    // }
    if (this.endDate == "all" || this.startDate == "all") {
      this.tempfilterData = {
        gradeFilter: [this.slectedgrade],
        startDate: "all",
        endDate: "all",
        status: this.slectedstatus
      }
    }


    this.appSettings.getSubscriptionbyfilterData(this.tempfilterData).subscribe((data: any) => {
      this.snackbar.open("Excel is successfully generated", null, { duration: 2000 });
      var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Invoice.xls";
      link.click();

    },
      (err) => {  }
    );
  }

  //date change from filter
  finalstartendDate(data) {
    this.searchFilterData = '';
    this.paginator.pageIndex = 0;
    if (this.startDate != "all") {
      this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    }
    if (this.endDate != "all") {
      this.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
    }
    this.getSubscription(data);
  }

  //status change from filter
  statusChange(data) {
    this.searchFilterData = '';
    this.paginator.pageIndex = 0;
    this.getSubscription(data);
  }

  //filter by grade
  gradeChange(event) {
    this.appSettings.getsylabus(this.slectedgrade).subscribe(sylabus => {
      this.syllabuslist = sylabus;
    });
    
    this.searchFilterData = '';
    this.paginator.pageIndex = 0;
    const jsonForPagination = {
      pageIndex: this.pageNo,
      pageSize: this.pageSize
    };
    this.getSubscription(jsonForPagination);
  }

  programchange(event) {
    this.appSettings.getsylabus(this.slectedgrade).subscribe(sylabus => {
      this.syllabuslist = sylabus;
    });
    
    this.searchFilterData = '';
    this.paginator.pageIndex = 0;
    const jsonForPagination = {
      pageIndex: this.pageNo,
      pageSize: this.pageSize
    };
    this.getSubscription(jsonForPagination);
  }


  //reset data
  resetFilter(data) {
    setTimeout(() => {
      this.searchFilterData = '';
      this.slectedgrade = "all";
      this.slectedstatus = "all";
      this.endDate = "all";
      this.startDate = "all";
      this.slectedprogram="all"
      this.getSubscription(data);
    }, 100);
  }


  //focus out from input search
  focusOutFunction(event) {
    if (this.searchFilterData.length == 0) {
      this.paginator.pageIndex = 0;
      this.getSubscription(event);
    }
  }

  //search filter
  searchFilter(pagination) {
    this.pageNo = pagination.pageIndex;
    this.pageSize = pagination.pageSize;

    this.length = 0;
    this.dataSource = null;
    this.dataSource = [];
    this.subscription = [];
    var jsonForPagiantion: any;
    jsonForPagiantion = {
      pageNo: pagination.pageIndex,
      maxResult: pagination.pageSize,
      keyword: this.searchFilterData
    };
    this.appSettings.searchFilterSubscription(jsonForPagiantion).subscribe(
      (data: any) => {
        this.length = data.count;
        this.lengthsearch = data.listOfPayments.length;
        if (this.length == 0) {
          this.NoSubscription = true;
        } else {
          this.NoSubscription = false;
          for (let i = 0; i < data.listOfPayments.length; i++) {
            if (
              data.listOfPayments[i].msg === "Empty list in Syllabus" ||
              data.listOfPayments[i].msg === "Empty list in Grade" ||
              data.listOfPayments[i].msg === "Empty list in registration" ||
              data.listOfPayments[i].msg === "Empty list in subscription type" ||
              data.listOfPayments[i].msg === "Empty list"
            ) {
            } else {
              // if(data.listOfPayments[i].trans_date!="null" || data.listOfPayments[i].trans_date!="Invalid Date"){

              //   data.listOfPayments[i].formated  = data.listOfPayments[i].trans_date = new Date(data.listOfPayments[i].trans_date);
              //   // data.listOfPayments[i].trans_date =  this.datepipe.transform(data.listOfPayments[i].trans_date, 'dd-MM-yyyy');
              // }
              if (this.subscription.length < this.length) {
                this.subscription.push(data.listOfPayments[i]);
              }
            }
          }
        }
      },
      () => { },
      () => {
        this.spinnertf = true;
        this.dataSource = new MatTableDataSource(this.subscription);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.onFilterstatus();
      }
    )
  }


}

