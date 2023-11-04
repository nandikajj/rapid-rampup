import { Component } from '@angular/core';
import { SVGIcon, bellIcon, menuIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  public menuIcon: SVGIcon = menuIcon;
  public bellIcon: SVGIcon = bellIcon;
  public kendokaAvatar =
    'https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png';
}
