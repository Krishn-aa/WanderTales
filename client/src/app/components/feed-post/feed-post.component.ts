import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import Post from '../../models/post';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, NgbModule],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.scss',
})
export class FeedPostComponent {
  @Input() post: Post = new Post();

  user: User = new User();

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {
    this.userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
      }
    });
    this.userService.fetchUserDetails();
  }

  ngOnInit(): void {}

  toggleLike(postId: string | undefined): void {
    if (!this.user || !this.user._id) return;

    const index = this.post.likes.indexOf(this.user._id);
    if (index === -1) {
      this.post.likes.push(this.user._id);
      if (postId) {
        this.apiService
          .post(`posts/likes/${postId}`, this.user._id)
          .subscribe();
      }
    } else {
      if (postId) {
        this.apiService
          .post(`posts/likes/${postId}`, this.user._id)
          .subscribe();
      }
      this.post.likes.splice(index, 1);
    }
  }
}
