import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort } from "@angular/material";
import { AppSettings } from "../../../../app.settings";

@Component({
  selector: "app-talent-test-details",
  templateUrl: "./talent-test-details.component.html",
  styleUrls: ["./talent-test-details.component.scss"]
})
export class TalentTestDetailsComponent implements OnInit, AfterViewInit {
  public datasource: any;
  public talentTest: any = [];
  public talentTestCount: any = [];
  public selectedIndex = -1;
  public count6: any = 0;
  public count7: any = 0;
  public count8: any = 0;
  public count9: any = 0;

  public displayColumOfTalentTest = ["no", "Id", "candidateName", "fatherName", "garde", "schoolName", "email", "phoneNo", "address"];
  @ViewChild("paginator", { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public appSettings: AppSettings, public snackbar: MatSnackBar, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.appSettings.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
    this.talentTestData();
  }

  // get all registered student details

  talentTestData() {
    this.appSettings.talentTestDataFunc().subscribe(
      (data: any) => {
        this.talentTest = data;
        this.talentTest = this.talentTest.sort(function(a, b) {
          const dateA: any = new Date(a["dateOfRegistration"]),
            dateB: any = new Date(b["dateOfRegistration"]);
          return dateA - dateB;
        });
      },
      () => {},
      () => {
        for (let i = 0; i < this.talentTest.length; i++) {
          this.talentTest[i].no = i + 1;
        }
        this.datasource = new MatTableDataSource(this.talentTest);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      }
    );

    this.getGradeWiseCount();
  }

  // to sort the data in ascending or descending

  sortData(e) {
    if (e.active === "candidateName") {
      this.datasource.data = this.datasource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.candidateName.localeCompare(b.candidateName);
        }

        if (e.direction === "desc") {
          return b.candidateName.localeCompare(a.candidateName);
        }
      });
    }
    if (e.active === "Id") {
      this.datasource.data = this.datasource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.candidateId.localeCompare(b.candidateId);
        }

        if (e.direction === "desc") {
          return b.candidateId.localeCompare(a.candidateId);
        }
      });
    }
    if (e.active === "fatherName") {
      this.datasource.data = this.datasource.data.sort((a, b) => {
        if (e.direction === "asc") {
          return a.fatherName.localeCompare(b.fatherName);
        }

        if (e.direction === "desc") {
          return b.fatherName.localeCompare(a.fatherName);
        }
      });
    }
  }

  // to search

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  // to get grade wise counts

  getGradeWiseCount() {
    this.appSettings.talentTestCount().subscribe((count: any) => {
      this.count6 = count.count_6;
      this.count7 = count.count_7;
      this.count8 = count.count_8;
      this.count9 = count.count_9;
    });
  }

  ngAfterViewInit() {
    this.appSettings.settings.loadingSpinner = false;
  }
}
