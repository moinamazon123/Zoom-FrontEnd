import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "StudentSearchPipe", pure: false })
export class StudentSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, "ig");
    if (value) {
      return value.filter(user => {
        if (user.fullName || user.dateOfCreation || user.accountId || user.primaryEmail) {
          return user.fullName.search(searchText) !== -1 || user.dateOfCreation.search(searchText) !== -1 || user.accountId.search(searchText) !== -1 || user.primaryEmail.search(searchText) !== -1;
        }
        // else if (user.dateOfCreation) {
        //   return user.dateOfCreation.search(searchText) !== -1;
        // }
        // if (user)
        // else{
        //   return user.username.search(searchText) !== -1;
        // }
      });
    }
  }
}
