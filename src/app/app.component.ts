import { Component, ViewChild, HostListener, OnInit } from "@angular/core";
import { AppSettings } from "./app.settings";
import { Settings } from "./app.settings.model";
import { Subscription } from "rxjs";
import { Observable } from "rxjs/Observable";
import { timer } from "rxjs/observable/timer";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { OfflineMessageComponent } from "./pages/other/error-message/offline-message/offline-message.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public isOnline: boolean;
  public showConnectionStatus: boolean;
  private showConnectionStatusSub: Subscription;
  private showConnectionStatusTimer: Observable<any>;
  public settings: Settings;
  constructor(public appSettings: AppSettings, public route: ActivatedRoute, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
    this.showConnectionStatusTimer = timer(5000);
  }
  ngOnInit() {}

  @HostListener("window:offline", ["$event"]) onOffline() {
    this.dialog.open(OfflineMessageComponent, {
      data: "offline"
    });
    this.isOnline = false;
    this.showConnectionStatus = true;
    if (this.showConnectionStatusSub) {
      this.showConnectionStatusSub.unsubscribe();
    }
  }

  @HostListener("window:online", ["$event"]) onOnline() {
    this.isOnline = true;
    this.showConnectionStatus = true;
    this.showConnectionStatusSub = this.showConnectionStatusTimer.subscribe(() => {
      this.showConnectionStatus = false;
      this.showConnectionStatusSub.unsubscribe();
      window.location.reload();
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.showConnectionStatusSub) {
      this.showConnectionStatusSub.unsubscribe();
    }
  }
}
