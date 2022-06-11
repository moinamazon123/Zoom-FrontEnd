import { Component, OnInit, Inject } from "@angular/core";
import { AppSettings } from "../../../../app.settings";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { ActivatedRoute } from "@angular/router";
const { orderBy } = require('natural-orderby')
@Component({
  selector: "app-add-student-batch",
  templateUrl: "./add-student-batch.component.html",
  styleUrls: ["./add-student-batch.component.scss"]
})
export class AddStudentBatchComponent implements OnInit {
  public syllabusId;
  public BatchId;
  public studentListdata = [];
  public batchListdata = [];
  public batchListToSave = [];
  public batchDetails;
  public skeletonHideForBatchStudent = false;
  public skeletonHideForAllStudent = false;
  public batchListToDelete = [];
  constructor(private appsetting: AppSettings, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(paramsId => {
      this.BatchId = paramsId.id;
    });
  }

  ngOnInit() {
    this.getBatchDetail();
  }

  // to get the batch details

  getBatchDetail() {
    const jsonForBatchDetails = {
      batchId: this.BatchId
    };
    this.appsetting.getBatchDetails(jsonForBatchDetails).subscribe(
      (data: any) => {
        this.batchDetails = data;
        // console.log(data)
      },
      () => {},
      () => {
        this.getAllStudent(this.batchDetails.syllabusId);
        this.getBatchStudent(this.batchDetails.batchId);
      }
    );
  }

  // to get all the student based on syllabusId

  getAllStudent(syllabusId) {
    const jsonForSyllabus = {
      syllabusId: syllabusId
    };
    
    this.appsetting.getAllstudentBasedOnSyllabus(jsonForSyllabus).subscribe(
      (data: any) => {
        // console.log(data)
        this.studentListdata = data;
        
        this.studentListdata=orderBy( this.studentListdata,[v => v.sAccountId],
          ['desc'])
      },
      () => {},
      () => {
        this.skeletonHideForAllStudent = true;
      }
    );
  }

  // to get all batch student

  getBatchStudent(batchId) {
    const jsonForBatch = {
      batchId: batchId
    };

    // console.log(jsonForBatch)

    this.appsetting.listofStudentByBatchId(jsonForBatch).subscribe(
      (data: any) => {
        // console.log(data)
        if (data[0].msg === "No Students assigned to this batch") {
          this.batchListdata = [];
        } else {
          this.batchListdata = data;
          this.batchListdata=orderBy( this.batchListdata,[v => v.sAccountId],
            ['desc'])
        }
      },
      () => {},
      () => {
        this.skeletonHideForBatchStudent = true;
      }
    );
  }

  // add student to the batch

  addstudenttobatch(data) {
    // console.log(data)
    this.batchListToSave = [];
    for (let i = 0; i < data.length; i++) {
      this.batchListToSave.push(data[i].multipleSub_id);
    }

    const json = {
      batchId: this.BatchId,
      studentIdList: this.batchListToSave
    };

    this.appsetting.addstudentBasedOnSyllabus(json).subscribe(
      (result: any) => {},
      () => {},
      () => {
        this.deleteStudent(this.studentListdata);
      }
    );
  }

  // remove student from the batch

  deleteStudent(data) {

    this.batchListToDelete = [];
    for (let i = 0; i < data.length; i++) {
      this.batchListToDelete.push(data[i].multipleSub_id);
    }

    const json = {
      studentIdList: this.batchListToDelete
    };

    this.appsetting.deletestudentBasedOnSyllabus(json).subscribe((result: any) => {});
  }

  // drop from one column to another column

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      this.addstudenttobatch(this.batchListdata);
    }
  }
}
