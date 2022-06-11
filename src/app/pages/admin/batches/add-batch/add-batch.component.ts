import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import { AppSettings } from "../../../../app.settings";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { ListBatchesComponent } from "../list-batches/list-batches.component";
import { duration } from "moment";

@Component({
  selector: "app-add-batch",
  templateUrl: "./add-batch.component.html",
  styleUrls: ["./add-batch.component.scss"]
})
export class AddBatchComponent implements OnInit {
  public form: FormGroup;
  public grades: any = [];
  public Syllabus: any = [];
  constructor(public fb: FormBuilder, public appSettings: AppSettings, public dialogref: MatDialogRef<ListBatchesComponent>, public snackbar: MatSnackBar) {
    this.form = this.fb.group({
      batchName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      gradeId: [null, Validators.required],
      syllabusId: [null, Validators.required],
      description: [null, Validators.compose([Validators.maxLength(100)])]
    });
  }

  ngOnInit() {
  // load all grade

    this.appSettings.loadallgradefunction().subscribe(data => {
      this.grades = data;
    });
  }

  selectsys(data) {
  // load syllabus based on gradeId

    this.appSettings.getsylabus(data).subscribe(sylabus => {
      this.Syllabus = sylabus;
    });
  }

  // to close the dialogbox

  close() {
    this.dialogref.close();
  }

  // create batch

  createBatch(formData) {
    this.appSettings.createBatch(formData).subscribe((data: any) => {
      if (data.msg === "New batch created.") {
        this.snackbar.open("Batch Created Successfully!!!", null, { duration: 3000 });
      } else {
        this.snackbar.open(data.msg, null, { duration: 3000 });
      }
    });
  }
}
