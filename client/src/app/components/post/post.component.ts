import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  postForm:any;

  constructor(private formBuilder:FormBuilder, private apiService:ApiService){}
  ngOnInit(): void{
    this.postForm = this.formBuilder.group({
      location:['',[Validators.required]],
      description:['', [Validators.required]]
    });
  }

  submitPost():void{
    if(this.postForm.valid){
      this.apiService.post('posts/add', this.postForm.value).subscribe(
        (response:any)=>{
          console.log(response.location);
          alert("The post is added successfully");
        },
        (error)=>{
          alert("Error")
          console.error('Error',error);

        }
      );
    }
    else{
      alert('Form is invalid');
    }
  }
}
