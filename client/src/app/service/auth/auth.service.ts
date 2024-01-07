import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8082/api/auth';

  constructor(private http: HttpClient) { }

  login(payload: LoginPayload): Observable<any> {
		return this.http.post(`${this.baseUrl}/login`, payload);
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

}
