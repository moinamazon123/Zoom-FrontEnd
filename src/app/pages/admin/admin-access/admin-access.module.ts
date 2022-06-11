import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminCreateComponent } from "./admin-create/admin-create.component";
import { Routes, RouterModule } from "@angular/router";
import { AdminListComponent } from "./admin-list/admin-list.component";
import { AdminGridComponent } from "./admin-grid/admin-grid.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { AccessPageComponent } from "./access-page/access-page.component";

const route: Routes = [
  {
    path: "Create",
    component: AdminCreateComponent,
    data: { breadcrumb: "Create Admin" }
  },
  {
    path: "admin-list",
    component: AdminListComponent,
    data: { breadcrumb: "Admin List" }
  },
  {
    path: "admin-grid",
    component: AdminGridComponent,
    data: { breadcrumb: "Admin Grid" }
  },
  {
    path: "Edit-access/:id",
    component: AccessPageComponent,
    data: { breadcrumb: "Access Page" }
  }
];

@NgModule({
  declarations: [AdminCreateComponent, AdminListComponent, AdminGridComponent, AccessPageComponent],
  imports: [CommonModule, RouterModule.forChild(route), FormsModule, ReactiveFormsModule, SharedModule],
  entryComponents: [AdminCreateComponent]
})
export class AdminAccessModule {}
