import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PaginationPipe } from "./pagination/pagination.pipe";
import { UserSearchPipe } from "./search/user-search.pipe";
import { ProductSearchPipe } from "./search/products-search.pipe";
import { TruncatePipe } from "./truncate/truncate.pipe";
import { MailSearchPipe } from "./search/mail-search.pipe";
import { SubscriptionSearchPipe } from "./search/subscription.pipe";
import { StudentSearchPipe } from "./search/student-search.pipe";
import { SafePipe } from "./search/safe.pipe";
import { RecordedSearchPipe } from "./search/recorded-search.pipe";
import { UpcomingSearchPipe } from "./search/upcoming-search.pipe";
import { LiveSearchPipe } from "./search/live-search.pipe";
import { AssignmentTest } from "./search/assignment-test-search.pipe";
import { BatchPipe } from "./search/batch.pipe";
import {DatesuffixPipe} from "./datesuffix.pipe";




@NgModule({
  imports: [CommonModule],
  declarations: [
    PaginationPipe,
    UserSearchPipe,
    SubscriptionSearchPipe,
    StudentSearchPipe,
    SafePipe,
    ProductSearchPipe,
    LiveSearchPipe,
    RecordedSearchPipe,
    UpcomingSearchPipe,
    TruncatePipe,
    MailSearchPipe,
    AssignmentTest,
    BatchPipe,
    DatesuffixPipe
  ],
  exports: [
    PaginationPipe,
    UpcomingSearchPipe,
    LiveSearchPipe,
    UserSearchPipe,
    StudentSearchPipe,
    ProductSearchPipe,
    RecordedSearchPipe,
    SafePipe,
    SubscriptionSearchPipe,
    TruncatePipe,
    MailSearchPipe,
    AssignmentTest,
    BatchPipe,
      DatesuffixPipe
  ]
})
export class PipesModule {}
