import {
  AuthService
} from "./chunk-VZFNT5BW.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-UCZX6UAK.js";
import {
  ToastrService
} from "./chunk-HEXA7CEX.js";
import {
  CommonModule,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-5LVJLNOS.js";

// src/app/features/auth/pages/login-page.component.ts
function LoginPageComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.serverError);
  }
}
var LoginPageComponent = class _LoginPageComponent {
  constructor(fb, authService, router, toastr) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.toastr = toastr;
    this.loading = false;
    this.submitted = false;
    this.serverError = "";
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }
  submit() {
    this.submitted = true;
    this.serverError = "";
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.toastr.success("Logged in successfully");
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.serverError = err?.error?.message || "Unable to login. Please check your email and password.";
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function LoginPageComponent_Factory(t) {
      return new (t || _LoginPageComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastrService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginPageComponent, selectors: [["app-login-page"]], decls: 25, vars: 8, consts: [[1, "row", "justify-content-center", "mt-5"], [1, "col-12", "col-md-6", "col-lg-4"], [1, "card", "card-soft"], [1, "card-body", "p-4"], [1, "mb-3"], [3, "ngSubmit", "formGroup"], ["class", "alert alert-danger py-2", 4, "ngIf"], [1, "form-label"], ["formControlName", "email", "type", "email", 1, "form-control"], [1, "invalid-feedback"], ["formControlName", "password", "type", "password", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", "w-100", 3, "disabled"], [1, "mt-3", "text-center"], ["routerLink", "/auth/register"], [1, "alert", "alert-danger", "py-2"]], template: function LoginPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
        \u0275\u0275text(5, "Login");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "form", 5);
        \u0275\u0275listener("ngSubmit", function LoginPageComponent_Template_form_ngSubmit_6_listener() {
          return ctx.submit();
        });
        \u0275\u0275template(7, LoginPageComponent_div_7_Template, 2, 1, "div", 6);
        \u0275\u0275elementStart(8, "div", 4)(9, "label", 7);
        \u0275\u0275text(10, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(11, "input", 8);
        \u0275\u0275elementStart(12, "div", 9);
        \u0275\u0275text(13, "Enter a valid email address.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 4)(15, "label", 7);
        \u0275\u0275text(16, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "input", 10);
        \u0275\u0275elementStart(18, "div", 9);
        \u0275\u0275text(19, "Password is required.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "button", 11);
        \u0275\u0275text(21);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 12)(23, "a", 13);
        \u0275\u0275text(24, "Create account");
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.serverError);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.form.controls.email.invalid);
        \u0275\u0275advance(6);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.form.controls.password.invalid);
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.loading ? "Please wait..." : "Login");
      }
    }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginPageComponent, { className: "LoginPageComponent" });
})();

