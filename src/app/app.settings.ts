import { Injectable } from "@angular/core";
import { Settings } from "./app.settings.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";
import { PlatformLocation } from "@angular/common";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppSettings {
  public settings = new Settings(
    "Elearning", // theme name
    true, // loadingSpinner
    true, // fixedHeader
    true, // sidenavIsOpened
    true, // sidenavIsPinned
    true, // sidenavUserBlock
    "vertical", // horizontal , vertical
    "default", // default, compact, mini
    "teal-light", // indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark
    false // true = rtl, false = ltr
  );

  public teacherSelected = "all";
  public subjectSelected;
  public slectedsylabus='all';
  public startDate;
  public endDate;
  public urls = "assets/url/url.json";
  public URL;
  public learntronkey = "6zeyiZJr7mmvR3fbifU0Nxw8SgFgt0fHImDRDsgJYeRIF4vlllminRKU66NrhnWw ";
  public jwtTokenForZoom ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkZFQ29YSmJhUUo2c2t2aUZkTnVjREEiLCJleHAiOjE2NTA1MzU5MTEsImlhdCI6MTY0OTkzMTExMn0.qDJTi3T-j5Erz7ujNC1OxBUq3ilCWHaLQwwJLbiqa94";//Next expiry 21 April
  public zoomCreateMeetingApi="https://api.zoom.us/v2/users/me/meetings";
  // learntron old key= 6zeyiZJr7mlEiABFuVSuZhIr4xKxrOCYUqqjS1YuNQQN1TG188rzexKU66NrhnWw
  // learntron new key = 6zeyiZJr7mmvR3fbifU0Nxw8SgFgt0fHImDRDsgJYeRIF4vlllminRKU66NrhnWw

   public login = "http://server.swq.tvc.mybluehostin.me:8080/mapsdemo/users/usersLogin";
   public loginforstudentorparent = "http://server.swq.tvc.mybluehostin.me:8080/mapsdemo/users/loginAsParentOrStudent";
   public RefreshLogin = "http://server.swq.tvc.mybluehostin.me:8080/mapsdemo/users/parentOrGuestLogin";

   //public login = "http://localhost:8080/users/usersLogin";
   //public loginforstudentorparent = "http://localhost:8080/users/loginAsParentOrStudent";
   //public RefreshLogin = "http://localhost:8080/users/parentOrGuestLogin";

  // public login = "https://yolearn.com:8443/mapsyolearndev/users/usersLogin";
  // public loginforstudentorparent = "https://yolearn.com:8443/mapsyolearndev/users/loginAsParentOrStudent";
  // public RefreshLogin = "https://yolearn.com:8443/mapsyolearndev/users/parentOrGuestLogin";
  public classfilters;
  public imamge1;
  primaryEmail: any;
  public notifiaction = new Subject<any>();
  public userdetailstoDisplay = new Subject<any>();
  public accountIdforComponent;
  password;
  public imagedetail;
  public gradeName;
  loginstatus = false;
  profileimageobservable = new Subject<any>();
  public profileimage;
  imagedetails = new Subject<any>();
  usedeatilschange = new Subject<any>();
  public userdetails: any = {
    dateOfCreation: "",
    firstName: "",
    lastName: "",
    mobileNum: "",
    primaryEmail: "",
    gradeName: "",
    mailStatus: "",
    SubscriptionDayLeft: "",
    syllabusName: "",
    gradeId: "",
    syllabusId: "",
    syllabusIds: ""
  };

  public role: any = sessionStorage.getItem("role");
  public accountId = sessionStorage.getItem("accountId");

  constructor(location: PlatformLocation, private http: HttpClient, private router: Router) {
    this.getUrls();
    this.InitailFunction();
  }

  // initial function to store session storage value and key while loading/reloading

  InitailFunction() {
    console.log(this.URL);
    //  check the browser
    // if internet explorer dispaly some error message
    if (!this.getInternetExplorerVersion()) {
      this.router.navigate(["chromefirefox"]);
    } else if (sessionStorage.getItem("primaryEmail") == null) {
      // this.router.navigate(["/login"]);
    } else {
      this.usedeatilschange.subscribe(value => {
        this.userdetails = value;
      });
      
      const jsondata = {
        primaryEmail: sessionStorage.getItem("primaryEmail"),
        password: sessionStorage.getItem("password"),
        
      };
      if (this.role === "teacher" || this.role === "Admin" || this.role === "admin") {
        this.loginFunction(jsondata).subscribe(
          (data: any) => {
            this.primaryEmail = data.primaryEmail;
            this.password = data.password;
            this.userdetails = data;
            this.role = data.userRole;
            this.usedeatilschange.next(data);
          },
          () => {},
          () => {
            this.loginstatus = true;
          }
        );
      } else if (this.role === "parent") {
        this.RefreshloginFunction(jsondata).subscribe(
          (data: any) => {
            this.primaryEmail = data.primaryEmail;
            this.password = data.password;
            this.userdetails = data;
            this.role = data.userRole;
            this.usedeatilschange.next(data);
          },
          () => {},
          () => {
            this.loginstatus = true;
          }
        );
      } else if (this.role === "guest") {
        this.RefreshloginFunction(jsondata).subscribe(
          (data: any) => {
            this.primaryEmail = data.primaryEmail;
            this.password = data.password;
            this.userdetails = data;
            this.role = data.userRole;
            this.usedeatilschange.next(data);
          },
          () => {},
          () => {
            this.loginstatus = true;
          }
        );
      } else {
        const jsondata1 = {
          accountId: this.accountId,
          password: sessionStorage.getItem("password")
        };

        this.loginFunctionforstudent(jsondata1).subscribe(
          (data: any) => {
            this.role = "student";
            sessionStorage.setItem("batchId", data.batchId);
            const validTill: any = new Date(data.validTill);
            data.SubscriptionDayLeft = validTill;
            this.primaryEmail = data.primaryEmail;
            this.password = data.password;
            this.userdetails = data;
            this.role = data.userRole;
            const accountIdJson = {
              studentAccountId: this.accountId
            };
            this.saveLearntronLiveData(accountIdJson).subscribe((savedDataLive: any) => {});
            this.sessionofstudent(this.accountId).subscribe((session: any) => {
              for (let i = 0; i < session.length; i++) {
                const jsondataforsave = {
                  studentAccountId: this.accountId,
                  sessionId: session[i].sessionId
                };

                this.saveLearntronRecordedData(jsondataforsave).subscribe((savedDataRecorded: any) => {});
              }
            });
            this.usedeatilschange.next(data);
          },
          () => {},
          () => {}
        );
      }
    }
  }

  // get internet explorer version

  getInternetExplorerVersion() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ");
    let rv = -1;
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      if (isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
        if (navigator.appName === "Netscape") {
          const ua = navigator.userAgent;
          const re = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
          if (re.exec(ua) != null) {
            rv = parseFloat(RegExp.$1);
          }
        }
      }
      return false;
    } else {
      return true;
    }
  }

  // get all url from assets

  getUrls() {
    this.http.get(this.urls).subscribe((data: any) => {
      this.URL = data;
    });
  }

  // login function for student

  loginFunctionforstudent(data) {
    return this.http.post(this.loginforstudentorparent, data);
  }

  // login function for parent

  loginFunctionforparent(data) {
    return this.http.post(this.loginforstudentorparent, data);
  }

  // common login function(admin, teacher, guest)

  loginFunction(data) {
    return this.http.post(this.login, data);
  }

  // get all user count

  getallusersfunction() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.getAllUserCount);
  }

  // get all teacher (no pagination)

  getallteachersfunction() {
    console.log(this.URL.domain + this.URL.Get_Ports.ListofTeachers);
    return this.http.get(this.URL.domain + this.URL.Get_Ports.ListofTeachers);
  }

  getallteachersfunctionpost(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.postListofTeachers,data);
  }

  // get all student (with pagination)

  getallstudentsfunction(data) {
    return this.http.post(this.URL.domain + this.URL.Get_Ports.ListofStudents, data);
  }

  // get all parent (with pagination)

  getallparentfunction(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.ListofParent, data);
  }

  // get all guest (with pagination)

  getallguestfunction(data) {
    return this.http.post(this.URL.domain + this.URL.Get_Ports.ListofGuest, data);
  }

  // delete teacher

  deleteteachersfunction(users: any) {
    const jsondata = {
      teacherAccountId: users
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.DeleteTeachers, jsondata);
  }

  // delete student (not using in live)

  deletestudentsfunction(users: any) {
    const jsondata = {
      accountId: users.sAccountId
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.DeleteStudent, jsondata);
  }

  // update/edit teacher details

  updateteacherfunction(users: any) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UpdateTeacher, users);
  }

  // update student

  updatestudentfunction(users: any) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UpdateStudents, users);
  }

  // registration

  registration(users) {
  
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UserResgistration, users);
  }

  // load all grade

  loadallgradefunction() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.LoadAllGrades);
  }

  // get all subscription of parent

  getsubscriptionsofparent(data) {
    const jsondata = {
      parentAccountId: data
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.GetSubByParentAcc, jsondata);
  }

  getstudentofparentfunction1() {
    const jsondata = {
      primaryEmail: sessionStorage.getItem("primaryEmail")
    };
    // console.log(jsondata)
    return this.http.post(this.URL.domain + this.URL.Post_Ports.GetSubByParentAcc1, jsondata);
  }
  


  // get all subscription for admin

  getsubscriptionsForAdmin(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.ListOfSubscription, data);
  }

  // load all syllabus

  loadallsyllabusfunction() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.LoadAllSyllabus);
  }

  // load all subject

  loadallsubjectfunction() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.LoadAllSubject);
  }

  // get syllabus based on gradeId

  getsylabus(data) {
    const jsondata = {
      gradeId: data
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.GetSyllabusByGradeId, jsondata);
  }

  // get subject based on grade and syllabus

  getsubjects(grade, sylabus) {
    const jsondata = {
      gradeId: grade,
      syllabusId: sylabus
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.GetSubjectByGrade_SyllId, jsondata);
  }
  getsubjects1(data) {
    const jsondata = {
      studentId: data,
      // syllabusId: sylabus
    };
    return this.http.get(this.URL.domain + this.URL.Post_Ports.GetSubjectByGrade_SyllId1+'/'+data);
  }
  getsylabus1(data) {
    const jsondata = {
      studentId: data,
      // syllabusId: sylabus
    };
    return this.http.get<any>(this.URL.domain + this.URL.Post_Ports.getsylnew+'/'+data);
  }
  
  // add new grade

  addnewgrade(data) {
    const jsondata = {
      gradeName: data
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.AddNewGrade, jsondata);
  }

  // add new syllabus

  addnewsylabus(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.AddNewSyllabus, data);
  }

  // add new subject

  addnewsubject(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.AddNewSubject, data);
  }

  // registration

  signup(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UserResgistration, data);
  }

  // send otp

  sendotp(data) {
    
    return this.http.post(this.URL.domain + this.URL.Post_Ports.SendOTP, data);
  }

  // send otp in case of forget password

  sendotpforForgetPassword(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.SendOTPforgetPassword, data);
  }

  // verify otp

  verifyotp(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.VerifyOTP, data);
  }

  // add student by parent

  addstudentfromparent(data) {
 
    
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UserResgistration, data);
  }

  // get all student of parent

  getstudentofparentfunction() {
    const jsondata = {
      primaryEmail: sessionStorage.getItem("primaryEmail")
    };

    return this.http.post(this.URL.domain + this.URL.Post_Ports.GetAllStudentofParent, jsondata);
  }

  // get list of subscription without pagination

  getlistofsubscription() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.ListOfSubscription);
  }

  // get subscription based on gradeId

  getlistofsubscriptionbygrade(data) {
    const jsonda = {
      gradeId: data
    };

    return this.http.post(this.URL.domain + this.URL.Post_Ports.ListOfSubscriptionByGradeId, jsonda);
  }

  //  get all subscription without Id

  getallsubscription() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.GetAllSubscription);
  }

  getallsubscriptionwithfilter(data) {
    
    return this.http.post(this.URL.domain + this.URL.Post_Ports.listofproducts,data);
  }


  

  // get grade of student

  getgradeofstudent(data) {
    const jsondata = {
      studentAccountId: data
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.GetGradeOfStudent, jsondata);
  }

  // get details of user by mail Id

  getdetailoflogin(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.GetUserDetailByEmail, data);
  }

  // send live class data to learntron

  liveclassroomsheduler(data) {
    const headers = new HttpHeaders({ "Learntron-Api-Token": this.learntronkey, "Content-Type": "application/json" });

    return this.http.post(this.URL.learntron.CreateLiveSession, data, { headers: headers });
  }

  liveclassroomshedulerZoom(data) {
    console.log("zoom data ",data);
    const headers = new HttpHeaders({ 
      "Authorization": "Bearer "+this.jwtTokenForZoom,
     "Content-Type": "application/json" ,
     "Access-Control-Allow-Origin": "*",
     'Access-Control-Allow-Headers': 'Content-Type'
    });
    //return null;
   // return this.http.post("http://localhost:8080/liveclass/createZoomMeeting", data, { headers: headers });
    return this.http.post(this.URL.domain+this.URL.Post_Ports.ScheduleZoomMeeting, data, { headers: headers }); //Added by Moin

    
  }

  // get live class analytics from learntron

  classanalytics(data) {
    const headers = new HttpHeaders({ "Learntron-Api-Token": this.learntronkey, "Content-Type": "application/json" });

    return this.http.get(this.URL.learntron.LiveClassAnalytics + data, { headers: headers });
  }

  // update class detail in learntron
  updateclassroomsheduler(data) {
    const headers = new HttpHeaders({ "Learntron-Api-Token": this.learntronkey, "Content-Type": "application/json" });

    return this.http.post(this.URL.learntron.UpdateClassScheduled, data, { headers: headers });
  }

  // add student to the session (learntron)

  launchstudentclassroom(data) {
    const headers = new HttpHeaders({ "Learntron-Api-Token": this.learntronkey, "Content-Type": "application/json" });
    const data1: any = {
      sessionId: data,
      participants: [
        {
          participantUniqueName: sessionStorage.getItem("accountId"),
          participantDisplayName: this.userdetails.firstName + " " + this.userdetails.lastName,
          role: "participant"
        }
      ]
    };

    return this.http.post(this.URL.learntron.AddStudentToSession, data1, { headers: headers });
  }

  // add student to the class in case of guest (learntron)

  launchstudentclassroom1(data, data1) {
    const headers = new HttpHeaders({ "Learntron-Api-Token": this.learntronkey, "Content-Type": "application/json" });

    const participantData: any = {
      sessionId: data,
      participants: [{ participantUniqueName: data1, participantDisplayName: "GUEST", role: "participant" }]
    };
    return this.http.post(this.URL.learntron.AddStudentToSession, participantData, { headers: headers });
  }

  // schedule new class

  liveclassroomshedulerdb(data) {
    console.log("DB Data",data) 
   
   
    return this.http.post(this.URL.domain + this.URL.Post_Ports.ScheduleClass, data);
  }

  // update/edit the class details

  updateclassroomshedulerdb(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UpdateUpcomingClass, data);
  }

  // get all the classes of the teacher

  teacherclassrooms(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.TeacherClassesById, data);
  }

  // get classes of other teacher

  teacherclassroomsasstudent(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.TeacherClassesasstudentById, data);
  }

  // get all scheduled class

  getallclasses(data) {
    console.log(this.URL.domain + this.URL.Post_Ports.RetriveClass)
    return this.http.post(this.URL.domain + this.URL.Post_Ports.RetriveClass, data);
  }

  // create product

  createsubscription(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.CreateProducts, data);
  }

  createsubscription1(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.CreateProducts2, data);
  }


  // update product

  updateproduct(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UpdateProduct, data);
  }

  // delete product

  deleteproduct(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.DeleteProduct, data);
  }

  // upload assignment file

  uploadfiles(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UploadAssignment, data);
  }

  // upload test file

  uploadfiles1(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UploadTest, data);
  }

  // get test file (blob)

  getTestfiles(data) {
    const jsondata = {
      fileName: data
    };
    return this.http.get(this.URL.domain + this.URL.Get_Ports.GetTestFile + data, { responseType: "blob" });
  }

  // get assignment file (blob)

  getAssignmentfiles(data) {
    const jsondata = {
      fileName: data
    };
    const headers = new HttpHeaders();

    return this.http.get(this.URL.domain + this.URL.Get_Ports.GetAssignmentFile + data, { responseType: "blob" });
  }

  // get all classes based on the gradeId
  public inpugttext;
  getclassbygrade(data) {
   
   
   this.inpugttext=this.http.post(this.URL.domain + this.URL.Post_Ports.ListOfScheduledClassByGradeId, data);
   return  this.inpugttext;
  }

  // get all classes for guest

  getclassbygradeForGuest(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.ListOfScheduledClassForGuest, data);
  }

  // upload image

  uploadimage(data, data1) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UploadImages + data1, data);
  }

  // delete scheduled class

  deleteclassfunction(data) {
    const jsondata = {
      sessionId: data
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.DeleteScheduledClass, jsondata);
  }



  // get student attended classes

  studenthistory(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.StudentAttendedClass, data);
  }

  // reset password

  resetpassword(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.ForgotPassword, data);
  }

  sanalyitcs(data){
    return this.http.post(this.URL.domain + this.URL.Post_Ports.sanalyitcs, data);

  }


  // get session Id of attended class

  sessionofstudent(data) {
    const jsondata = {
      sAccountId: data
    };

    return this.http.post(this.URL.domain + this.URL.Post_Ports.SessionIdofAttendedClass, jsondata);
  }

  // get date wise parent count (not using)

  parentcount() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.GetDateWiseParent);
  }

  // get date wise guest count (not using)

  guestcount() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.GetDateWiseGuest);
  }

  // get date wise student count (not using)

  studentcount() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.GetDateWiseStudent);
  }

  // schedule  mail to student

  sendmailtostudents(data, date) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.SendMailToStudent + date, data);
  }

  // update profile photo

  updateprofile(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.EditProfile, data);
  }

  // get no. of message left count (not using)

  getmessagecount() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.MessageLeftCount);
  }

  // change password

  changepasswordbyhimself(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.ChangePassword, data);
  }

  // save assignment or test

  AssignmentOrTestSave(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.SaveAssignmentandTest, data);
  }

  // get attendence of student (not using)

  getattendence(data, date) {
    const jsondata = {
      userId: data,
      date: date
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.GetAttendenceReport, jsondata);
  }

  // update attendence excel of student (not using)

  updateExcel(data) {
    const jsondat = {
      date: data
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.UpdateExcel, jsondat);
  }

  // put attendence (not using)

  putAttendence(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.PutAttendence, data);
  }

  // delete profile photo (not using)

  deleteProfilePhoto(data) {
    const jsondata = {
      accountId: data
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.DeleteProfilePhoto, jsondata);
  }

  // session kill after some time (not using)

  sessionkill() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.SessionKillUrl);
  }

  // get the recorded class viewer (learntron)

  recordedstat(data) {
    const headers = new HttpHeaders({ 
      "Learntron-Api-Token": this.learntronkey,
     "Content-Type": "application/json" 
    });
    return this.http.get(this.URL.learntron.RecordedClassStat + data, { headers: headers });
  }

  // get students based on gradeId

  getStudentByGradeId(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getStudentByGradeID, data);
  }

  // block student from attending class (not using)

  blockStudent(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.blockStudent, data);
  }

  // unblock student (not using)

  unblockStudent(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.unblockStudent, data);
  }

  // to add recording analytics (reason for watching recorded class)

  RecordingAnalytics(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.recordingAnalytics, data);
  }

  // list of blocked student

  listOfBlockedStudent(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.listOfBlockedStudent, data);
  }

  // check block status of student

  checkBlockstatusOfStudent(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.checkBlockstatusOfStudent, data);
  }

  // save test report

  savetestreport(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.savetestreport, data);
  }

  // retrieve test report

  retrivetestreport(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.retrivetestreport, data);
  }

  // get the student test based on fileId

  getStudentsTestWithFileId(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getStudentsTestWithFileId, data);
  }

  // get student test report

  getStudentTestReport(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getStudentTestReport, data);
  }

  // get recorded analytics (reason for recorded class)

  getRecordedAnalytics(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getRecordedAnalytics, data);
  }

  // submit feedback

  submitFeedback(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.submitFeedback, data);
  }

  // get the rating of taecher

  getRating(data) {
    const jsondata = {
      sesionId: data
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getRatingofTeacher, jsondata);
  }

  // get student detail based on student accountId

  studentDetail(data) {
    const jsondata = {
      studentAccountId: data
    };
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getStudentDetail, jsondata);
  }

  // forget password admin

  forgetPasswordAdmin(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.forgetPasswordAdmin, data);
  }

  // forget password student

  forgetPasswordStudent(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.forgetPasswordStudent, data);
  }

  // forget password teacher

  forgetPasswordTeacher(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.forgetPasswordTeacher, data);
  }

  // post the user details while payment

  paymentPost(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.PostPayment, data);
  }

  // get details of payment

  getdetailsOfPayementByParentUsingOrder(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.GetPaymentDetails, data);
  }

  // send the payment details to ftp (not using)

  sendToFTP(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.sendToFTP, data);
  }

  // send the payment details to user mailId

  sendToMail(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.sendToMail, data);
  }

  // unsubscribe from recieving mail

  unsubscribe(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.unsubscribe, data);
  }

  // get rating based on the session Id

  ratingBasedOnSessionId(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getRatingBySessionId, data);
  }

  // get details of purchased product

  getDeatailsOfPurchasedProduct(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getDetailOfPurchasedProduct, data);
  }

  // status update for student

  statusUpdateStudent(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.statusChangeOfStudent, data);
  }

  // get chapter based on grade, syllabus and subject ID

  getChapters(grade, syllabus, subject) {
    const jsondata = {
      gradeId: grade,
      syllabusId: syllabus,
      subjectId: subject
    };

    return this.http.post(this.URL.domain + this.URL.Post_Ports.getChapter, jsondata);
  }

  // add new chapter

  addNewChapter(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.saveChapter, data);
  }

  // get the talent test registered user details

  talentTestDataFunc() {
    return this.http.get(this.URL.domainTalentTest + this.URL.Get_Ports.talentTestUrl);
  }

  // get the count of registered user of each grade

  talentTestCount() {
    return this.http.get(this.URL.domainTalentTest + this.URL.Get_Ports.getTalenttestCount);
  }

  // get talent test result by gradeId

  talentTestResultByGrade(data) {
    return this.http.post(this.URL.domainTalentTest + this.URL.Post_Ports.talentTestResultByGrade, data);
  }

  // talent test section wise mark of the student

  talentTestSectionWiseResult(data) {
    return this.http.post(this.URL.domainTalentTest + this.URL.Post_Ports.talentTestSectionWiseResult, data);
  }

  // get all assignment with pagination

  getAllAssignment(paginationData) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getAssignment, paginationData);
  }

  // get all test with pagination

  getAllTest(paginationData) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getTest, paginationData);
  }

  // get all missed class

  missedClasses(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.missedClasses, data);
  }

  incompletedClasses(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.incompletedClasses, data);
  }

  completedClasses(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.completedClasses, data);
  }

  

  // get all completed class

  completedClass(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.completedClassUrl, data);
  }

  // scheduled class of student  for claendar ( without pagination )

  StudentCalenderClasses(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.studentcalenderurl, data);
  }

  // scheduled class of teacher for calendar ( without pagination )

  teacherCalenderClasses(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.teachercalenderurl, data);
  }

  // get all scheduled class for admin ( without pagination )

  getallclassesForCalender(data) {
    return this.http.post(this.URL.domain + this.URL.Get_Ports.calenderurl,data);
  }

  // get assignment/test using FileId

  getDetailOfFileByFileId(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getDetailByFileId, data);
  }

  // save live class viewers detail (from learntron to database)

  saveLearntronLiveData(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.saveLearntronLiveData, data);
  }

  // save recorded class viewers detail (from learntron to database)

  saveLearntronRecordedData(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.saveLearntronRecordedData, data);
  }

  // allot package to the student after successful registration(kin payment checkout table)

  allotPackageToStudent(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.allotSubscriptionTo, data);
  }

  // get all guest classes

  getGuestClass(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.allclassofguest, data);
  }

  // book slot for the demo class

  bookSlotForClass(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.bookslotURL, data);
  }

  // get demo class booked list

  getDemoClass(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getBookedSlot, data);
  }

  // get all scheduled class of guest for calendar

  getGuestCalender(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getAllClassesForGuestCalender, data);
  }

  // get product details by subscription Id

  getProductDetailBySubId(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getProductDetailBySubId, data);
  }

  // delete student if the payment is unsuccessful

  deleteStudentPaymentUnSuccess(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.deleteStudentPaymentUnSuccess, data);
  }

  // update the role from guest to parent if the registration is successful

  updateGuestToParent(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.updateGuestToParent, data);
  }

  // set the subscriptionId in student table (if the registraion is successful)

  setStudentSubscriptionId(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.setStudentSubscriptionId, data);
  }

  // login while reload of the page

  RefreshloginFunction(data) {
    return this.http.post(this.RefreshLogin, data);
  }

  // create batch

  createBatch(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.createbatch, data);
  }

  // get all batches

  getBatches(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getAllBatches, data);
  }

  // get student list based on the program name

  getAllstudentBasedOnSyllabus(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.addStudentToBatch, data);
  }

  // add student to the batch

  addstudentBasedOnSyllabus(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.assignStudentToBatch, data);
  }

  // get the student of the batch

  listofStudentByBatchId(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.listofStudentByBatchId, data);
  }

  // get the batch details

  getBatchDetails(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getBatchDetails, data);
  }

  // remove student from the batch

  deletestudentBasedOnSyllabus(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.deleteStudentFromBatch, data);
  }

  // get batch based on grade and syllabus

  getBatcheBasedOnGradeSyllabus(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getBatcheBasedOnGradeSyllabus, data);
  }

  // get class detail by sessionId

  getSessionDetails(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getSessionDetailBySessionId, data);
  }

  // get all demo members

  getallDemoMembersfunction(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getDemoMembersURL, data);
  }

  // load all admin

  loadAllAdminFunc() {
    return this.http.get(this.URL.domain + this.URL.Get_Ports.getAllAdmin);
  }

  // update admin details

  updateAdminFunc(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.updateAdmin, data);
  }

  // update admin access

  updateAdminAccess(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.updateAccess, data);
  }

  // get admin access

  getAdminAccess(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.getAdminAccess, data);
  }

