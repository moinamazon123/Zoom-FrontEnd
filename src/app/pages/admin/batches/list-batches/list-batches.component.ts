import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddStudentBatchComponent } from "../add-student-batch/add-student-batch.component";
import { AddBatchComponent } from "../add-batch/add-batch.component";
import { AppSettings } from "../../../../app.settings";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-batches",
  templateUrl: "./list-batches.component.html",
  styleUrls: ["./list-batches.component.scss"]
})
export class ListBatchesComponent implements OnInit {
  public batches: any = [];
  public skeletonHide = false;
  public skeleton = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  public searchText: any;
  public length;
  public currentPage;
  public gradelist: any;
  public syllabuslist: any;
  public slectedgrade = "all";
  public slectedprogram = "all";
  constructor(public dialog: MatDialog, private appsettings: AppSettings, public router: Router) { }

  ngOnInit() {
    this.appsettings.loadallgradefunction().subscribe(data => {
      this.gradelist = data;
    });
    this.getAllBatches(1);
  }

  // get all batches

  getAllBatches(pageNo) {
    this.currentPage = pageNo - 1;
    const jsonForPagination = {
      pageNo: pageNo - 1,
      maxResult: 9,
      "gradeId": this.slectedgrade,


      "dateOrder": "asc",
      "syllabusId": this.slectedprogram
    };
    // console.log(jsonForPagination)
    this.batches = [];
    this.appsettings.getBatches(jsonForPagination).subscribe(
      (data: any) => {
        // console.log(data)
        this.length = data["no of records displaying in this page"];
        this.batches = data.batchList;

        
      },
      () => { },
      () => {
        this.skeletonHide = true;
      }
    );
  }

  // open dialog box for creating new batch

  openDIalogForCreateBatch(data) {
    const dialogRef = this.dialog.open(AddBatchComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllBatches(this.currentPage);
      }
    });
  }

  // for pagination

  onPageChanged(event) {
    if (this.appsettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
    this.getAllBatches(event);
    this.currentPage = event;
  }

  // to add student to the batch

  manageStudentDialog(data) {
    this.router.navigate(["/dashboard/admin/Batch/addStudent", data.batchId]);
  }
  gradeChange(event) {
    this.appsettings.getsylabus(this.slectedgrade).subscribe(sylabus => {
      this.syllabuslist = sylabus;
    });
    if(this.slectedgrade=="all"){
      this.slectedprogram="all";
    }
    this.getAllBatches(1)

  }

  programchange(event) {

    this.getAllBatches(1)

  }
}
