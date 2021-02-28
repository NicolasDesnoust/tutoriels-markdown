import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
})
export class SubHeaderComponent implements OnInit {
  navItems = [
    {
      link: '/blog',
      label: 'Tutoriels',
    },
    {
      link: '/cheet-sheets',
      label: 'Cheet Sheets',
    },
    {
      link: '/courses',
      label: 'Cours',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
