export default class Post {
  _id: string | undefined;
  userId: string | undefined;
  location: string | undefined;
  description: string | undefined;
  media: string[] = [];
  likes: string[] = [];
  comments: string[] = [];
  createdAt: Date = new Date; 
  updatedAt: Date = new Date;  
}
