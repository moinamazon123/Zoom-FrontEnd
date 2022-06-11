import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "SubscriptionSearchPipe", pure: false })
export class SubscriptionSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, "ig");
    if (value) {
      return value.filter(user => {
        if (user.gradeName) {
          //

          return user.gradeName.search(searchText) !== -1;
        } else {
          return user.gradeName.search(searchText) !== -1;
        }
      });
    }
  }
}
