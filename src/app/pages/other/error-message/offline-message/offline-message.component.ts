import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-offline-message",
  templateUrl: "./offline-message.component.html",
  styleUrls: ["./offline-message.component.scss"]
})
export class OfflineMessageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  reload() {
    window.location.reload();
  }
}
