import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DocumentModel } from '../../../models/document.model';
import { DocumentService } from '../../../core/services/document.service';

@Component({
  selector: 'app-document-list-page',
  templateUrl: './document-list-page.component.html',
})
export class DocumentListPageComponent implements OnInit {
  documents: DocumentModel[] = [];
  loading = false;
  page = 1;
  limit = 10;
  totalPages = 1;

  filterForm = this.fb.group({
    q: [''],
    tag: [''],
    uploadedBy: [''],
    startDate: [''],
    endDate: [''],
  });

  constructor(private fb: FormBuilder, private documentService: DocumentService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(page: number = this.page): void {
    this.loading = true;
    this.page = page;
    const raw = this.filterForm.getRawValue();

    this.documentService
      .list({
        q: raw.q || undefined,
        tag: raw.tag || undefined,
        uploadedBy: raw.uploadedBy || undefined,
        startDate: raw.startDate || undefined,
        endDate: raw.endDate || undefined,
        page: this.page,
        limit: this.limit,
      })
      .subscribe({
        next: (res) => {
          this.documents = res.documents;
          this.totalPages = res.pagination.pages || 1;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  reset(): void {
    this.filterForm.reset({ q: '', tag: '', uploadedBy: '', startDate: '', endDate: '' });
    this.fetch(1);
  }
}
