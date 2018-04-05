export class User {
 
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
 
    constructor(values: Object = {}) {
      Object.assign(this, values);
  }
 
}