// src/app/features/auth/pages/register-page.component.ts
function RegisterPageComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.serverError);
  }
}
function RegisterPageComponent_div_26_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Password is required.");
    \u0275\u0275elementEnd();
  }
}
function RegisterPageComponent_div_26_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Password must be at least 8 characters.");
    \u0275\u0275elementEnd();
  }
}
function RegisterPageComponent_div_26_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Password must include at least one uppercase letter.");
    \u0275\u0275elementEnd();
  }
}
function RegisterPageComponent_div_26_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Password must include at least one lowercase letter.");
    \u0275\u0275elementEnd();
  }
}
function RegisterPageComponent_div_26_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Password must include at least one number.");
    \u0275\u0275elementEnd();
  }
}
function RegisterPageComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275template(1, RegisterPageComponent_div_26_div_1_Template, 2, 0, "div", 19)(2, RegisterPageComponent_div_26_div_2_Template, 2, 0, "div", 19)(3, RegisterPageComponent_div_26_div_3_Template, 2, 0, "div", 19)(4, RegisterPageComponent_div_26_div_4_Template, 2, 0, "div", 19)(5, RegisterPageComponent_div_26_div_5_Template, 2, 0, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r2 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r2["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r2["minLength"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r2["uppercase"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r2["lowercase"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r2["number"]);
  }
}
var RegisterPageComponent = class _RegisterPageComponent {
  constructor(fb, authService, router, toastr) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.toastr = toastr;
    this.loading = false;
    this.submitted = false;
    this.serverError = "";
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(80)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, this.passwordStrengthValidator]]
    });
  }
  submit() {
    this.submitted = true;
    this.serverError = "";
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService.register(this.form.getRawValue()).subscribe({
      next: () => {
        this.toastr.success("Account created");
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.serverError = err?.error?.message || "Unable to create account.";
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  passwordStrengthValidator(control) {
    const value = String(control.value || "");
    if (!value)
      return null;
    const errors = {};
    if (value.length < 8)
      errors["minLength"] = true;
    if (!/[A-Z]/.test(value))
      errors["uppercase"] = true;
    if (!/[a-z]/.test(value))
      errors["lowercase"] = true;
    if (!/[0-9]/.test(value))
      errors["number"] = true;
    return Object.keys(errors).length ? errors : null;
  }
  static {
    this.\u0275fac = function RegisterPageComponent_Factory(t) {
      return new (t || _RegisterPageComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastrService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterPageComponent, selectors: [["app-register-page"]], decls: 32, vars: 11, consts: [[1, "row", "justify-content-center", "mt-5"], [1, "col-12", "col-md-6", "col-lg-4"], [1, "card", "card-soft"], [1, "card-body", "p-4"], [1, "mb-3"], [3, "ngSubmit", "formGroup"], ["class", "alert alert-danger py-2", 4, "ngIf"], [1, "form-label"], ["formControlName", "name", "type", "text", 1, "form-control"], [1, "invalid-feedback"], ["formControlName", "email", "type", "email", 1, "form-control"], ["formControlName", "password", "type", "password", 1, "form-control"], [1, "text-muted"], ["class", "invalid-feedback d-block", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "w-100", 3, "disabled"], [1, "mt-3", "text-center"], ["routerLink", "/auth/login"], [1, "alert", "alert-danger", "py-2"], [1, "invalid-feedback", "d-block"], [4, "ngIf"]], template: function RegisterPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
        \u0275\u0275text(5, "Register");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "form", 5);
        \u0275\u0275listener("ngSubmit", function RegisterPageComponent_Template_form_ngSubmit_6_listener() {
          return ctx.submit();
        });
        \u0275\u0275template(7, RegisterPageComponent_div_7_Template, 2, 1, "div", 6);
        \u0275\u0275elementStart(8, "div", 4)(9, "label", 7);
        \u0275\u0275text(10, "Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(11, "input", 8);
        \u0275\u0275elementStart(12, "div", 9);
        \u0275\u0275text(13, "Name is required (max 80 characters).");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 4)(15, "label", 7);
        \u0275\u0275text(16, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "input", 10);
        \u0275\u0275elementStart(18, "div", 9);
        \u0275\u0275text(19, "Enter a valid email address.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 4)(21, "label", 7);
        \u0275\u0275text(22, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 11);
        \u0275\u0275elementStart(24, "small", 12);
        \u0275\u0275text(25, "Min 8 chars, with uppercase, lowercase, and number.");
        \u0275\u0275elementEnd();
        \u0275\u0275template(26, RegisterPageComponent_div_26_Template, 6, 5, "div", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "button", 14);
        \u0275\u0275text(28);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 15)(30, "a", 16);
        \u0275\u0275text(31, "Already have an account?");
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.serverError);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.form.controls.name.invalid);
        \u0275\u0275advance(6);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.form.controls.email.invalid);
        \u0275\u0275advance(6);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.form.controls.password.invalid);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.submitted && ctx.form.controls.password.errors);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.loading ? "Please wait..." : "Register");
      }
    }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterPageComponent, { className: "RegisterPageComponent" });
})();

// src/app/features/auth/auth-routing.module.ts
var routes = [
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "", redirectTo: "login", pathMatch: "full" }
];
var AuthRoutingModule = class _AuthRoutingModule {
  static {
    this.\u0275fac = function AuthRoutingModule_Factory(t) {
      return new (t || _AuthRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/features/auth/auth.module.ts
var AuthModule = class _AuthModule {
  static {
    this.\u0275fac = function AuthModule_Factory(t) {
      return new (t || _AuthModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule] });
  }
};
export {
  AuthModule
};
//# sourceMappingURL=chunk-MKG55LQQ.js.map
