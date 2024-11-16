import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger('typingAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LandingPageComponent {
  wallpaperSrc = '/assets/bg-wallpapers/wallpaper-' + Math.ceil(7 * Math.random()) + '.jpg';
  connectLetters = Array.from('Connect');
  exploreLetters = Array.from('Explore');

  constructor() {
    console.log(this.wallpaperSrc);
  }
}
