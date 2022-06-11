import { Component, OnInit, AfterViewInit, ViewChild, ɵConsole } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatTableDataSource, MatStepper } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { emailValidator, matchingPasswords } from "../../../theme/utils/app-validators";
import { AppSettings } from "../../../app.settings";
import { Settings } from "../../../app.settings.model";
import { HttpClient } from "@angular/common/http";
import { duration } from "moment";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild("stepper") stepper;
  public form: FormGroup;
  public formForStudent: FormGroup;
  public isLinear = true;
  public send = false;
  public otpid = null;
  public isDisabled = true;
  public settings: Settings;
  public resend = false;
  public countriesDetails;
  public show = false;
  public urlParameter;
  public role;
  public subscriptionId;
  public NoRegistrationForm = false;
  public dataSource;
  public productDetail;
  public tid;
  public purchaseDetails;
  public showOrderdetails = false;
  public showAbortPage = false;
  public userDetailAfterReg;
  public studentDetail;
  public checkPaymentPage;
  public passwordHide = true;
  public countryCode;
  public countryCodeJson = "assets/data/country-code.json";
  displayedColumns: string[] = ["Product_Name", "Amount"];
  displayedColumnsForPaymentDetails: string[] = ["Product_Name", "Valid_From", "Valid_Till", "Amount"];

  constructor(public appSettings: AppSettings, public http: HttpClient, public fb: FormBuilder, public router: Router, public snackBar: MatSnackBar, public route: ActivatedRoute) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group(
      {
        firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
        lastName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
        address: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
        city: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
        mobileNum: [null, Validators.compose([Validators.required, Validators.pattern(new RegExp("^[0-9]+$"))])],
        primaryEmail: [null, Validators.compose([Validators.required, emailValidator, Validators.minLength(5), Validators.maxLength(30)])],
        otp: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(new RegExp("^[0-9]+$"))])],
        password: [
          null,
          Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(new RegExp("^[A-Za-z0-9!.,#$%&'*+/=?^_`{|}~@-]+$"))])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
        gradeId: [null],
        userRole: "parent",
        countryCode: [null, Validators.compose([Validators.required])],
        subsTypeId: null
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );

    this.formForStudent = this.fb.group(
      {
        firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
        lastName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(new RegExp("^[A-Za-z]+$"))])],
        address: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
        city: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
        password: [
          null,
          Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(new RegExp("^[A-Za-z0-9!.,#$%&'*+/=?^_`{|}~@-]+$"))])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
        schoolName: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
  }

  ngOnInit() {
    // get all country code

    this.http.get(this.countryCodeJson).subscribe((data: any) => {
      this.countryCode = data.countries;
    });
    this.role = sessionStorage.getItem("role");
    // console.log(this.role)

    if (this.role == "guest" || this.role == "parent") {
      this.NoRegistrationForm = true;
    } else {
      this.NoRegistrationForm = false;
    }
    this.route.params.subscribe(data => {
      this.urlParameter = data.name;
      this.checkPaymentPage = data.name.slice(0, 4);

      if (this.checkPaymentPage == "ACCO") {
        // go to invoice state

        this.setIndex();
        this.RegistrationFirstStep();
      } else {
        this.stepper.selectedIndex = 0;
        sessionStorage.setItem("SubId", this.urlParameter);
        this.RegistrationFirstStep();
      }
    });
  }

  // get product details based on subscriptionId

  RegistrationFirstStep() {
    const json = {
      subscriptionId: sessionStorage.getItem("SubId")
    };

    this.appSettings.getProductDetailBySubId(json).subscribe((data: any) => {
      this.productDetail = data;
    });
  }

  // send otp

  sendotp(user) {
    this.send = true;
    const jsondata = {
      primaryEmail: user.primaryEmail
    };

    this.appSettings.sendotp(jsondata).subscribe((data: any) => {
      if (data.msg === "An OTP has been sent to your mail.Check the spam folder for OTP ") {
        this.isDisabled = false;
        this.otpid = data.otpid;
        this.send = false;
        this.resend = true;
        this.snackBar.open("An OTP has been sent to your mail. (Please check spam folder also)", null, { duration: 3000 });
      } else {
        this.snackBar.open(data.msg, null, { duration: 3000 });
        this.send = false;
      }
    });
  }

  // verify otp

  verifyotp(user) {
    const jsondata = {
      primaryEmail: user.primaryEmail,
      otp: user.otp,
      otpId: this.otpid
    };
    this.appSettings.verifyotp(jsondata).subscribe((data: any) => {
      if (data.msg === "OTP confirmed!") {
        this.isDisabled = true;
        this.show = true;
        this.snackBar.open(data.msg, null, { duration: 3000 });
      } else {
        this.snackBar.open(data.msg + " Please resend OTP to verify.", null, { duration: 3000 });
      }
    });
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  // parent registration

  public ParentRegistration(data) {
    delete data.confirmPassword;
    this.appSettings.registration(data).subscribe(
      (msg: any) => {
        if (msg.msg === "Congratulations! Registration Successful.") {
          this.appSettings.userdetails = data;
          this.stepper.next();
          sessionStorage.setItem("accountId", msg.accountId);
          sessionStorage.setItem("primaryEmail", msg.primaryEmail);
        } else {
          this.snackBar.open(msg.msg, null, { duration: 3000 });
        }
      },
      () => {},
      () => {}
    );
  }

  // to buy product, redirect to ccavenue page

  buynow() {
    this.tid = new Date().getTime().toString();
    const buynowData = {
      subsctypeId: this.productDetail.subscriptionId,
      parentAccountId: sessionStorage.getItem("accountId"),
      tid: this.tid,
      merchant_id: "187400",
      order_id: sessionStorage.getItem("accountId") + this.tid,
      amount: parseFloat(this.productDetail.price).toFixed(2)
    };

    this.appSettings.paymentPost(buynowData).subscribe(
      (data: any) => {},
      () => {},
      () => {
        const tidData: any = new Date().getTime();

        const form = document.createElement("form");
        form.setAttribute("method", "post");

        form.setAttribute("action", "https://yolearn.com/ccavRequestHandler.php");

        const a = document.createElement("input");
        a.setAttribute("type", "text");
        a.setAttribute("name", "tid");
        a.setAttribute("value", this.tid);

        const b = document.createElement("input");
        b.setAttribute("type", "text");
        b.setAttribute("name", "merchant_id");
        b.setAttribute("value", "187400");

        const c = document.createElement("input");
        c.setAttribute("type", "text");
        c.setAttribute("name", "order_id");
        c.setAttribute("value", sessionStorage.getItem("accountId") + this.tid);

        const d = document.createElement("input");
        d.setAttribute("type", "text");
        d.setAttribute("name", "amount");
        d.setAttribute("value", parseFloat(this.productDetail.price).toFixed(2));

        const e = document.createElement("input");
        e.setAttribute("type", "text");
        e.setAttribute("name", "currency");
        e.setAttribute("value", "INR");

        const f = document.createElement("input");
        f.setAttribute("type", "text");
        f.setAttribute("name", "redirect_url");
        f.setAttribute("value", "https://yolearn.com/ccavResponseHandler.php");

        const g = document.createElement("input");
        g.setAttribute("type", "text");
        g.setAttribute("name", "cancel_url");
        g.setAttribute("value", "https://yolearn.com/ccavResponseHandler.php");

        const h = document.createElement("input");
        h.setAttribute("type", "text");
        h.setAttribute("name", "language");
        h.setAttribute("value", "en");

        form.appendChild(a);
        form.appendChild(b);
        form.appendChild(c);
        form.appendChild(d);
        form.appendChild(e);
        form.appendChild(f);
        form.appendChild(g);
        form.appendChild(h);
        document.getElementsByClassName("body")[0].appendChild(form);

        form.submit();
        form.remove();
      }
    );
  }

  // go to invoice state based on role

  setIndex() {
    const json = {
      accountId: sessionStorage.getItem("accountId")
    };
    if (this.role != null) {
      this.stepper.selectedIndex = 3;
    } else {
      this.stepper.selectedIndex = 4;
    }

    // get payment details based on orderId

    const jsondata = {
      order_id: this.urlParameter,
      parentAccountId: sessionStorage.getItem("accountId")
    };

    this.appSettings.getdetailsOfPayementByParentUsingOrder(jsondata).subscribe(
      data => {
        this.purchaseDetails = data[0];
      },
      () => {},
      () => {
        if (this.purchaseDetails.order_status === "Success" || this.purchaseDetails.order_status === "Awaited") {
          this.showOrderdetails = true;

          // update role from  Guest to parent

          this.appSettings.updateGuestToParent(json).subscribe(
            data => {},
            () => {},
            () => {
              // allot subscription package to student

              this.allotStudentToPackage();

              // set student subscription Id in the student table

              const jsonForStudent = {
                sAccountId: sessionStorage.getItem("sAccountId"),
                subsTypeId: sessionStorage.getItem("SubId")
              };

              this.appSettings.setStudentSubscriptionId(jsonForStudent).subscribe(
                data => {},
                () => {},
                () => {
                  this.sendToMail();
                }
              );
            }
          );
        } else if (this.purchaseDetails.order_status === "Aborted" || this.purchaseDetails.order_status === "Timeout" || this.purchaseDetails.order_status === "Failure") {
          this.showAbortPage = true;

          // delete the student if payment aborted

          this.appSettings.deleteStudentPaymentUnSuccess(json).subscribe(data => {});
        }
      }
    );
  }

  // Student Registration

  studentRegistrationFun(data) {
    delete data.confirmPassword;
    this.dataSource = new MatTableDataSource(this.productDetail);
    this.dataSource.data = this.productDetail;
    data.accountId = sessionStorage.getItem("accountId");
    (data.userRole = "student"), (data.subsTypeId = ""), (data.countryCode = "91"), (data.primaryEmail = sessionStorage.getItem("primaryEmail"));

    this.appSettings.addstudentfromparent(data).subscribe(
      (data: any) => {
        if (data.msg == "Congratulations! Registration Successful.") {
          this.stepper.next();

          this.studentDetail = data;
          sessionStorage.setItem("sAccountId", data.sAccountId);
        } else {
          this.snackBar.open(data.msg, null, { duration: 3000 });
        }
      },
      () => {},
      () => {}
    );
  }

  // send mail

  sendToMail() {
    const dataToFtpAndMail = {
      order_id: this.urlParameter,
      order_status: "Success"
    };
    this.appSettings.sendToMail(dataToFtpAndMail).subscribe((message: any) => {});
  }

  // allot package to student

  allotStudentToPackage() {
    const jsondata = {
      parentAccountId: sessionStorage.getItem("accountId"),
      studentAccountId: sessionStorage.getItem("sAccountId"),
      orderId: this.urlParameter
    };

    this.appSettings.allotPackageToStudent(jsondata).subscribe((data: any) => {});
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
