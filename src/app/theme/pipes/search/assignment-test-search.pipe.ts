import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "AssignmentTest", pure: false })
export class AssignmentTest implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, "ig");
    if (value) {
      return value.filter(assignmenttest => {
        if (assignmenttest.title || assignmenttest.dateOfCreation || assignmenttest.subjectName || assignmenttest.gradeName || assignmenttest.syllabusName ) {
          return ((assignmenttest.title.search(searchText) !== -1) || (assignmenttest.dateOfCreation.search(searchText) !== -1) || (assignmenttest.subjectName.search(searchText) !== -1) || (assignmenttest.gradeName.search(searchText) !== -1) ||  (assignmenttest.syllabusName.search(searchText) !== -1) );
        }
      });
    }
  }
}
