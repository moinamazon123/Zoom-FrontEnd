import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "BatchPipe", pure: false })
export class BatchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, "ig");
    if (value) {
      return value.filter(user => {
        if (user.batchName) {
          return user.batchName.search(searchText) !== -1;
        }
      });
    }
  }
}
