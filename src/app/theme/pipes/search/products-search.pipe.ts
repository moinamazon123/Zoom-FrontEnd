import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "ProductSearchPipe", pure: false })
export class ProductSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, "ig");
    if (value) {
      return value.filter(user => {
        if (user.subscriptionName || user.price) {
          return user.subscriptionName.search(searchText) !== -1 || user.price.search(searchText) !== -1;
        }
      });
    }
  }
}
