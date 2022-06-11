import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OfflineMessageComponent } from "./offline-message/offline-message.component";
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [OfflineMessageComponent],
  entryComponents: [OfflineMessageComponent],
  exports: [OfflineMessageComponent]
})
export class ErrorMessageModule {}
