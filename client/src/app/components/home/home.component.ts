import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FeedComponent } from '../feed/feed.component';
import { PostComponent } from '../post/post.component';
import { TrendingComponent } from '../trending/trending.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FeedComponent, PostComponent, TrendingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
