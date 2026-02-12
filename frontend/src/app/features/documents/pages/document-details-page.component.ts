import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentModel } from '../../../models/document.model';
import { AuthService } from '../../../core/services/auth.service';
import { DocumentService } from '../../../core/services/document.service';

@Component({
  selector: 'app-document-details-page',
  templateUrl: './document-details-page.component.html',
})
export class DocumentDetailsPageComponent implements OnInit {
  document: DocumentModel | null = null;
  loading = false;
  downloading = false;
  editMode = false;
  file: File | null = null;

  editForm = this.fb.group({
    title: [''],
    description: [''],
    tags: [''],
    accessEmails: [''],
    allowView: [true],
    allowEdit: [false],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.loading = true;
    this.documentService.getById(id).subscribe({
      next: (res) => {
        this.document = res.document;
        this.editForm.patchValue({
          title: res.document.title,
          description: res.document.description,
          tags: res.document.tags.join(', '),
          accessEmails: this.mergeEmails(res.document.viewEmails || [], res.document.editEmails || []).join(', '),
          allowView: (res.document.viewEmails || []).length > 0,
          allowEdit: (res.document.editEmails || []).length > 0,
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  canEdit(): boolean {
    const user = this.authService.currentUser();
    if (!user || !this.document) return false;
    const email = (user.email || '').toLowerCase();
    return this.document.uploadedBy?._id === user._id || (this.document.editEmails || []).includes(email);
  }

  canDelete(): boolean {
    const user = this.authService.currentUser();
    if (!user || !this.document) return false;
    return this.document.uploadedBy?._id === user._id;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0] || null;
  }

  save(): void {
    if (!this.document) return;

    const raw = this.editForm.getRawValue();
    const payload = new FormData();
    if (raw.title) payload.append('title', raw.title);
    payload.append('description', raw.description || '');
    payload.append('tags', raw.tags || '');
    if (this.canManageAccess()) {
      const accessEmails = this.normalizeEmails(raw.accessEmails || '');
      payload.append('viewEmails', raw.allowView ? accessEmails.join(',') : '');
      payload.append('editEmails', raw.allowEdit ? accessEmails.join(',') : '');
    }
    if (this.file) payload.append('file', this.file);

    this.documentService.update(this.document._id, payload).subscribe({
      next: (res) => {
        this.document = res.document;
        this.editMode = false;
        this.file = null;
        this.toastr.success('Document updated');
      },
    });
  }

  deleteDocument(): void {
    if (!this.document) return;
    if (!confirm('Delete this document?')) return;

    this.documentService.delete(this.document._id).subscribe({
      next: () => {
        this.toastr.success('Document deleted');
        this.router.navigate(['/documents']);
      },
    });
  }

  downloadUrl(): string {
    return this.document ? this.documentService.downloadUrl(this.document._id) : '#';
  }

  viewUrl(): string {
    return this.document ? this.documentService.viewUrl(this.document._id) : '#';
  }

  download(): void {
    if (!this.document || this.downloading) return;
    this.downloading = true;
    this.documentService.download(this.document._id).subscribe({
      next: (response) => {
        this.saveBlob(response, this.document?.originalName || 'document');
        this.downloading = false;
      },
      error: async (err) => {
        this.downloading = false;
        const message = await this.extractErrorMessage(err?.error);
        this.toastr.error(message || 'Download failed');
      },
    });
  }

  previewUrl(): SafeResourceUrl | null {
    if (!this.document) return null;
    if (!this.document.mimeType.startsWith('image/') && this.document.mimeType !== 'application/pdf') return null;
    const token = this.authService.token();
    const source = token ? `${this.viewUrl()}?token=${encodeURIComponent(token)}` : this.viewUrl();
    return this.sanitizer.bypassSecurityTrustResourceUrl(source);
  }

  canManageAccess(): boolean {
    const user = this.authService.currentUser();
    if (!user || !this.document) return false;
    return this.document.uploadedBy?._id === user._id;
  }

  private normalizeEmails(raw: string): string[] {
    return Array.from(
      new Set(
        String(raw)
          .split(',')
          .map((email) => email.trim().toLowerCase())
          .filter(Boolean)
      )
    );
  }

  private mergeEmails(viewEmails: string[], editEmails: string[]): string[] {
    return Array.from(new Set([...(viewEmails || []), ...(editEmails || [])]));
  }

  private saveBlob(response: HttpResponse<Blob>, fallbackName: string): void {
    const blob = response.body;
    if (!blob) return;

    const contentDisposition = response.headers.get('content-disposition') || '';
    const matched = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^;"']+)/i);
    const fileName = matched ? decodeURIComponent(matched[1]) : fallbackName;

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private resolveFileUrl(doc: DocumentModel): string {
    return doc.fileUrl || doc.filePath || '';
  }

  private async extractErrorMessage(errorBody: unknown): Promise<string> {
    if (!errorBody) return '';
    if (typeof errorBody === 'string') return errorBody;

    if (errorBody instanceof Blob) {
      try {
        const text = await errorBody.text();
        const parsed = JSON.parse(text);
        return parsed?.message || text;
      } catch {
        return 'Download failed';
      }
    }

    if (typeof errorBody === 'object' && (errorBody as any).message) {
      return String((errorBody as any).message);
    }

    return '';
  }
}
