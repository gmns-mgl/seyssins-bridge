import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  lat: number = 45.165776;
  lng: number = 5.689965;
  zoom: number = 18;

  constructor() { }

  ngOnInit() { }

}
