import {
  BehaviorSubject,
  HttpClient,
  Router,
  environment,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-5LVJLNOS.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.tokenKey = "dms_token";
    this.userKey = "dms_user";
    this.userSubject = new BehaviorSubject(this.getStoredUser());
    this.handleStorageChange = (event) => {
      if (event.key !== this.tokenKey && event.key !== this.userKey)
        return;
      const token = localStorage.getItem(this.tokenKey);
      const user = this.getStoredUser();
      if (!token || !user) {
        this.userSubject.next(null);
        this.router.navigate(["/auth/login"]);
        return;
      }
      this.userSubject.next(user);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.handleStorageChange);
    }
  }
  register(payload) {
    return this.http.post(`${environment.apiUrl}/auth/register`, payload).pipe(tap((response) => this.persistAuth(response)));
  }
  login(payload) {
    return this.http.post(`${environment.apiUrl}/auth/login`, payload).pipe(tap((response) => this.persistAuth(response)));
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }
  refreshProfile() {
    return this.http.get(`${environment.apiUrl}/auth/profile`).pipe(tap((res) => {
      this.userSubject.next(res.user);
      localStorage.setItem(this.userKey, JSON.stringify(res.user));
    }));
  }
  token() {
    return localStorage.getItem(this.tokenKey);
  }
  currentUser() {
    return this.userSubject.value;
  }
  user$() {
    return this.userSubject.asObservable();
  }
  isAuthenticated() {
    return !!this.token();
  }
  hasRole(roles) {
    const user = this.currentUser();
    return !!user && roles.includes(user.role);
  }
  persistAuth(response) {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
    this.userSubject.next(response.user);
  }
  getStoredUser() {
    const raw = localStorage.getItem(this.userKey);
    if (!raw)
      return null;
    try {
      return JSON.parse(raw);
    } catch {
      this.logout();
      this.router.navigate(["/auth/login"]);
      return null;
    }
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-VZFNT5BW.js.map
