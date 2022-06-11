import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { AppSettings } from "../../../app.settings";
import { Menu } from "./menu.model";
import { Adminmenu, horizontalMenuItems, studentmenuItems, parentmenuItems, teachermenuItems, guestItems, demoItems, studentmenuItems1 } from "./menu";

@Injectable()
export class MenuService {
  constructor(private route: ActivatedRoute, private location: Location, public appSettings: AppSettings) { }

  public getAdminMenuItems(): Array<Menu> {
    return Adminmenu;
  }

  public getHorizontalMenuItems(): Array<Menu> {
    return horizontalMenuItems;
  }
  public getstudentMenuItems(): Array<Menu> {
    return studentmenuItems;
  }

  public getstudentMenuItems1(): Array<Menu> {
    return studentmenuItems1;
  }

  public getguetsMenuItems(): Array<Menu> {
    var gardeid;
    this.route.params.subscribe(data => {
      gardeid = data.id;
    });
    guestItems.forEach(data => {
      data.routerLink = "/Guest/" + gardeid + "/" + data.routerLink;
    });

    return guestItems;
  }

  public getdemoMenuItems(): Array<Menu> {
    let gardeid;
    this.route.params.subscribe(data => {
      gardeid = data.id;
    });
    demoItems.forEach(data => {
      data.routerLink = "/Demo/" + gardeid + "/" + data.routerLink;
    });
    return demoItems;
  }

  public getparentMenuItems(): Array<Menu> {
    return parentmenuItems;
  }
  public getteacherMenuItems(): Array<Menu> {
    return teachermenuItems;
  }
  public expandActiveSubMenu(menu: Array<Menu>) {
    const url = this.location.path();
    const routerLink = url; // url.substring(1, url.length);

    const activeMenuItem = menu.filter(item => item.routerLink === routerLink);
    if (activeMenuItem[0]) {
      let menuItem = activeMenuItem[0];
      while (menuItem.parentId !== 0) {
        const parentMenuItem = menu.filter(item => item.id === menuItem.parentId)[0];
        menuItem = parentMenuItem;
        this.toggleMenuItem(menuItem.id);
      }
    }
  }

  public toggleMenuItem(menuId) {
    const menuItem = document.getElementById("menu-item-" + menuId);
    const subMenu = document.getElementById("sub-menu-" + menuId);

    if (subMenu) {
      if (subMenu.classList.contains("show")) {
        subMenu.classList.remove("show");
        menuItem.classList.remove("expanded");
      } else {
        subMenu.classList.add("show");
        menuItem.classList.add("expanded");
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId) {
    const currentMenuItem = menu.filter(item => item.id === menuId)[0];
    if (currentMenuItem.parentId === 0 && !currentMenuItem.target) {
      menu.forEach(item => {
        if (item.id !== menuId) {
          const subMenu = document.getElementById("sub-menu-" + item.id);
          const menuItem = document.getElementById("menu-item-" + item.id);
          if (subMenu) {
            if (subMenu.classList.contains("show")) {
              subMenu.classList.remove("show");
              menuItem.classList.remove("expanded");
            }
          }
        }
      });
    }
  }
}
