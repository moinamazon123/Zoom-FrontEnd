import { Component, OnInit, AfterViewInit, ViewChild, ɵConsole } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatTableDataSource, MatStepper } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { emailValidator, matchingPasswords } from "../../../theme/utils/app-validators";
import { AppSettings } from "../../../app.settings";
import { Settings } from "../../../app.settings.model";
import { HttpClient } from "@angular/common/http";
import { duration } from "moment";
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-registrationscorewell',
  templateUrl: './registrationscorewell.component.html',
  styleUrls: ['./registrationscorewell.component.scss']
})

export class RegistrationscorewellComponent implements OnInit, AfterViewInit {
  foods: Food[] = [
    { value: 'SUBST000006', viewValue: '6' },
    { value: 'SUBST000007', viewValue: '7' },
    { value: 'SUBST000008', viewValue: '8' },
    { value: 'SUBST000009', viewValue: '9' },
    { value: 'SUBST000010', viewValue: '10' },

  ];
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
        schoolName: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
        GradeID: [null, Validators.compose([Validators.required])]
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
  }



  ngOnInit() {
    // get all country code
    this.stepper.selectedIndex = 0;
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
      this.urlParameter = data.subid;
      // console.log(this.urlParameter);
       this.formForStudent.get('GradeID').setValue(this.urlParameter);

      this.checkPaymentPage = data.name.slice(0, 4);

      if (this.checkPaymentPage == "ACCO") {
        // go to invoice state

        // this.setIndex(order_id);
        // this.RegistrationFirstStep();
      } else {

        this.stepper.selectedIndex = 2;
        // sessionStorage.setItem("SubId", this.urlParameter);

      }


    });
    // this.RegistrationFirstStep();
  }

  // get product details based on subscriptionId

  RegistrationFirstStep(subtype) {
    const json = {
      subscriptionId: subtype
    };

    this.appSettings.getProductDetailBySubId(json).subscribe((data: any) => {
      this.productDetail = data;
      // console.log(data)
    });
  }

  // send otp

  sendotp(user) {

    this.send = true;
    const jsondata = {
      primaryEmail: user.primaryEmail
    };

    this.appSettings.sendotp(jsondata).subscribe((data: any) => {
      // console.log(data)

      if (data.msg === "An OTP has been sent to your mail.Check the spam folder for OTP ") {
        this.isDisabled = false;
        this.otpid = data.otpid;
        this.send = false;
        this.resend = true;
        this.snackBar.open("An OTP has been sent to your mail. (Please check spam folder also)", null, { duration: 3000 });
      } else {

        if(data.msg=='you are registered with us, click here to Login.'){
          data.msg='you are registered with us,please login'

        }
        this.snackBar.open(data.msg, null, { duration: 4000 });
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
       
        // console.log(msg)
        if (msg.msg === "Congratulations! Registration Successful.") {
          this.appSettings.userdetails = data;
          this.stepper.next();
          sessionStorage.setItem("accountId", msg.accountId);
          sessionStorage.setItem("primaryEmail", msg.primaryEmail);
        } else {
          this.snackBar.open(msg.msg, null, { duration: 3000 });
        }
      },
      () => { },
      () => { }
    );
  }

  // to buy product, redirect to ccavenue page

  buynow(subtype) {
    this.tid = new Date().getTime().toString();

    const buynowData = {
      subsctypeId: subtype,
      parentAccountId: sessionStorage.getItem("accountId"),
      tid: this.tid,
      merchant_id: "187400",
      order_id: sessionStorage.getItem("accountId") + this.tid,
      amount: 0,
      skipPayment: true
    };

    // console.log(buynowData)


    var order_id = '';
    this.appSettings.paymentPost(buynowData).subscribe(
      (data: any) => {
        order_id = data.order_id;
        // console.log('buy nowww', data)
      },
      () => { },
      () => {
        this.setIndex(order_id, subtype);
      }
    );
  }

  // go to invoice state based on role

  setIndex(order_id, subtype) {
    // console.log(order_id, subtype)
    const json = {
      accountId: sessionStorage.getItem("accountId")
    };

    // get payment details based on orderId

    const jsondata = {
      order_id: order_id,
      parentAccountId: sessionStorage.getItem("accountId")
    };
    // console.log('settttt', jsondata)

    this.appSettings.getdetailsOfPayementByParentUsingOrder(jsondata).subscribe(
      data => {
        this.purchaseDetails = data[0];
        // console.log('settttt', data)
      },
      () => { },
      () => {
        if (this.purchaseDetails.order_status === "Success" || this.purchaseDetails.order_status === "Awaited") {
          this.showOrderdetails = true;

          // update role from  Guest to parent

          this.appSettings.updateGuestToParent(json).subscribe(
            data => { },
            () => { },
            () => {
              // allot subscription package to student

              this.allotStudentToPackage(order_id);

              // set student subscription Id in the student table

              const jsonForStudent = {
                sAccountId: sessionStorage.getItem("sAccountId"),
                subsTypeId: subtype
              };

              // console.log('jss', jsonForStudent)

              this.appSettings.setStudentSubscriptionId(jsonForStudent).subscribe(
                data => { },
                () => { },
                () => {
                  this.sendToMail();
                }
              );
            }
          );
        } else if (this.purchaseDetails.order_status === "Aborted" || this.purchaseDetails.order_status === "Timeout" || this.purchaseDetails.order_status === "Failure") {
          this.showAbortPage = true;


          // delete the student if payment aborted

          this.appSettings.deleteStudentPaymentUnSuccess(json).subscribe(data => { });
        }
      }
    );
  }

  // Student Registration

  studentRegistrationFun() {
    let data = this.formForStudent.value;
    this.stepper.next();
    // console.log('am coming to ', data);

    // delete data.confirmPassword;
    this.dataSource = new MatTableDataSource(this.productDetail);
    this.dataSource.data = this.productDetail;
    // console.log(data)
    data.accountId = sessionStorage.getItem("accountId");
    data.userRole = "student";

    data.countryCode = "91";
    data.primaryEmail = sessionStorage.getItem("primaryEmail");
    data.skipPayment = 'true';
    // console.log('reached here');
    var data1 = data;
    this.appSettings.addstudentfromparent(data1).subscribe(
      (data: any) => {
        // console.log("sending data", data);

        if (data.msg == "Congratulations! Registration Successful.") {


          this.studentDetail = data;
          sessionStorage.setItem("sAccountId", data.sAccountId);
          this.buynow(data1.GradeID);
        } else {
          this.snackBar.open(data.msg, null, { duration: 3000 });
        }
      },
      () => { },
      () => {

      }
    );
  }

  // send mail

  sendToMail() {
    const dataToFtpAndMail = {
      order_id: this.urlParameter,
      order_status: "Success"
    };
    this.appSettings.sendToMail(dataToFtpAndMail).subscribe((message: any) => { });
  }

  // allot package to student
  // SUBST000006
  allotStudentToPackage(order_id) {

    const jsondata = {
      parentAccountId: sessionStorage.getItem("accountId"),
      studentAccountId: sessionStorage.getItem("sAccountId"),
      orderId: order_id
    };

    // console.log(jsondata)

    this.appSettings.allotPackageToStudent(jsondata).subscribe((data: any) => { });
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

