import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { AppSettings } from "../../../app.settings";

@Component({
  selector: "zoomToken",
  templateUrl: "./zoomToken.component.html",
  styleUrls: ["./zoomToken.component.scss"]
})
export class ZoomToken implements OnInit {

  token:string;
  msgFlg:boolean=false;

  constructor(
   
    public appSettings: AppSettings
  
  ) { }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  saveToken(){

    
    this.appSettings.saveZoomToken(this.token).subscribe((data: any) => {
      this.msgFlg = true;
     console.log(data);
      
    },
      (err) => { }
    );
    
  }
  
}
