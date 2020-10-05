import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar-only-layout',
  templateUrl: './navbar-only-layout.component.html',
  styleUrls: ['./navbar-only-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarOnlyLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
