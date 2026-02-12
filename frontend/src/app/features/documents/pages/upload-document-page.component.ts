import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../../../core/services/document.service';

@Component({
  selector: 'app-upload-document-page',
  templateUrl: './upload-document-page.component.html',
})
export class UploadDocumentPageComponent {
  file: File | null = null;
  loading = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(180)]],
    description: ['', [Validators.maxLength(4000)]],
    tags: [''],
    accessEmails: [''],
    allowView: [true],
    allowEdit: [false],
  });

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0] || null;
  }

  submit(): void {
    if (this.form.invalid || !this.file) {
      this.form.markAllAsTouched();
      this.toastr.warning('Please fill all required fields and choose a file');
      return;
    }

    this.loading = true;
    const raw = this.form.getRawValue();
    const formData = new FormData();
    formData.append('title', raw.title || '');
    formData.append('description', raw.description || '');
    formData.append('tags', raw.tags || '');
    const accessEmails = this.normalizeEmails(raw.accessEmails || '');
    formData.append('viewEmails', raw.allowView ? accessEmails.join(',') : '');
    formData.append('editEmails', raw.allowEdit ? accessEmails.join(',') : '');
    formData.append('file', this.file);

    this.documentService.upload(formData).subscribe({
      next: (res) => {
        this.toastr.success('Document uploaded');
        this.router.navigate(['/documents', res.document._id]);
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
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
}
