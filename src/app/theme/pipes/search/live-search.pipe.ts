import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "LiveSearchPipe", pure: false })
export class LiveSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, "ig");
    if (value) {
      return value.filter(user => {
        if (user.title) {
          return user.title.search(searchText) !== -1;
        }
      });
    }
  }
}
