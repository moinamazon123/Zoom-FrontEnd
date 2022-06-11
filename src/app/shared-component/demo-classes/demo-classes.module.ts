import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoRecordedGridComponent } from "./demo-recorded-grid/demo-recorded-grid.component";
import { DemoRecordedListComponent } from "./demo-recorded-list/demo-recorded-list.component";
import { DemoUpcomingclassComponent } from "./demo-upcomingclass/demo-upcomingclass.component";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BarRatingModule } from "ngx-bar-rating";
import { RouterModule } from "@angular/router";
import { DemoUpcomingDialogComponent } from "./demo-upcoming-dialog/demo-upcoming-dialog.component";
import { DemoRecordedDialogComponent } from "./demo-recorded-dialog/demo-recorded-dialog.component";

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, BarRatingModule, RouterModule],
  declarations: [DemoRecordedGridComponent, DemoRecordedListComponent, DemoUpcomingclassComponent, DemoUpcomingDialogComponent, DemoRecordedDialogComponent],
  exports: [DemoRecordedGridComponent, DemoRecordedListComponent, DemoUpcomingclassComponent],
  entryComponents: [DemoUpcomingDialogComponent, DemoRecordedDialogComponent]
})
export class DemoClassesModule {}
