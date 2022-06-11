import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TalentTestDetailsComponent } from "./talent-test-details/talent-test-details.component";
import { TalentTestResultComponent } from "./talent-test-result/talent-test-result.component";
import { TalentTestSectionwiseComponent } from "./talent-test-sectionwise/talent-test-sectionwise.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule } from "@angular/forms";

const route: Routes = [
  {
    path: "",
    component: TalentTestDetailsComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "Result",
    component: TalentTestResultComponent,
    data: { breadcrumb: "" }
  },
  {
    path: "Section-wise/:id",
    component: TalentTestSectionwiseComponent,
    data: { breadcrumb: "" }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(route), SharedModule, FormsModule],
  declarations: [TalentTestDetailsComponent, TalentTestResultComponent, TalentTestSectionwiseComponent]
})
export class TalentTestModule {}
