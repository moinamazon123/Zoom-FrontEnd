import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "UpcomingSearchPipe", pure: false })
export class UpcomingSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, "ig");
    if (value) {
      return value.filter(user => {
        if (user.title) {
          return user.title.search(searchText) !== -1;
        }
      });
    }
  }
}