//export to excel in subscription
  getSubscriptionbyfilterData(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
     return this.http.post(this.URL.domain + this.URL.Post_Ports.getsubscriptionbyFilter, data, {responseType:  'blob' as 'blob'});
  }

  //export to excel in student
  getallparentfunctionbyFilter(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    // console.log(this.URL.domain + this.URL.Post_Ports.getallparentfunctionbyFilter,data)
     return this.http.post(this.URL.domain + this.URL.Post_Ports.getallparentfunctionbyFilter, data, {responseType:  'blob' as 'blob'});
  }

  //delete multiple class in recorded class for admin
  deleteclassMultiple(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.deleteclassMultipleurl, data);
  }
  
  //change the status of grade in clasroom
  classroomgradestatuschange(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.classroomgradestatuschangeurl, data);
  }
  //change the status of chapters in clasroom
  chapterroomgradestatuschange(data) {
    return this.http.post(this.URL.domain + this.URL.Post_Ports.chapterroomgradestatuschangeurl, data);
  }
  
  //search filter in student module for admin for list and grid view
  searchFilterStudent(data){
    return this.http.post(this.URL.domain + this.URL.Post_Ports.searchFilterStudenturl, data);
  }

  //search filter in subscription for admin
  searchFilterSubscription(data){
    return this.http.post(this.URL.domain + this.URL.Post_Ports.searchFilterSubscriptionurl, data);
  }

  getadminlist(){
    
    return this.http.get(this.URL.domain + this.URL.Get_Ports.adminexcel,{responseType:  'blob' as 'blob'});
  }
  getteacherlist(){
    
    return this.http.get(this.URL.domain + this.URL.Get_Ports.teacherexcel,{responseType:  'blob' as 'blob'});
  }
  getparentlist(){
    
    return this.http.get(this.URL.domain + this.URL.Get_Ports.parentexcel,{responseType:  'blob' as 'blob'});
  }
// Save Token

saveZoomToken(token:string){
    
  return this.http.get(this.URL.domain + this.URL.Get_Ports.saveToken+token);
}

isValidToken(){
    
  return this.http.get(this.URL.domain + this.URL.Get_Ports.isValidToken);
}

}
