import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Location } from "@angular/common";

@Component({
  selector: "app-shared-viewers",
  templateUrl: "./shared-viewers.component.html",
  styleUrls: ["./shared-viewers.component.scss"]
})
export class SharedViewersComponent implements OnInit {
  @Input() sessionId: any;
  @Input() title: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public Recordedviewers: any = [];
  public duration = 0;
  public totalView = 0;
  public arrayOfStartEnd: any;
  public dataSource: any;
  public notfound = false;
  public displaycolumnForViewers: any = ["Sl.No", "Unique Name", "Display Name", "Duration of view", "View Percentage"];
  constructor(public appSettings: AppSettings, public snackBar: MatSnackBar, public location: Location) {}

  ngOnInit() {
    this.getRecordedStat();
  }

  // get the recorded class viewers from learntron

  getRecordedStat() {
    this.dataSource = null;
    this.appSettings.recordedstat(this.sessionId).subscribe(
      (data: any) => {
        this.Recordedviewers = data;
        if (this.Recordedviewers.recordingViews.length === 0) {
          this.duration = 0;
          this.totalView = 0;
          this.snackBar.open("No Recording Analytics Found!!!", null, { duration: 3000 });
          this.notfound = true;
        } else {
          const k = 0;
          const minutes: any = (this.Recordedviewers.recordingDuration / 60000).toFixed(2);
          this.duration = minutes;
          this.totalView = this.Recordedviewers.recordingViews.length;
          for (let i = 0, total = 0; i < this.Recordedviewers.recordingViews.length; i++) {
            if (this.Recordedviewers.recordingViews[i]) {
              data.recordingViews[i].No = k + 1;
              data.recordingViews[i].Unique_Name = data.recordingViews[i].uniqueName;
              data.recordingViews[i].Display_Name = data.recordingViews[i].displayName;
              const timearray = data.recordingViews[i].viewedMetaData;
              this.arrayOfStartEnd = JSON.parse("[" + timearray + "]");
              const diff = this.arrayOfStartEnd[0][this.arrayOfStartEnd[0].length - 1].end - this.arrayOfStartEnd[0][0].start;
              data.recordingViews[i].view_percentage = (parseFloat(((total + diff) / 60000).toFixed(2)) / this.duration) * 100;
              data.recordingViews[i].Duration_of_view = (this.arrayOfStartEnd[0][this.arrayOfStartEnd[0].length - 1].end / 60000).toFixed(2);
            }
          }

          this.dataSource = new MatTableDataSource(data.recordingViews);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      () => {},
      () => {}
    );
  }

  // search data

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // move to previous page

  moveback() {
    this.location.back();
  }
}
