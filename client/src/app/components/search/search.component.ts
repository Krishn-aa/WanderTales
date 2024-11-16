import { Component } from '@angular/core';
import User from '../../models/user';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  user:User = new User();
  userList:User[] = [];
  searchQuery: string = '';

  constructor(private apiServvice:ApiService, private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.performSearch();
    });
  }

  performSearch(){
    this.user.firstName=this.searchQuery;

    this.apiServvice.get(`users/search/${this.searchQuery}`).subscribe((data)=>{
      this.userList = data;
    })
  }

  toggleFollow(user: any) {
    user.isFollowed = !user.isFollowed;
    // Optionally send the updated follow status to the backend
    console.log(`${user.isFollowed ? 'Followed' : 'Unfollowed'} ${user.firstName}`);
  }

  

}
