import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  message: string = 'Unknown error...';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.message = this.route.snapshot.data['message'];
  }
}
