import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserProfile } from 'src/app/components/models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfileSubject: BehaviorSubject<UserProfile> = new BehaviorSubject<UserProfile>(new UserProfile());

  public userProfile$:Observable<UserProfile> = this.userProfileSubject.asObservable();


  constructor() { }

  setUserProfile(userProfile:UserProfile):void{
    this.userProfileSubject.next(userProfile);
  }

  getUserProfile():UserProfile{
    return this.userProfileSubject.value;
  }
}
