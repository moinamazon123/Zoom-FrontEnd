import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportComponent } from "./report/report.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { SharedModule } from "../../shared/shared.module";
import { BarRatingModule } from "ngx-bar-rating";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ZerodataDialogComponent } from "./zerodata-dialog/zerodata-dialog.component";

@NgModule({
  imports: [CommonModule, SharedModule, BarRatingModule, NgCircleProgressModule, NgxChartsModule],
  declarations: [ReportComponent, AnalyticsComponent, ZerodataDialogComponent],
  exports: [ReportComponent, AnalyticsComponent],
  entryComponents: [ZerodataDialogComponent]
})
export class ReportAnalyticsModule {}
