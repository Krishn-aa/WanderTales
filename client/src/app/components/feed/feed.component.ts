import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Post from '../../models/post';
import { UserService } from '../../services/user.service';
import { FeedPostComponent } from '../feed-post/feed-post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FeedPostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {
  posts: Post[] = [];

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    const userId = sessionStorage.getItem('id');
    this.apiService.get(`posts/getPosts/${userId}`).subscribe(
      (response: Post[]) => {
        this.posts = response;
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }
}
