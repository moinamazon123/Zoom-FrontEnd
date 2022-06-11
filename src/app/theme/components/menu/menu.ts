import { Menu } from "./menu.model";

export const Adminmenu = [
 
  new Menu(1, "Dashboard", "/dashboard/admin", null, "dashboard", null, false, 0),
  new Menu(2, "Admins", "/dashboard/admin/admin-access/admin-list", null, "supervised_user_circle", null, false, 0),
  new Menu(3, "Teachers", "/dashboard/admin/Teachers", null, "local_library", null, false, 0),
  new Menu(4, "Parents", "/dashboard/admin/Parents", null, "wc", null, false, 0),
  new Menu(5, "Students", "/dashboard/admin/Students/Grid", null, "school", null, false, 0),
  new Menu(6, "Demo Members", "/dashboard/admin/Demo Members", null, "person_pin", null, false, 0),
  new Menu(7, "Classrooms", "/dashboard/admin/Classes", null, "meeting_room", null, false, 0),
  new Menu(8, "Live Classes", "", null, "video_library", null, true, 0),
  new Menu(9, "Recorded Classes", "/dashboard/admin/e-Classes/recorded", null, "video_call", null, false, 8),
  new Menu(10, "Upcoming Classes", "/dashboard/admin/e-Classes/upcomingClass", null, "videocam", null, false, 8),
  new Menu(11, "Assignment & Test", "", null, "assignment", null, true, 0),
  new Menu(12, "Assignment", "/dashboard/admin/Assignment&Test/Assignment", null, "book", null, false, 11),
  new Menu(13, "Test", "/dashboard/admin/Assignment&Test/Test", null, "assignment_turned_in", null, false, 11),
  new Menu(14, "Schedule", "/dashboard/admin/Schedule", null, "live_tv", null, false, 0),
  new Menu(15, "Products", "/dashboard/admin/Product", null, "list", null, false, 0),
  new Menu(16, "Subscriptions", "/dashboard/admin/Subscription", null, "subscriptions", null, false, 0),
  new Menu(17, "Batch", "/dashboard/admin/Batch", null, "style", null, false, 0),
  new Menu(18, "Talent Test", "/dashboard/admin/Talenttest", null, "how_to_reg", null, false, 0),
  new Menu(19, "Zoom Token", "/dashboard/admin/Zoomtoken", null, "how_to_reg", null, false, 0)
  
];

export const horizontalMenuItems = [];

export const studentmenuItems = [

  new Menu(1, "Upcoming Classes", "/dashboard/student/upcomingClass", null, "videocam", null, false, 0),
  new Menu(2, "Dashboard", "/dashboard/student", null, "description", null, false, 0),


  
  new Menu(3, "Recorded Classes", "", null, "video_library", null, true, 0),
  new Menu(4, "All Classes", "/dashboard/student/myClass/recordedClassGrid", null, "video_call", null, false, 3),
  new Menu(5, "Missed Classes", "/dashboard/student/myClass/missedClass", null, "videocam_off", null, false, 3),
  new Menu(6, "Partially Completed Classes", "/dashboard/student/myClass/incompletedClass", null, "video_call", null, false, 3),
  new Menu(7, "Completed Classes", "/dashboard/student/myClass/completedClass", null, "offline_pin", null, false, 3),
  new Menu(8, "Assignment", "/dashboard/student/Assignment&Test/Assignment", null, "assessment", null, false, 0),
  new Menu(9, "Test", "/dashboard/student/Assignment&Test/Test", null, "keyboard", null, false, 0),
  new Menu(10, "Schedule", "/dashboard/student/schedule", null, "event_note", null, false, 0)
];


export const studentmenuItems1 = [

  new Menu(1, "Upcoming Classes", "/dashboard/student/upcomingClass", null, "videocam", null, false, 0),
  new Menu(2, "Dashboard", "/dashboard/student", null, "description", null, false, 0),


  
  new Menu(3, "Recorded Classes", "", null, "video_library", null, true, 0),
  new Menu(4, "All Classes", "/dashboard/student/myClass/recordedClassGrid", null, "video_call", null, false, 3),
  new Menu(5, "Missed Classes", "/dashboard/student/myClass/missedClass", null, "videocam_off", null, false, 3),
  new Menu(6, "Partially Completed Classes", "/dashboard/student/myClass/incompletedClass", null, "video_call", null, false, 3),
  new Menu(7, "Completed Classes", "/dashboard/student/myClass/completedClass", null, "offline_pin", null, false, 3),
 
  new Menu(8, "Schedule", "/dashboard/student/schedule", null, "event_note", null, false, 0)
];

export const guestItems = [
  new Menu(1, "Demo Recorded", "recordedGrid", null, "videocam", null, false, 0),
  new Menu(2, "Upcoming Classes", "Member/Upcoming", null, "video_library", null, false, 0),
  new Menu(3, "Recorded Classes", "Member/Recorded", null, "queue_play_next", null, false, 0),
  new Menu(3, "Assignment", "Assignment&Test/Assignment", null, "assessment", null, false, 0),
  new Menu(4, "Test", "Assignment&Test/Test", null, "keyboard", null, false, 0),
  new Menu(5, "Schedule", "Schedule", null, "event_note", null, false, 0),
  // new Menu(8, "join the course", "Product", null, "shop_two", null, false, 0)
];

export const demoItems = [
  new Menu(1, "Demo Upcoming", "class", null, "videocam", null, false, 0),
  new Menu(2, "Demo Recorded", "class/recordedGrid", null, "video_call", null, false, 0),
  new Menu(3, "Upcoming Classes", "class/Member/Upcoming", null, "video_library", null, false, 0),
  new Menu(4, "Recorded Classes", "class/Member/Recorded", null, "queue_play_next", null, false, 0),
  new Menu(5, "Assignment", "class/Assignment&Test/Assignment", null, "assessment", null, false, 0),
  new Menu(6, "Test", "class/Assignment&Test/Test", null, "keyboard", null, false, 0),
  new Menu(7, "Schedule", "class/Schedule", null, "event_note", null, false, 0),
  // new Menu(8, "join the course", "class/Product", null, "shop_two", null, false, 0),
];

export const parentmenuItems = [
  new Menu(1, "Manage Subcscriptions", "/dashboard/parent", null, "supervised_user_circle", null, false, 0),
  new Menu(2, "Demo Upcoming", "/dashboard/parent/demo/UpcomingClass", null, "videocam", null, false, 0),
  new Menu(3, "Demo Recorded", "/dashboard/parent/demo/RecordedGrid", null, "video_call", null, false, 0),
  new Menu(4, "Payment Invoice", "/dashboard/parent/Subscription", null, "file_copy", null, false, 0),
  // new Menu(5, "join the course", "/dashboard/parent/Products", null, "shop_two", null, false, 0)
];

export const teachermenuItems = [
  new Menu(1, "Dashboard", "/dashboard/teacher", null, "description", null, false, 0),
  new Menu(2, "Upcoming Classes", "/dashboard/teacher/upcomingClass", null, "videocam", null, false, 0),
  new Menu(3, "Recorded Classess", "/dashboard/teacher/recordedClass/Grid", null, "video_library", null, false, 0),
  new Menu(4, "Training Classess", "/dashboard/teacher/TraningClass", null, "video_library", null, false, 0),
  new Menu(5, "Schedule", "/dashboard/teacher/schedule", null, "event_note", null, false, 0)
];
