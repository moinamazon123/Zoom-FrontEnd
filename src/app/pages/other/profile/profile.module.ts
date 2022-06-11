import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileShowComponent } from "./profile-show/profile-show.component";
import { ProfileDialogComponent } from "./profile-dialog/profile-dialog.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export const route: Routes = [
  {
    path: "",
    component: ProfileShowComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(route), SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [ProfileShowComponent, ProfileDialogComponent],
  entryComponents: [ProfileDialogComponent]
})
export class ProfileModule {}
