import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, PageEvent, MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { AdminCreateComponent } from "../admin-create/admin-create.component";
import { AppSettings } from "../../../../app.settings";

@Component({
  selector: "app-admin-list",
  templateUrl: "./admin-list.component.html",
  styleUrls: ["./admin-list.component.scss"]
})
export class AdminListComponent implements OnInit {
  public pageEvent: PageEvent;
  public users: any = [];
  public searchText: any;
  public dataSource;          // to store admin details (MatTableDataSource)
  public page: any;
  public notfound = false;    // if number of admin = 0
  tabeldisplayedColumnsForAdmin: string[] = ["No.", "id", "name", "phonenumber", "dateOfCreation", "primaryEmail", "reports", "Edit"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public appSettings: AppSettings, public snackbar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadallAdmin();
  }

  // load all admin details

  loadallAdmin() {
    this.notfound = false;
    this.dataSource = [];
    this.appSettings.loadAllAdminFunc().subscribe((data: any) => {
      if (data[0].msg == "Empty list") {
        this.notfound = true;
      } else {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  // to search the admin details

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // open dialog box to add new admin

  openUserDialogforAdd(data) {
    const dialogref = this.dialog.open(AdminCreateComponent, {
      data: data
    });
    dialogref.afterClosed().subscribe(data => {
      this.notfound = false;
      this.dataSource = [];
      if (data) {
        setTimeout(() => {
          this.loadallAdmin();
        }, 1000);
      }
    });
  }

  adminexporttoexcel(){
   
    this.appSettings.getadminlist().subscribe((data: any) => {
      // console.log("Hiiii")
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

  // open dilaog box to edit admin details

  openUserDialogforUpdate(data) {
    const dialogref = this.dialog.open(AdminCreateComponent, {
      data: data
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.notfound = false;
        this.dataSource = [];
        setTimeout(() => {
          this.loadallAdmin();
        }, 1000);
      }
    });
  }

  // sort admin details

  sortData(e) {
    if (e.active === "id") {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.accountId.localeCompare(b.accountId);
        }
        if (e.direction === "desc") {
          return b.accountId.localeCompare(a.accountId);
        }
      });
    }
    if (e.active === "name") {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.fullName.localeCompare(b.fullName);
        }
        if (e.direction === "desc") {
          return b.fullName.localeCompare(a.fullName);
        }
      });
    }
  }
}
