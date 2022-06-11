import { Component, OnInit, Inject, AfterViewInit, ɵConsole } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from "../../../app.settings";
import { ProductComponent } from "../product/product.component";
import { GradeDialogComponent } from "../../../pages/other/grade-dialog/grade-dialog.component";

@Component({
  selector: "app-product-dialog",
  templateUrl: "./product-dialog.component.html",
  styleUrls: ["./product-dialog.component.scss"]
})
export class ProductDialogComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  minDate = new Date();
  public allgrades: any;
  public fromdate;
  public settings;
  public tilldate;
  public syllabus: any;
  constructor(
    public appSettings: AppSettings,
    public dialogRef: MatDialogRef<ProductComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: any,
    public fb: FormBuilder
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      subscriptionName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(200)])],
      validFrom: [null],
      validTill: [null],
      validFrom1: [null],
      validTill1: [null],
      price: [null, Validators.compose([Validators.required, Validators.pattern(new RegExp("^[0-9]+$"))])],
      originalPrice: [null, Validators.compose([Validators.required, Validators.pattern(new RegExp("^[0-9]+$"))])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(200)])],
      subscriptionId: null,
      days: null,
      packageId: null,
      gradeName: null,
      syllabusName: null,
     
      gradeId: [null, Validators.compose([Validators.required])],
      syllabusId: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
   

    
    if (this.user.user) {
      this.form.setValue(this.user.user);
      this.selectsys(this.user.user.gradeId);
    } else {
      this.user.user = null;
    }
    this.appSettings.loadallgradefunction().subscribe(data => {
      this.allgrades = data;
    });

  }

  // get program of particular grade

  selectsys(data) {
    this.appSettings.getsylabus(data).subscribe(sylabus => {
      this.syllabus = sylabus;
    });
  }

  // close the dialog box

  close() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  // create new product

  createproduct(value) {
  
    if(this.user.productfor=='yolearn'){
      const datefrom = value.validFrom.getFullYear() + "-" + (value.validFrom.getMonth() + 1) + "-" + ((value.validFrom.getDate() < 10 ? "0" : "") + value.validFrom.getDate());
      const datetill = value.validTill.getFullYear() + "-" + (value.validTill.getMonth() + 1) + "-" + ((value.validTill.getDate() < 10 ? "0" : "") + value.validTill.getDate());
      value.validFrom = datefrom;
      value.validTill = datetill;
      this.appSettings.createsubscription(value).subscribe((data: any) => {
        this.snackBar.open(data.msg, null, { duration: 3000 });
      });
    }else{
      const datefrom = value.validFrom.getFullYear() + "-" + (value.validFrom.getMonth() + 1) + "-" + ((value.validFrom.getDate() < 10 ? "0" : "") + value.validFrom.getDate());
      const datetill = value.validTill.getFullYear() + "-" + (value.validTill.getMonth() + 1) + "-" + ((value.validTill.getDate() < 10 ? "0" : "") + value.validTill.getDate());
      value.validFrom = datefrom;
      value.validTill = datetill;
      this.appSettings.createsubscription1(value).subscribe((data: any) => {
        this.snackBar.open(data.msg, null, { duration: 3000 });
      });
    }
   
  }

  // update the details of the product

  updateproduct(value) {
    const datefrom = value.validFrom.getFullYear() + "-" + (value.validFrom.getMonth() + 1) + "-" + ((value.validFrom.getDate() < 10 ? "0" : "") + value.validFrom.getDate());
    const datetill = value.validTill.getFullYear() + "-" + (value.validTill.getMonth() + 1) + "-" + ((value.validTill.getDate() < 10 ? "0" : "") + value.validTill.getDate());
    const jsondata = {
      subscriptionId: this.user.subscriptionId,
      subscriptionName: value.subscriptionName,
      validFrom: datefrom,
      validTill: datetill,
      price: value.price,
      description: value.description,
      gradeId: value.gradeId,
      syllabusId: value.syllabusId
    };

    this.appSettings.updateproduct(jsondata).subscribe((data: any) => {
      if (data.msg === "not updated product") {
        this.snackBar.open(data.msg, null, { duration: 3000 });
      } else {
        this.snackBar.open(data.msg, null, { duration: 3000 });
      }
    });
  }
}
