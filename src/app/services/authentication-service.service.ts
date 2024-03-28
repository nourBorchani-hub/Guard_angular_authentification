import { Injectable } from '@angular/core';
import { AppUser } from '../model/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  users: AppUser[] = [];
  authenticatedUser !: AppUser;

  constructor() {
    this.users.push({ userId: UUID.UUID(), username: "user1", password: "123", role: ["USER"] });
    this.users.push({ userId: UUID.UUID(), username: "user2", password: "123", role: ["USER"] });
    this.users.push({ userId: UUID.UUID(), username: "user3", password: "123", role: ["USER", "ADMIN"] });
  }
  public login(username: string, password: string): Observable<AppUser> {
    let appUser = this.users.find(u => u.username == username); //envoyer le requete 
    if (!appUser) return throwError(() => new Error("user not found"));
    if (appUser.password != password) {
      return throwError(() => new Error("Bad credentials"));
    }
    return of(appUser);

  }
 public  logout() :Observable <boolean>{
  this.authenticatedUser !=undefined;
  localStorage.removeItem("authUSer");
  return of(true)  ;
 }


  // on garde dans le service seulment les users authentifié
  public authenticateUser(appUser: AppUser) :Observable<boolean>{
    this.authenticatedUser = appUser;
    localStorage.setItem("authUSer ", JSON.stringify({ username: appUser.username, 
      role: appUser.role, 
      jwt: "JWT_TOkEN" }));
return of(true);
  }
  public hasRole(role :string){
   return this.authenticatedUser!.role.includes(role);
  }
  public isAuthenticated(){
    return this.authenticatedUser !=undefined ;
  }
}
