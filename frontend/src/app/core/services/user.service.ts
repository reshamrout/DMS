import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRole } from '../../models/user.model';
import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  listUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${this.appConfig.apiUrl}/users`);
  }

  updateRole(id: string, role: UserRole): Observable<{ user: User; message: string }> {
    return this.http.put<{ user: User; message: string }>(`${this.appConfig.apiUrl}/users/${id}/role`, { role });
  }

  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.appConfig.apiUrl}/users/${id}`);
  }
}
