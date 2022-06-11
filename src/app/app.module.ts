import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OverlayContainer } from "@angular/cdk/overlay";
import { CustomOverlayContainer } from "./theme/utils/custom-overlay-container";

import { AgmCoreModule } from "@agm/core";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { CalendarModule } from "angular-calendar";
import { SharedModule } from "./shared/shared.module";
import { PipesModule } from "./theme/pipes/pipes.module";
import { DatePipe } from "@angular/common"
import { AppSettings } from "./app.settings";
import { routing } from "./app.routing";
import { NgxPaginationModule } from "ngx-pagination";

import { AppComponent } from "./app.component";
import { PagesComponent } from "./pages/pages.component";

import { SidenavComponent } from "./theme/components/sidenav/sidenav.component";
import { VerticalMenuComponent } from "./theme/components/menu/vertical-menu/vertical-menu.component";
import { HorizontalMenuComponent } from "./theme/components/menu/horizontal-menu/horizontal-menu.component";
import { BreadcrumbComponent } from "./theme/components/breadcrumb/breadcrumb.component";
import { FullScreenComponent } from "./theme/components/fullscreen/fullscreen.component";
import { UserMenuComponent } from "./theme/components/user-menu/user-menu.component";

import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { CookieService } from "ngx-cookie-service";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ErrorMessageModule } from "./pages/other/error-message/error-message.module";
import { DateConvert } from "./date-convert";


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE"
    }),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    SharedModule,
    NgxPaginationModule,
    PipesModule,
    routing,
    NgxMaterialTimepickerModule.forRoot(),
    NgxChartsModule,
    ErrorMessageModule
  ],
  declarations: [AppComponent, PagesComponent, SidenavComponent, VerticalMenuComponent, HorizontalMenuComponent, BreadcrumbComponent, FullScreenComponent, UserMenuComponent],

  entryComponents: [VerticalMenuComponent],
  exports: [PagesComponent],
  providers: [
    CookieService,
    AppSettings,
    DateConvert,
    DatePipe,
    // SharedService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
