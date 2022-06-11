import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "RecordedSearchPipe", pure: false })
export class RecordedSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, "ig");
    if (value) {
      return value.filter(user => {
        if (user.title || user.gradeName || user.syllabusName || user.subjectName || user.presenterDisplayName || user.accessTo ) {
          return user.title.search(searchText) !== -1 || user.gradeName.search(searchText) !== -1 ||  user.syllabusName.search(searchText) !== -1 || user.subjectName.search(searchText) !== -1 || user.presenterDisplayName.search(searchText) !== -1 || user.accessTo.search(searchText) !== -1;
        }
      });
    }
  }
}

