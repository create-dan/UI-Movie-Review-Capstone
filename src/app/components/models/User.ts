import { publishFacade } from "@angular/compiler";

export class User {
    constructor(
      public username: string,
      public email: string,
      public password: string,
      public role:string,
    ) {
      this.username=''
      this.email=''
      this.password=''
      this.role=''
    }
  }
  