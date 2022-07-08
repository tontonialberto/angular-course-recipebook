import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  template: `
    <h2>
      {{ message }}
    </h2>
    `
})
export class ErrorPageComponent implements OnInit {

  message: string = 'Unknown error...';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.message = this.route.snapshot.data['message'];
  }
}
