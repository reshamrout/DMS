import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../models/auth.model';
import { User, UserRole } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'dms_token';
  private readonly userKey = 'dms_user';

  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange);
    }
  }

  register(payload: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, payload).pipe(
      tap((response) => this.persistAuth(response))
    );
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, payload).pipe(
      tap((response) => this.persistAuth(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }

  refreshProfile(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${environment.apiUrl}/auth/profile`).pipe(
      tap((res) => {
        this.userSubject.next(res.user);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
      })
    );
  }

  token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  currentUser(): User | null {
    return this.userSubject.value;
  }

  user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.token();
  }

  hasRole(roles: UserRole[]): boolean {
    const user = this.currentUser();
    return !!user && roles.includes(user.role);
  }

  private persistAuth(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
    this.userSubject.next(response.user);
  }

  private getStoredUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as User;
    } catch {
      this.logout();
      this.router.navigate(['/auth/login']);
      return null;
    }
  }

  private handleStorageChange = (event: StorageEvent): void => {
    if (event.key !== this.tokenKey && event.key !== this.userKey) return;

    const token = localStorage.getItem(this.tokenKey);
    const user = this.getStoredUser();

    if (!token || !user) {
      this.userSubject.next(null);
      this.router.navigate(['/auth/login']);
      return;
    }

    this.userSubject.next(user);
  };
}
