import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { TodoComponent } from "./todo/todo.component";
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: AdminDashboardComponent }];

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [AdminDashboardComponent, TodoComponent]
})
export class DashboardModule {}
