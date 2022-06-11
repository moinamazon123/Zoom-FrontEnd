import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

export interface PeriodicElement {
  name: string;
  validFrom: any;
  validTill: any;
  price: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: "Class 6 Classic package",
    validFrom: "05-01-2019",
    validTill: "31-01-2019",
    price: "2999 INR/-"
  }
];

@Component({
  selector: "app-orderdetails",
  templateUrl: "./orderdetails.component.html",
  styleUrls: ["./orderdetails.component.scss"]
})
export class OrderdetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["Product_Name", "Amount"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  public purchaseDetails: any;
  public billingDetails: any;
  public productDetail: any;
  public InvoiceNumber: any;
  public showOrderdetails = false;
  public showAbortPage = false;
  public spinnerShow = true;
  public subId: any;
  constructor(public appSetting: AppSettings, public location: Location, public router: ActivatedRoute, public route: Router, public snackbar: MatSnackBar) {}

  ngOnInit() {
    // get the invoice number from the URL

    this.router.queryParamMap.subscribe((data: any) => {
      this.InvoiceNumber = data.params.ord_id;
      this.subId = data.params.subId;
    });

    // get product details based on subscription Id
    
    const json = {
      subscriptionId: this.subId
    };
    this.appSetting.getProductDetailBySubId(json).subscribe(
      (data: any) => {
        this.productDetail = data;
      },
      () => {},
      () => {
        this.dataSource = new MatTableDataSource(this.productDetail);
      }
    );

    // get details of invoice based on orderId

    const jsondata = {
      order_id: this.InvoiceNumber,
      parentAccountId: this.InvoiceNumber.substring(0, 10)
    };

    this.appSetting.getdetailsOfPayementByParentUsingOrder(jsondata).subscribe(
      data => {
        this.purchaseDetails = data[0];
      },
      () => {},
      () => {
        this.spinnerShow = false;
        if (this.purchaseDetails.order_status === "Success") {
          this.showOrderdetails = true;
        } else if (this.purchaseDetails.order_status === "Aborted") {
          this.showAbortPage = true;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.appSetting.settings.loadingSpinner = false;
  }

  // go back to previous page

  goback() {
    this.location.back();
  }

  // print page

  printPage() {
    const printContents = document.getElementsByClassName("invoiceprint")[0].innerHTML;
    const printContents1 = document.getElementsByClassName("invoiceprint")[1].innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents + printContents1;
    window.print();
    document.body.innerHTML = originalContents;
  }
}
