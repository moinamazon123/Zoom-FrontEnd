import { Component, OnInit, Input, ViewChild, ɵConsole } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatSnackBar, MatTableDataSource, MatPaginator } from "@angular/material";
import { Location } from "@angular/common";

@Component({
  selector: "app-view-report",
  templateUrl: "./view-report.component.html",
  styleUrls: ["./view-report.component.scss"]
})
export class ViewReportComponent implements OnInit {
  @Input() fileId: any;
  @Input() title: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public fileName;
  public result = [];
  public notfound = false;
  public dataSource: any = [];
  public colors = ["accent", "primary", "warn", "green"];
  displayedColumns: any = ["no", "firsName", "totalScore", "writeAnswers", "Remarks"];
  constructor(public appSettings: AppSettings, public snackBar: MatSnackBar, public location: Location) {}

  ngOnInit() {
    this.testReport();
  }

// get test report

  testReport() {
    this.dataSource = null;
    this.fileName = this.title;

    const jsondata = {
      testId: this.fileId
    };
    this.appSettings.getStudentsTestWithFileId(jsondata).subscribe(
      (result: any) => {
        // console.log(result);
        if (result.length === 0) {
          this.notfound = true;

          this.snackBar.open("No Test Report Found!!!", null, { duration: 3000 });
        } else {
          this.result = result;
          for (let i = 0; i < this.result.length; i++) {
            this.result[i].no = i + 1;
            this.result[i].remarks = (this.result[i].writeAnswers / this.result[i].totalScore) * 100;
          }
          this.dataSource = new MatTableDataSource<any>(this.result);
          this.dataSource.paginator = this.paginator;
        }
      },
      () => {},
      () => {}
    );
  }

  // go to previous page

  moveback() {
    this.location.back();
  }

  // search data

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
