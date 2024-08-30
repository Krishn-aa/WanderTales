import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FeedComponent } from '../feed/feed.component';
import { PostComponent } from '../post/post.component';
import { TrendingComponent } from '../trending/trending.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FeedComponent, PostComponent, TrendingComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  profileActive = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.children.forEach((child) => {
      child.url.subscribe((url) => {
        this.profileActive = url[0] && url[0].path === 'profile';
      });
    });
  }
}