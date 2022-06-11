import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MissedClassComponent } from "./missed-class/missed-class.component";
import { RecordedClassComponent } from "./recorded-class/recorded-class.component";
import { UpcomingClassComponent } from "./upcoming-class/upcoming-class.component";
import { CompletedClassComponent } from "./completed-class/completed-class.component";
import { IncompletedClassComponent } from "./incompleted-class/incompleted-class.component";
import { SharedViewersComponent } from "./shared-viewers/shared-viewers.component";
import { SharedAttendeesComponent } from "./shared-attendees/shared-attendees.component";
import { SharedModule } from "../../shared/shared.module";
import { NgCircleProgressModule } from "ng-circle-progress";
import { BarRatingModule } from "ngx-bar-rating";
import { MoreInfoUpcomingComponent } from "./more-info-upcoming/more-info-upcoming.component";
import { RecordedClassGridComponent } from "./recorded-class-grid/recorded-class-grid.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MoreInfoRecordedComponent } from "./more-info-recorded/more-info-recorded.component";
import { RecordedAnalyticsComponent } from "./recorded-analytics/recorded-analytics.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { RecordedAnalyticsDialogComponent } from './recorded-analytics-dialog/recorded-analytics-dialog.component';


@NgModule({
  imports: [CommonModule, SharedModule, NgCircleProgressModule, FormsModule, ReactiveFormsModule, BarRatingModule, NgxChartsModule],
  declarations: [
    MissedClassComponent,
    RecordedClassComponent,
    UpcomingClassComponent,
    CompletedClassComponent,
    IncompletedClassComponent,
    SharedViewersComponent,
    SharedAttendeesComponent,
    MoreInfoUpcomingComponent,
    RecordedClassGridComponent,
    MoreInfoRecordedComponent,
    RecordedAnalyticsComponent,
    RecordedAnalyticsDialogComponent

  ],
  exports: [
    MissedClassComponent,
    IncompletedClassComponent,
    CompletedClassComponent,
    RecordedClassComponent,
    UpcomingClassComponent,
    SharedViewersComponent,
    SharedAttendeesComponent,
    RecordedClassGridComponent
  ],
  entryComponents: [MoreInfoUpcomingComponent, MoreInfoRecordedComponent, RecordedAnalyticsComponent, RecordedAnalyticsDialogComponent]
})
export class AllEclassesModule {}
