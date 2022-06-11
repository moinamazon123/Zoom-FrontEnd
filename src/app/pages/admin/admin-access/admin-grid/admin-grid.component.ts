import { Component, OnInit } from "@angular/core";
import { AppSettings } from "../../../../app.settings";

import { AdminCreateComponent } from "../admin-create/admin-create.component";
import { MatDialog, PageEvent, MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-admin-grid",
  templateUrl: "./admin-grid.component.html",
  styleUrls: ["./admin-grid.component.scss"]
})
export class AdminGridComponent implements OnInit {
  public skeleton = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];  // for number of skeleton card
  public skeletonHide = false;                                      // for show and hide of skeleton
  public users: any = [];                                           // to store admin details
  public page: any;                                                 // for pagination
  public notFound = false;   
  public searchText;                                       // if no. of admin = 0
  constructor(public appsetting: AppSettings, public dialog: MatDialog,public snackbar: MatSnackBar) {}

  ngOnInit() {
    this.loadallAdmin();
  }

  // load all admin
  adminexporttoexcel(){
   
    this.appsetting.getadminlist().subscribe((data: any) => {
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
  loadallAdmin() {
    this.appsetting.loadAllAdminFunc().subscribe(data => {
      if (data[0].msg === "Empty list") {
        this.skeletonHide = true;
        this.notFound = true;
      } else {
        this.users = data;
        this.skeletonHide = true;
      }
    });
  }

  // open dialog box to add new admin

  openUserDialogforAdd(data) {
    const dialogref = this.dialog.open(AdminCreateComponent, {
      data: data
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.skeletonHide = false;
        setTimeout(() => {
          this.loadallAdmin();
        }, 1000);
      }
    });
  }

  // open dialog box to edit admin details

  openUserDialogforUpdate(data) {
    const dialogref = this.dialog.open(AdminCreateComponent, {
      data: data
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.skeletonHide = false;
        setTimeout(() => {
          this.loadallAdmin();
        }, 1000);
      }
    });
  }

  // for pagination

  public onPageChanged(event) {
    this.skeletonHide = false;
    this.page = event;
    this.loadallAdmin();
    if (this.appsetting.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
  }
}
