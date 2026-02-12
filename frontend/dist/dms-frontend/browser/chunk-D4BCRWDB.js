import {
  AuthService
} from "./chunk-VZFNT5BW.js";
import {
  CheckboxControlValueAccessor,
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
  ActivatedRoute,
  CommonModule,
  DatePipe,
  DomSanitizer,
  HttpClient,
  HttpParams,
  NgForOf,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  __async,
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
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-5LVJLNOS.js";

// src/app/core/services/document.service.ts
var DocumentService = class _DocumentService {
  constructor(http) {
    this.http = http;
  }
  list(query) {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== void 0 && value !== null && value !== "") {
        params = params.set(key, String(value));
      }
    });
    return this.http.get(`${environment.apiUrl}/documents`, {
      params
    });
  }
  getById(id) {
    return this.http.get(`${environment.apiUrl}/documents/${id}`);
  }
  upload(payload) {
    return this.http.post(`${environment.apiUrl}/documents`, payload);
  }
  update(id, payload) {
    return this.http.put(`${environment.apiUrl}/documents/${id}`, payload);
  }
  delete(id) {
    return this.http.delete(`${environment.apiUrl}/documents/${id}`);
  }
  versions(id) {
    return this.http.get(`${environment.apiUrl}/documents/${id}/versions`);
  }
  downloadUrl(id) {
    return `${environment.apiUrl}/documents/${id}/download`;
  }
  viewUrl(id) {
    return `${environment.apiUrl}/documents/${id}/view`;
  }
  versionDownloadUrl(id, version) {
    return `${environment.apiUrl}/documents/${id}/versions/${version}/download`;
  }
  download(id) {
    return this.http.get(this.downloadUrl(id), {
      observe: "response",
      responseType: "blob"
    });
  }
  downloadVersion(id, version) {
    return this.http.get(this.versionDownloadUrl(id, version), {
      observe: "response",
      responseType: "blob"
    });
  }
  static {
    this.\u0275fac = function DocumentService_Factory(t) {
      return new (t || _DocumentService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DocumentService, factory: _DocumentService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/documents/pages/document-details-page.component.ts
var _c0 = (a0) => ["/documents", a0, "versions"];
var _c1 = () => [];
function DocumentDetailsPageComponent_div_0_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function DocumentDetailsPageComponent_div_0_button_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editMode = !ctx_r1.editMode);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.editMode ? "Cancel" : "Edit");
  }
}
function DocumentDetailsPageComponent_div_0_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function DocumentDetailsPageComponent_div_0_button_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteDocument());
    });
    \u0275\u0275text(1, "Delete");
    \u0275\u0275elementEnd();
  }
}
function DocumentDetailsPageComponent_div_0_div_32_img_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 19);
  }
  if (rf & 2) {
    const url_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275property("src", url_r5, \u0275\u0275sanitizeUrl);
  }
}
function DocumentDetailsPageComponent_div_0_div_32_iframe_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 20);
  }
  if (rf & 2) {
    const url_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275property("src", url_r5, \u0275\u0275sanitizeResourceUrl);
  }
}
function DocumentDetailsPageComponent_div_0_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "h6");
    \u0275\u0275text(2, "Preview");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, DocumentDetailsPageComponent_div_0_div_32_img_3_Template, 1, 1, "img", 17)(4, DocumentDetailsPageComponent_div_0_div_32_iframe_4_Template, 1, 1, "iframe", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r6 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", doc_r6.mimeType.startsWith("image/"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", doc_r6.mimeType === "application/pdf");
  }
}
function DocumentDetailsPageComponent_div_0_div_33_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275element(1, "input", 30);
    \u0275\u0275elementEnd();
  }
}
function DocumentDetailsPageComponent_div_0_div_33_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 31)(2, "label");
    \u0275\u0275element(3, "input", 32);
    \u0275\u0275text(4, " View");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label");
    \u0275\u0275element(6, "input", 33);
    \u0275\u0275text(7, " Edit");
    \u0275\u0275elementEnd()()();
  }
}
function DocumentDetailsPageComponent_div_0_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "h5");
    \u0275\u0275text(2, "Edit Document");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 22);
    \u0275\u0275listener("ngSubmit", function DocumentDetailsPageComponent_div_0_div_33_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(4, "div", 23);
    \u0275\u0275element(5, "input", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275element(7, "textarea", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 23);
    \u0275\u0275element(9, "input", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, DocumentDetailsPageComponent_div_0_div_33_div_10_Template, 2, 0, "div", 27)(11, DocumentDetailsPageComponent_div_0_div_33_div_11_Template, 8, 0, "div", 27);
    \u0275\u0275elementStart(12, "div", 23)(13, "input", 28);
    \u0275\u0275listener("change", function DocumentDetailsPageComponent_div_0_div_33_Template_input_change_13_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onFileChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 29);
    \u0275\u0275text(15, "Save New Version");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r1.editForm);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.canManageAccess());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canManageAccess());
  }
}
function DocumentDetailsPageComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div")(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 5);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 6)(9, "button", 7);
    \u0275\u0275listener("click", function DocumentDetailsPageComponent_div_0_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.download());
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 8);
    \u0275\u0275text(12, "Version History");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, DocumentDetailsPageComponent_div_0_button_13_Template, 2, 1, "button", 9)(14, DocumentDetailsPageComponent_div_0_button_14_Template, 2, 0, "button", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 11)(16, "p")(17, "strong");
    \u0275\u0275text(18, "Description:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p")(21, "strong");
    \u0275\u0275text(22, "Tags:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p")(25, "strong");
    \u0275\u0275text(26, "View Access:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p")(29, "strong");
    \u0275\u0275text(30, "Edit Access:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(32, DocumentDetailsPageComponent_div_0_div_32_Template, 5, 2, "div", 12)(33, DocumentDetailsPageComponent_div_0_div_33_Template, 16, 3, "div", 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const doc_r6 = ctx.ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(doc_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Uploaded by ", doc_r6.uploadedBy == null ? null : doc_r6.uploadedBy.name, " | v", doc_r6.version, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.downloading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.downloading ? "Downloading..." : "Download", " ");
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(14, _c0, doc_r6._id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.canEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canDelete());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", doc_r6.description || "N/A", "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", doc_r6.tags.join(", ") || "N/A", "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (doc_r6.viewEmails || \u0275\u0275pureFunction0(16, _c1)).join(", ") || "Only owner", "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (doc_r6.editEmails || \u0275\u0275pureFunction0(17, _c1)).join(", ") || "Only owner", "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.previewUrl());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editMode);
  }
}
function DocumentDetailsPageComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, "Loading document...");
    \u0275\u0275elementEnd();
  }
}
var DocumentDetailsPageComponent = class _DocumentDetailsPageComponent {
  constructor(route, router, documentService, authService, fb, toastr, sanitizer) {
    this.route = route;
    this.router = router;
    this.documentService = documentService;
    this.authService = authService;
    this.fb = fb;
    this.toastr = toastr;
    this.sanitizer = sanitizer;
    this.document = null;
    this.loading = false;
    this.downloading = false;
    this.editMode = false;
    this.file = null;
    this.editForm = this.fb.group({
      title: [""],
      description: [""],
      tags: [""],
      accessEmails: [""],
      allowView: [true],
      allowEdit: [false]
    });
  }
  ngOnInit() {
    this.fetch();
  }
  fetch() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id)
      return;
    this.loading = true;
    this.documentService.getById(id).subscribe({
      next: (res) => {
        this.document = res.document;
        this.editForm.patchValue({
          title: res.document.title,
          description: res.document.description,
          tags: res.document.tags.join(", "),
          accessEmails: this.mergeEmails(res.document.viewEmails || [], res.document.editEmails || []).join(", "),
          allowView: (res.document.viewEmails || []).length > 0,
          allowEdit: (res.document.editEmails || []).length > 0
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  canEdit() {
    const user = this.authService.currentUser();
    if (!user || !this.document)
      return false;
    const email = (user.email || "").toLowerCase();
    return this.document.uploadedBy?._id === user._id || (this.document.editEmails || []).includes(email);
  }
  canDelete() {
    const user = this.authService.currentUser();
    if (!user || !this.document)
      return false;
    return this.document.uploadedBy?._id === user._id;
  }
  onFileChange(event) {
    const input = event.target;
    this.file = input.files?.[0] || null;
  }
  save() {
    if (!this.document)
      return;
    const raw = this.editForm.getRawValue();
    const payload = new FormData();
    if (raw.title)
      payload.append("title", raw.title);
    payload.append("description", raw.description || "");
    payload.append("tags", raw.tags || "");
    if (this.canManageAccess()) {
      const accessEmails = this.normalizeEmails(raw.accessEmails || "");
      payload.append("viewEmails", raw.allowView ? accessEmails.join(",") : "");
      payload.append("editEmails", raw.allowEdit ? accessEmails.join(",") : "");
    }
    if (this.file)
      payload.append("file", this.file);
    this.documentService.update(this.document._id, payload).subscribe({
      next: (res) => {
        this.document = res.document;
        this.editMode = false;
        this.file = null;
        this.toastr.success("Document updated");
      }
    });
  }
  deleteDocument() {
    if (!this.document)
      return;
    if (!confirm("Delete this document?"))
      return;
    this.documentService.delete(this.document._id).subscribe({
      next: () => {
        this.toastr.success("Document deleted");
        this.router.navigate(["/documents"]);
      }
    });
  }
  downloadUrl() {
    return this.document ? this.documentService.downloadUrl(this.document._id) : "#";
  }
  viewUrl() {
    return this.document ? this.documentService.viewUrl(this.document._id) : "#";
  }
  download() {
    if (!this.document || this.downloading)
      return;
    this.downloading = true;
    this.documentService.download(this.document._id).subscribe({
      next: (response) => {
        this.saveBlob(response, this.document?.originalName || "document");
        this.downloading = false;
      },
      error: (err) => __async(this, null, function* () {
        this.downloading = false;
        const message = yield this.extractErrorMessage(err?.error);
        this.toastr.error(message || "Download failed");
      })
    });
  }
  previewUrl() {
    if (!this.document)
      return null;
    if (!this.document.mimeType.startsWith("image/") && this.document.mimeType !== "application/pdf")
      return null;
    const token = this.authService.token();
    const source = token ? `${this.viewUrl()}?token=${encodeURIComponent(token)}` : this.viewUrl();
    return this.sanitizer.bypassSecurityTrustResourceUrl(source);
  }
  canManageAccess() {
    const user = this.authService.currentUser();
    if (!user || !this.document)
      return false;
    return this.document.uploadedBy?._id === user._id;
  }
  normalizeEmails(raw) {
    return Array.from(new Set(String(raw).split(",").map((email) => email.trim().toLowerCase()).filter(Boolean)));
  }
  mergeEmails(viewEmails, editEmails) {
    return Array.from(/* @__PURE__ */ new Set([...viewEmails || [], ...editEmails || []]));
  }
  saveBlob(response, fallbackName) {
    const blob = response.body;
    if (!blob)
      return;
    const contentDisposition = response.headers.get("content-disposition") || "";
    const matched = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^;"']+)/i);
    const fileName = matched ? decodeURIComponent(matched[1]) : fallbackName;
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  resolveFileUrl(doc) {
    return doc.fileUrl || doc.filePath || "";
  }
  extractErrorMessage(errorBody) {
    return __async(this, null, function* () {
      if (!errorBody)
        return "";
      if (typeof errorBody === "string")
        return errorBody;
      if (errorBody instanceof Blob) {
        try {
          const text = yield errorBody.text();
          const parsed = JSON.parse(text);
          return parsed?.message || text;
        } catch {
          return "Download failed";
        }
      }
      if (typeof errorBody === "object" && errorBody.message) {
        return String(errorBody.message);
      }
      return "";
    });
  }
  static {
    this.\u0275fac = function DocumentDetailsPageComponent_Factory(t) {
      return new (t || _DocumentDetailsPageComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(DocumentService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(DomSanitizer));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocumentDetailsPageComponent, selectors: [["app-document-details-page"]], decls: 2, vars: 2, consts: [["class", "card card-soft", 4, "ngIf"], ["class", "text-muted", 4, "ngIf"], [1, "card", "card-soft"], [1, "card-body", "p-4"], [1, "d-flex", "justify-content-between", "align-items-start", "flex-wrap", "gap-2"], [1, "text-muted"], [1, "d-flex", "gap-2"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", 3, "click", "disabled"], [1, "btn", "btn-outline-secondary", "btn-sm", 3, "routerLink"], ["class", "btn btn-primary btn-sm", 3, "click", 4, "ngIf"], ["class", "btn btn-outline-danger btn-sm", 3, "click", 4, "ngIf"], [1, "mt-3"], ["class", "mt-4", 4, "ngIf"], ["class", "mt-4 p-3 border rounded", 4, "ngIf"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "mt-4"], ["class", "img-fluid rounded border", 3, "src", 4, "ngIf"], ["class", "w-100 border rounded", "style", "height: 500px", 3, "src", 4, "ngIf"], [1, "img-fluid", "rounded", "border", 3, "src"], [1, "w-100", "border", "rounded", 2, "height", "500px", 3, "src"], [1, "mt-4", "p-3", "border", "rounded"], [3, "ngSubmit", "formGroup"], [1, "mb-2"], ["formControlName", "title", 1, "form-control"], ["formControlName", "description", "rows", "4", 1, "form-control"], ["formControlName", "tags", 1, "form-control"], ["class", "mb-2", 4, "ngIf"], ["type", "file", 1, "form-control", 3, "change"], ["type", "submit", 1, "btn", "btn-success", "btn-sm"], ["formControlName", "accessEmails", "placeholder", "Access emails (comma separated)", 1, "form-control"], [1, "d-flex", "gap-3"], ["type", "checkbox", "formControlName", "allowView"], ["type", "checkbox", "formControlName", "allowEdit"]], template: function DocumentDetailsPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DocumentDetailsPageComponent_div_0_Template, 34, 18, "div", 0)(1, DocumentDetailsPageComponent_div_1_Template, 2, 0, "div", 1);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.document);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
      }
    }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DocumentDetailsPageComponent, { className: "DocumentDetailsPageComponent" });
})();

// src/app/features/documents/pages/document-list-page.component.ts
var _c02 = (a0) => ["/documents", a0];
function DocumentListPageComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1, "Loading documents...");
    \u0275\u0275elementEnd();
  }
}
function DocumentListPageComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1, "No documents found.");
    \u0275\u0275elementEnd();
  }
}
function DocumentListPageComponent_div_25_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td")(13, "a", 23);
    \u0275\u0275text(14, "View");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const doc_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(doc_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(doc_r1.tags.join(", ") || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((doc_r1.uploadedBy == null ? null : doc_r1.uploadedBy.name) || "Unknown");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("v", doc_r1.version, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 6, doc_r1.uploadDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c02, doc_r1._id));
  }
}
function DocumentListPageComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "table", 21)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Tags");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Uploader");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Version");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Uploaded");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, DocumentListPageComponent_div_25_tr_16_Template, 15, 11, "tr", 22);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.documents);
  }
}
function DocumentListPageComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "button", 25);
    \u0275\u0275listener("click", function DocumentListPageComponent_div_26_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fetch(ctx_r1.page - 1));
    });
    \u0275\u0275text(2, "Prev");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 25);
    \u0275\u0275listener("click", function DocumentListPageComponent_div_26_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fetch(ctx_r1.page + 1));
    });
    \u0275\u0275text(6, "Next");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.page === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Page ", ctx_r1.page, " / ", ctx_r1.totalPages, "");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.page === ctx_r1.totalPages);
  }
}
var DocumentListPageComponent = class _DocumentListPageComponent {
  constructor(fb, documentService) {
    this.fb = fb;
    this.documentService = documentService;
    this.documents = [];
    this.loading = false;
    this.page = 1;
    this.limit = 10;
    this.totalPages = 1;
    this.filterForm = this.fb.group({
      q: [""],
      tag: [""],
      uploadedBy: [""],
      startDate: [""],
      endDate: [""]
    });
  }
  ngOnInit() {
    this.fetch();
  }
  fetch(page = this.page) {
    this.loading = true;
    this.page = page;
    const raw = this.filterForm.getRawValue();
    this.documentService.list({
      q: raw.q || void 0,
      tag: raw.tag || void 0,
      uploadedBy: raw.uploadedBy || void 0,
      startDate: raw.startDate || void 0,
      endDate: raw.endDate || void 0,
      page: this.page,
      limit: this.limit
    }).subscribe({
      next: (res) => {
        this.documents = res.documents;
        this.totalPages = res.pagination.pages || 1;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  reset() {
    this.filterForm.reset({ q: "", tag: "", uploadedBy: "", startDate: "", endDate: "" });
    this.fetch(1);
  }
  static {
    this.\u0275fac = function DocumentListPageComponent_Factory(t) {
      return new (t || _DocumentListPageComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(DocumentService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocumentListPageComponent, selectors: [["app-document-list-page"]], decls: 27, vars: 5, consts: [[1, "card", "card-soft", "mb-4"], [1, "card-body"], [1, "row", "g-2", 3, "ngSubmit", "formGroup"], [1, "col-12", "col-md-3"], ["formControlName", "q", "placeholder", "Search keyword", 1, "form-control"], [1, "col-12", "col-md-2"], ["formControlName", "tag", "placeholder", "Tag", 1, "form-control"], ["formControlName", "uploadedBy", "placeholder", "Uploader ID", 1, "form-control"], [1, "col-6", "col-md-2"], ["formControlName", "startDate", "type", "date", 1, "form-control"], ["formControlName", "endDate", "type", "date", 1, "form-control"], [1, "col-12", "col-md-1", "d-grid"], ["type", "submit", 1, "btn", "btn-primary"], [1, "col-12"], ["type", "button", 1, "btn", "btn-link", "p-0", 3, "click"], [1, "card", "card-soft"], ["class", "text-muted", 4, "ngIf"], ["class", "table-responsive", 4, "ngIf"], ["class", "d-flex justify-content-between align-items-center", 4, "ngIf"], [1, "text-muted"], [1, "table-responsive"], [1, "table", "align-middle"], [4, "ngFor", "ngForOf"], [1, "btn", "btn-sm", "btn-outline-primary", 3, "routerLink"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "btn", "btn-outline-secondary", "btn-sm", 3, "click", "disabled"]], template: function DocumentListPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h4");
        \u0275\u0275text(3, "Documents");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "form", 2);
        \u0275\u0275listener("ngSubmit", function DocumentListPageComponent_Template_form_ngSubmit_4_listener() {
          return ctx.fetch(1);
        });
        \u0275\u0275elementStart(5, "div", 3);
        \u0275\u0275element(6, "input", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275element(8, "input", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 5);
        \u0275\u0275element(10, "input", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 8);
        \u0275\u0275element(12, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 8);
        \u0275\u0275element(14, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 11)(16, "button", 12);
        \u0275\u0275text(17, "Go");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 13)(19, "button", 14);
        \u0275\u0275listener("click", function DocumentListPageComponent_Template_button_click_19_listener() {
          return ctx.reset();
        });
        \u0275\u0275text(20, "Reset filters");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(21, "div", 15)(22, "div", 1);
        \u0275\u0275template(23, DocumentListPageComponent_div_23_Template, 2, 0, "div", 16)(24, DocumentListPageComponent_div_24_Template, 2, 0, "div", 16)(25, DocumentListPageComponent_div_25_Template, 17, 1, "div", 17)(26, DocumentListPageComponent_div_26_Template, 7, 4, "div", 18);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("formGroup", ctx.filterForm);
        \u0275\u0275advance(19);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.documents.length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.documents.length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.totalPages > 1);
      }
    }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DocumentListPageComponent, { className: "DocumentListPageComponent" });
})();

// src/app/features/documents/pages/upload-document-page.component.ts
var UploadDocumentPageComponent = class _UploadDocumentPageComponent {
  constructor(fb, documentService, toastr, router) {
    this.fb = fb;
    this.documentService = documentService;
    this.toastr = toastr;
    this.router = router;
    this.file = null;
    this.loading = false;
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(180)]],
      description: ["", [Validators.maxLength(4e3)]],
      tags: [""],
      accessEmails: [""],
      allowView: [true],
      allowEdit: [false]
    });
  }
  onFileChange(event) {
    const input = event.target;
    this.file = input.files?.[0] || null;
  }
  submit() {
    if (this.form.invalid || !this.file) {
      this.form.markAllAsTouched();
      this.toastr.warning("Please fill all required fields and choose a file");
      return;
    }
    this.loading = true;
    const raw = this.form.getRawValue();
    const formData = new FormData();
    formData.append("title", raw.title || "");
    formData.append("description", raw.description || "");
    formData.append("tags", raw.tags || "");
    const accessEmails = this.normalizeEmails(raw.accessEmails || "");
    formData.append("viewEmails", raw.allowView ? accessEmails.join(",") : "");
    formData.append("editEmails", raw.allowEdit ? accessEmails.join(",") : "");
    formData.append("file", this.file);
    this.documentService.upload(formData).subscribe({
      next: (res) => {
        this.toastr.success("Document uploaded");
        this.router.navigate(["/documents", res.document._id]);
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  normalizeEmails(raw) {
    return Array.from(new Set(String(raw).split(",").map((email) => email.trim().toLowerCase()).filter(Boolean)));
  }
  static {
    this.\u0275fac = function UploadDocumentPageComponent_Factory(t) {
      return new (t || _UploadDocumentPageComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(DocumentService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UploadDocumentPageComponent, selectors: [["app-upload-document-page"]], decls: 37, vars: 3, consts: [[1, "card", "card-soft"], [1, "card-body", "p-4"], [1, "mb-3"], [3, "ngSubmit", "formGroup"], [1, "form-label"], ["formControlName", "title", 1, "form-control"], ["formControlName", "description", "rows", "4", 1, "form-control"], ["formControlName", "tags", 1, "form-control"], ["formControlName", "accessEmails", "placeholder", "alice@example.com, bob@example.com", 1, "form-control"], [1, "form-label", "d-block"], [1, "d-flex", "gap-3"], ["type", "checkbox", "formControlName", "allowView"], ["type", "checkbox", "formControlName", "allowEdit"], ["type", "file", 1, "form-control", 3, "change"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"]], template: function UploadDocumentPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h4", 2);
        \u0275\u0275text(3, "Upload Document");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "form", 3);
        \u0275\u0275listener("ngSubmit", function UploadDocumentPageComponent_Template_form_ngSubmit_4_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(5, "div", 2)(6, "label", 4);
        \u0275\u0275text(7, "Title");
        \u0275\u0275elementEnd();
        \u0275\u0275element(8, "input", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 2)(10, "label", 4);
        \u0275\u0275text(11, "Description");
        \u0275\u0275elementEnd();
        \u0275\u0275element(12, "textarea", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 2)(14, "label", 4);
        \u0275\u0275text(15, "Tags (comma separated)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "input", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 2)(18, "label", 4);
        \u0275\u0275text(19, "Access Emails (comma separated)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 2)(22, "label", 9);
        \u0275\u0275text(23, "Permissions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 10)(25, "label");
        \u0275\u0275element(26, "input", 11);
        \u0275\u0275text(27, " View");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "label");
        \u0275\u0275element(29, "input", 12);
        \u0275\u0275text(30, " Edit");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(31, "div", 2)(32, "label", 4);
        \u0275\u0275text(33, "File");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "input", 13);
        \u0275\u0275listener("change", function UploadDocumentPageComponent_Template_input_change_34_listener($event) {
          return ctx.onFileChange($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(35, "button", 14);
        \u0275\u0275text(36);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(31);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.loading ? "Uploading..." : "Upload");
      }
    }, dependencies: [\u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UploadDocumentPageComponent, { className: "UploadDocumentPageComponent" });
})();

// src/app/features/documents/pages/version-history-page.component.ts
function VersionHistoryPageComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, "Loading versions...");
    \u0275\u0275elementEnd();
  }
}
function VersionHistoryPageComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, "No versions found.");
    \u0275\u0275elementEnd();
  }
}
function VersionHistoryPageComponent_div_6_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "button", 8);
    \u0275\u0275listener("click", function VersionHistoryPageComponent_div_6_tr_14_Template_button_click_11_listener() {
      const version_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.download(version_r2.version, version_r2.originalName));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const version_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("v", version_r2.version, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(version_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((version_r2.updatedBy == null ? null : version_r2.updatedBy.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 6, version_r2.updatedAt, "medium"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.downloadingVersion !== null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.downloadingVersion === version_r2.version ? "Downloading..." : "Download", " ");
  }
}
function VersionHistoryPageComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "table", 6)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Version");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Updated By");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Updated At");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275template(14, VersionHistoryPageComponent_div_6_tr_14_Template, 13, 9, "tr", 7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r2.versions);
  }
}
var VersionHistoryPageComponent = class _VersionHistoryPageComponent {
  constructor(route, documentService, toastr) {
    this.route = route;
    this.documentService = documentService;
    this.toastr = toastr;
    this.versions = [];
    this.docId = "";
    this.loading = false;
    this.downloadingVersion = null;
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id)
      return;
    this.docId = id;
    this.loading = true;
    this.documentService.versions(id).subscribe({
      next: (res) => {
        this.versions = res.versions;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  download(version, fallbackName) {
    if (this.downloadingVersion !== null)
      return;
    this.downloadingVersion = version;
    this.documentService.downloadVersion(this.docId, version).subscribe({
      next: (response) => {
        this.saveBlob(response, fallbackName);
        this.downloadingVersion = null;
      },
      error: (err) => __async(this, null, function* () {
        this.downloadingVersion = null;
        const message = yield this.extractErrorMessage(err?.error);
        this.toastr.error(message || "Download failed");
      })
    });
  }
  saveBlob(response, fallbackName) {
    const blob = response.body;
    if (!blob)
      return;
    const contentDisposition = response.headers.get("content-disposition") || "";
    const matched = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^;"']+)/i);
    const fileName = matched ? decodeURIComponent(matched[1]) : fallbackName;
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  extractErrorMessage(errorBody) {
    return __async(this, null, function* () {
      if (!errorBody)
        return "";
      if (typeof errorBody === "string")
        return errorBody;
      if (errorBody instanceof Blob) {
        try {
          const text = yield errorBody.text();
          const parsed = JSON.parse(text);
          return parsed?.message || text;
        } catch {
          return "Download failed";
        }
      }
      if (typeof errorBody === "object" && errorBody.message) {
        return String(errorBody.message);
      }
      return "";
    });
  }
  static {
    this.\u0275fac = function VersionHistoryPageComponent_Factory(t) {
      return new (t || _VersionHistoryPageComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(DocumentService), \u0275\u0275directiveInject(ToastrService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VersionHistoryPageComponent, selectors: [["app-version-history-page"]], decls: 7, vars: 3, consts: [[1, "card", "card-soft"], [1, "card-body", "p-4"], ["class", "text-muted", 4, "ngIf"], ["class", "table-responsive", 4, "ngIf"], [1, "text-muted"], [1, "table-responsive"], [1, "table"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-primary", 3, "click", "disabled"]], template: function VersionHistoryPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h4");
        \u0275\u0275text(3, "Version History");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, VersionHistoryPageComponent_div_4_Template, 2, 0, "div", 2)(5, VersionHistoryPageComponent_div_5_Template, 2, 0, "div", 2)(6, VersionHistoryPageComponent_div_6_Template, 15, 1, "div", 3);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.versions.length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.versions.length);
      }
    }, dependencies: [NgForOf, NgIf, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VersionHistoryPageComponent, { className: "VersionHistoryPageComponent" });
})();

// src/app/features/documents/documents-routing.module.ts
var routes = [
  { path: "", component: DocumentListPageComponent },
  { path: "upload", component: UploadDocumentPageComponent },
  { path: ":id", component: DocumentDetailsPageComponent },
  { path: ":id/versions", component: VersionHistoryPageComponent }
];
var DocumentsRoutingModule = class _DocumentsRoutingModule {
  static {
    this.\u0275fac = function DocumentsRoutingModule_Factory(t) {
      return new (t || _DocumentsRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DocumentsRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/features/documents/documents.module.ts
var DocumentsModule = class _DocumentsModule {
  static {
    this.\u0275fac = function DocumentsModule_Factory(t) {
      return new (t || _DocumentsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DocumentsModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, ReactiveFormsModule, RouterModule, DocumentsRoutingModule] });
  }
};
export {
  DocumentsModule
};
//# sourceMappingURL=chunk-D4BCRWDB.js.map
