import { Component, Input, OnInit, OnDestroy, ElementRef, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-countdown-timer",
  template: `
    {{ displayTime }}
  `
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() start;
  @Input() end;
  @Output() zeroTrigger;
  @Input() timeOnly;
  @Input() for;
  timer: any;
  displayTime: any;
  constructor(private el: ElementRef) {
    this.zeroTrigger = new EventEmitter(true);
  }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      if (this.start) {
        this.displayTime = this.getTimeDiff(this.start, true);
      } else {
        this.displayTime = this.getTimeDiff(this.end);
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private getTimeDiff(datetime, useAsTimer = false) {
    datetime = new Date(datetime).getTime();
    const now = new Date().getTime();

    if (isNaN(datetime)) {
      return "";
    }

    let milisec_diff = datetime - now;
    if (useAsTimer) {
      milisec_diff = now - datetime;
    }

    // Zero Time Trigger
    if (milisec_diff <= 0) {
      this.zeroTrigger.emit("reached zero");
      return "00:00:00:00";
    }

    if (milisec_diff >= 14400000 && this.for == "otherthanteacher") {
      this.zeroTrigger.emit("Upcoming Class");
      return "00:00:00:00";
    }

    if (milisec_diff > 0 && this.for == "teacher") {
      this.zeroTrigger.emit("teacher Class");
      return "00:00:00:00";
    }

    const days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
    const date_diff = new Date(milisec_diff);
    const day_string = days ? this.twoDigit(days) + ":" : "";
    const day_hours = days * 24;

    if (this.timeOnly) {
      const hours = date_diff.getUTCHours() + day_hours;
      return this.twoDigit(hours) + ":" + this.twoDigit(date_diff.getUTCMinutes()) + ":" + this.twoDigit(date_diff.getSeconds());
    } else {
      // Date() takes a UTC timestamp – getHours() gets hours in local time not in UTC. therefore we have to use getUTCHours()
      return day_string + this.twoDigit(date_diff.getUTCHours()) + ":" + this.twoDigit(date_diff.getUTCMinutes()) + ":" + this.twoDigit(date_diff.getSeconds());
    }
  }

  private twoDigit(number: number) {
    return number > 9 ? "" + number : "0" + number;
  }

  private stopTimer() {
    clearInterval(this.timer);
    this.timer = undefined;
  }
}
