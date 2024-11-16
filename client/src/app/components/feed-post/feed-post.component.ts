import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import Post from '../../models/post';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private userService: UserService) {
    this.userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    });
    this.userService.fetchUserDetails();
  }

  ngOnInit(): void {
    
  }

  toggleLike(): void {
    if (!this.user || !this.user._id) return;
  
    const index = this.post.likes.indexOf(this.user._id);
    index === -1 ? this.post.likes.push(this.user._id) : this.post.likes.splice(index, 1);
  }
  
}
