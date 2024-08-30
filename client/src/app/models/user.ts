export default class User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  profilePic?: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    profilePic?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.profilePic = profilePic;
  }
}
