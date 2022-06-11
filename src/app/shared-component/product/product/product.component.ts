import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import { AppSettings } from "../../../app.settings";
import { MatDialog, MatSnackBar } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";
import { OtpconfirmDialogComponent } from "../../../pages/guest/all-products-guest/otpconfirm-dialog/otpconfirm-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit, AfterViewInit {
  @Input() role: any;
  public products: any = [];
  public allproducts: any = [];
  public page: any;
  public selected = "all";
  public roman: any;
  public settings: any;
  public allgrades: any;
  public gradeid: any;
  public searchText: string;
  public spinner = true;
  public urlParameter;
  public slectedgrade="all";
  public slectedsylabus="all";
  public gradelist;
  public syllabuslist;selectedstatus='all';
  public skeleton = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  toppingList: string[] = ['0', '1'];
  public skeletonHide = false;
  constructor(
    public appSettings: AppSettings,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.route.pathFromRoot[1].url.subscribe(val => (this.urlParameter = val[0].path));
    this.appSettings.loadallgradefunction().subscribe(data => {
      this.gradelist = data;
    });
    this.getallsubfilter();
  }

  // get all product

  getallsub() {
    this.products = [];
    this.appSettings.getallsubscription().subscribe(
      (data: any) => {
        // console.log(data)
        if (data[0].msg === "Empty list") {
          this.spinner = false;
          setTimeout(() => {
            this.snackBar.open("No Product Found!!!", null, { duration: 2000 });
          }, 2100);
        } else {
          for (let i = 0; i < data.length; i++) {
            data[i].validFrom = new Date(data[i].validFrom);
            data[i].validTill = new Date(data[i].validTill);
            data[i].validFrom1 = new Date(data[i].validFrom).toLocaleDateString();
            data[i].validTill1 = new Date(data[i].validTill).toLocaleDateString();
            this.products[i] = data[i];
          }
        }
      },
      () => { },
      () => {
        this.skeletonHide = true;
        this.allproducts = this.products;
        // console.log(this.products)
      }
    );
  }

  getallsubfilter() {
    this.products = [];
    const jsonforpagination={
      "gradeFilter":[this.slectedgrade],
      "syllabusFilter":[this.slectedsylabus],
      "status":this.selectedstatus,
      "dateOrder":"asc"
    }

    

    if(this.slectedgrade=='all'){
      delete jsonforpagination["gradeFilter"];
    }
    if(this.selectedstatus=='all'){
      delete jsonforpagination["status"];
    }
    if(this.slectedsylabus=='all'){
      delete jsonforpagination["syllabusFilter"];
    }
    // console.log(jsonforpagination)
    this.appSettings.getallsubscriptionwithfilter(jsonforpagination).subscribe(
      (data: any) => {
        // console.log(data)
        if (data["productsList"].lenght === "0") {
          this.spinner = false;
          setTimeout(() => {
            this.snackBar.open("No Product Found!!!", null, { duration: 2000 });
          }, 2100);
        } else {
       
          for (let i = 0; i < data["productsList"].length; i++) {
            data["productsList"][i].validFrom = new Date(data["productsList"][i].validFrom);
            data["productsList"][i].validTill = new Date(data["productsList"][i].validTill);
            data["productsList"][i].validFrom1 = new Date(data["productsList"][i].validFrom).toLocaleDateString();
            data["productsList"][i].validTill1 = new Date(data["productsList"][i].validTill).toLocaleDateString();
            this.products = data["productsList"];
          }
        }
      },
      () => { },
      () => {
        this.skeletonHide = true;
        this.allproducts = this.products;
        // console.log(this.products)
      }
    );
  }


  


  public onPageChanged(event) {
    this.page = event;
    if (this.settings.fixedHeader) {
      document.getElementById("main-content").scrollTop = 0;
    } else {
      document.getElementsByClassName("mat-drawer-content")[0].scrollTop = 0;
    }
  }

  // open dialog box for add new product

  public openUserDialogforNew(user) {
    var user1 = {
      user: user,
      productfor: 'yolearn'
    }

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: user1
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.getallsub();
      }
    });
  }

  public openUserDialogforNew1(user) {

    var user1 = {
      user: user,
      productfor: 'school'
    }

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: user1
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.getallsub();
      }
    });
  }

  // open dialog box for edit the product details

  public openUserDialogforEdit(user) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.spinner = true;
        this.getallsub();
      }
    });
  }


  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  // delete product

  deleteproduct(user) {
    const jsondata = {
      subscriptionId: user.subscriptionId
    };
    this.appSettings.deleteproduct(jsondata).subscribe(data => {
      this.snackBar.open("Product Deleted Successfully", null, { duration: 2000 });
      this.spinner = true;
      this.getallsub();
    });
  }

  // open otp confirmation dialog box for demo members
  // route to registration page for other member

  openDialogBox(product) {

    if (this.urlParameter === "Guest" || this.role === "parent") {
      this.router.navigate(["/Registration/" + product.subscriptionId]);
    } else {
      const email = sessionStorage.getItem("primaryEmail");
      const dialogref = this.dialog.open(OtpconfirmDialogComponent, {
        data: {
          Email: email,
          product: product
        }
      });
    }
  }

  gradeChange(data) {
    this.selectedstatus='all';
    this.slectedsylabus='all';
    this.appSettings.getsylabus(this.slectedgrade).subscribe(sylabus => {
      this.syllabuslist = sylabus;
    });

    
    this.getallsubfilter();
  }

  syllabusChange(data) {
    this.getallsubfilter();
  }


  statuschange(data){
    this.getallsubfilter();
  }

  // to change the grade

  selectionChange(value) {
    this.searchText = '';
    this.products = this.allproducts;
    if (value === "all") {
      this.products = this.allproducts;
    } else {
      this.products = this.products.filter(unit => unit.gradeName.indexOf(value) > -1);
    }
  }
}
