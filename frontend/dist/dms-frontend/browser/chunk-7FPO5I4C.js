import {
  AuthService
} from "./chunk-VZFNT5BW.js";
import {
  CommonModule,
  NgIf,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-5LVJLNOS.js";

// src/app/features/dashboard/dashboard-page.component.ts
function DashboardPageComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "a", 9);
    \u0275\u0275text(2, "Manage Users");
    \u0275\u0275elementEnd()();
  }
}
var DashboardPageComponent = class _DashboardPageComponent {
  constructor(authService) {
    this.authService = authService;
  }
  static {
    this.\u0275fac = function DashboardPageComponent_Factory(t) {
      return new (t || _DashboardPageComponent)(\u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardPageComponent, selectors: [["app-dashboard-page"]], decls: 14, vars: 1, consts: [[1, "card", "card-soft"], [1, "card-body", "p-4"], [1, "mb-2"], [1, "text-muted", "mb-4"], [1, "row", "g-3"], [1, "col-12", "col-md-4"], ["routerLink", "/documents", 1, "btn", "btn-outline-primary", "w-100"], ["routerLink", "/documents/upload", 1, "btn", "btn-primary", "w-100"], ["class", "col-12 col-md-4", 4, "ngIf"], ["routerLink", "/admin/users", 1, "btn", "btn-outline-dark", "w-100"]], template: function DashboardPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Document Management Dashboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, " Securely upload, search, and manage document versions with role-based access control. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 4)(7, "div", 5)(8, "a", 6);
        \u0275\u0275text(9, "Browse Documents");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 5)(11, "a", 7);
        \u0275\u0275text(12, "Upload New Document");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(13, DashboardPageComponent_div_13_Template, 3, 0, "div", 8);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(13);
        \u0275\u0275property("ngIf", ((tmp_0_0 = ctx.authService.currentUser()) == null ? null : tmp_0_0.role) === "admin");
      }
    }, dependencies: [NgIf, RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardPageComponent, { className: "DashboardPageComponent" });
})();

// src/app/features/dashboard/dashboard-routing.module.ts
var routes = [{ path: "", component: DashboardPageComponent }];
var DashboardRoutingModule = class _DashboardRoutingModule {
  static {
    this.\u0275fac = function DashboardRoutingModule_Factory(t) {
      return new (t || _DashboardRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/features/dashboard/dashboard.module.ts
var DashboardModule = class _DashboardModule {
  static {
    this.\u0275fac = function DashboardModule_Factory(t) {
      return new (t || _DashboardModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, RouterModule, DashboardRoutingModule] });
  }
};
export {
  DashboardModule
};
//# sourceMappingURL=chunk-7FPO5I4C.js.map
