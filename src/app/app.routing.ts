import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { PagesComponent } from "./pages/pages.component";

export const routes: Routes = [
  {
    path: "dashboard",  // routing for particular dashboard (admin, parent, student, teacher)
    component: PagesComponent,
    children: [
      {
        path: "admin",
        loadChildren: "app/pages/admin/admin.module#AdminModule"
      },
      {
        path: "parent",
        loadChildren: "app/pages/parent/parent.module#ParentModule"
      },
      {
        path: "student",
        loadChildren: "app/pages/student/student.module#StudentModule"
      },
      {
        path: "teacher",
        loadChildren: "app/pages/teacher/teacher.module#TeacherModule"
      }
    ]
  },
  {
    path: "Guest/:id",      // routing for guest dashboard
    component: PagesComponent,
    children: [
      {
        path: "",
        loadChildren: "app/pages/guest/guest.module#GuestModule"
      }
    ]
  },
  {
    path: "Demo/:id/class",   // routing for demo user dashboard
    component: PagesComponent,
    children: [
      {
        path: "",
        loadChildren: "app/pages/guest/guest.module#GuestModule"
      }
    ]
  },
  {
    path: "Profile",    // routing for profile of the user
    component: PagesComponent,
    children: [
      {
        path: "",
        loadChildren: "app/pages/other/other.module#OtherModule"
      }
    ]
  },
  {
    path: "no-access",    // routing for no-access page (for admin)
    component: PagesComponent,
    children: [
      {
        path: "",
        loadChildren: "app/pages/other/other.module#OtherModule"
      }
    ]
  },
  {
    path: "Demo",  // routing for demo member registration page
    loadChildren: "app/pages/other/other.module#OtherModule"
  },
  {
    path: "",
    loadChildren: "app/pages/other/other.module#OtherModule"
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  //    preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
  useHash: true
});
