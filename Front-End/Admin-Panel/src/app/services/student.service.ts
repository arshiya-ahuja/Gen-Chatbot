import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }
  logIn(login): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', login);

  }
  doLogout() {
    return sessionStorage.removeItem('token');
  }
  isLoggedIn() {
    return sessionStorage.getItem('token');
  }

  createAdmin(admin): Observable<any> {

    const token = sessionStorage.getItem('token');
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', token)
    };
    return this.http.post<any>('http://localhost:3000/api/agentCreate', admin, header);
  }

  setInfo(key: string, value: any) {
    return sessionStorage.setItem(key, value);
  }

  getStorageInfo(key: string): any {
    const value = sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
  public get sessionUserInfo() {
    let user = this.getStorageInfo('user');
    user = user || {};
    return user;

  }
  createIntent(intent): Observable<any> {
    return this.http.post<any>('http://localhost:3000/createIntent', intent);
  }

  getIntentList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/listIntent');
  }

deleteIntent(intent)
{
return this.http.post<any>('',intent);
}


createKnowledgeBase(knowldgeBase):Observable<any>
{

return this.http.post<any>('http://localhost:3000/createKB',knowldgeBase);

}

createEntities(entity):Observable<any>
{
return this.http.post<any>('http://localhost:3000/createEntity',entity);
}


entityType(entityType)
{

return this.http.post<any>('http://localhost:3000/createEntityType',entityType)

}



}


