import Post from "./post";

export default class User {
  _id:string='';
  firstName: string='';
  lastName: string='';
  email: string='';
  username: string='';
  password: string='';
  profilePic?: string='';
  bio: string='';
  followers:string[]=[];
  followings:string[]=[];
  friends:string[]=[];
  posts:Post[]=[];
}
