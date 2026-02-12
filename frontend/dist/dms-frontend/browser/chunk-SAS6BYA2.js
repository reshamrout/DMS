import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UCZX6UAK.js";
import {
  ToastrService
} from "./chunk-HEXA7CEX.js";
import {
  CommonModule,
  DatePipe,
  HttpClient,
  NgForOf,
  NgIf,
  RouterModule,
  environment,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-5LVJLNOS.js";

// src/app/core/services/user.service.ts
var UserService = class _UserService {
  constructor(http) {
    this.http = http;
  }
  listUsers() {
    return this.http.get(`${environment.apiUrl}/users`);
  }
  updateRole(id, role) {
    return this.http.put(`${environment.apiUrl}/users/${id}/role`, { role });
  }
  deleteUser(id) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
  static {
    this.\u0275fac = function UserService_Factory(t) {
      return new (t || _UserService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/admin/pages/user-management-page.component.ts
function UserManagementPageComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, "Loading users...");
    \u0275\u0275elementEnd();
  }
}
function UserManagementPageComponent_div_5_tr_14_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r4 = ctx.$implicit;
    \u0275\u0275property("value", role_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r4);
  }
}
function UserManagementPageComponent_div_5_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "select", 8);
    \u0275\u0275listener("ngModelChange", function UserManagementPageComponent_div_5_tr_14_Template_select_ngModelChange_6_listener($event) {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateRole(user_r2, $event));
    });
    \u0275\u0275template(7, UserManagementPageComponent_div_5_tr_14_option_7_Template, 2, 2, "option", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "button", 10);
    \u0275\u0275listener("click", function UserManagementPageComponent_div_5_tr_14_Template_button_click_12_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteUser(user_r2));
    });
    \u0275\u0275text(13, "Delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", user_r2.role);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.roles);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 5, user_r2.createdAt, "mediumDate"));
  }
}
function UserManagementPageComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "table", 6)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Created");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275template(14, UserManagementPageComponent_div_5_tr_14_Template, 14, 8, "tr", 7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r2.users);
  }
}
function UserManagementPageComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, "No users found.");
    \u0275\u0275elementEnd();
  }
}
var UserManagementPageComponent = class _UserManagementPageComponent {
  constructor(userService, toastr) {
    this.userService = userService;
    this.toastr = toastr;
    this.users = [];
    this.loading = false;
    this.roles = ["admin", "editor", "viewer"];
  }
  ngOnInit() {
    this.fetch();
  }
  fetch() {
    this.loading = true;
    this.userService.listUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  updateRole(user, role) {
    this.userService.updateRole(user._id, role).subscribe({
      next: (res) => {
        user.role = res.user.role;
        this.toastr.success("Role updated");
      }
    });
  }
  deleteUser(user) {
    if (!confirm(`Delete user ${user.email}?`))
      return;
    this.userService.deleteUser(user._id).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u._id !== user._id);
        this.toastr.success("User deleted");
      }
    });
  }
  static {
    this.\u0275fac = function UserManagementPageComponent_Factory(t) {
      return new (t || _UserManagementPageComponent)(\u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(ToastrService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserManagementPageComponent, selectors: [["app-user-management-page"]], decls: 7, vars: 3, consts: [[1, "card", "card-soft"], [1, "card-body", "p-4"], ["class", "text-muted", 4, "ngIf"], ["class", "table-responsive", 4, "ngIf"], [1, "text-muted"], [1, "table-responsive"], [1, "table", "align-middle"], [4, "ngFor", "ngForOf"], [1, "form-select", "form-select-sm", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "btn", "btn-sm", "btn-outline-danger", 3, "click"], [3, "value"]], template: function UserManagementPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h4");
        \u0275\u0275text(3, "User Management");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, UserManagementPageComponent_div_4_Template, 2, 0, "div", 2)(5, UserManagementPageComponent_div_5_Template, 15, 1, "div", 3)(6, UserManagementPageComponent_div_6_Template, 2, 0, "div", 2);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.users.length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.users.length);
      }
    }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserManagementPageComponent, { className: "UserManagementPageComponent" });
})();

// src/app/features/admin/admin-routing.module.ts
var routes = [{ path: "users", component: UserManagementPageComponent }];
var AdminRoutingModule = class _AdminRoutingModule {
  static {
    this.\u0275fac = function AdminRoutingModule_Factory(t) {
      return new (t || _AdminRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/features/admin/admin.module.ts
var AdminModule = class _AdminModule {
  static {
    this.\u0275fac = function AdminModule_Factory(t) {
      return new (t || _AdminModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, FormsModule, AdminRoutingModule] });
  }
};
export {
  AdminModule
};
//# sourceMappingURL=chunk-SAS6BYA2.js.map
