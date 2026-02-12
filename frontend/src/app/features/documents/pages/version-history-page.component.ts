import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentVersion } from '../../../models/document.model';
import { DocumentService } from '../../../core/services/document.service';

@Component({
  selector: 'app-version-history-page',
  templateUrl: './version-history-page.component.html',
})
export class VersionHistoryPageComponent implements OnInit {
  versions: DocumentVersion[] = [];
  docId = '';
  loading = false;
  downloadingVersion: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.docId = id;

    this.loading = true;
    this.documentService.versions(id).subscribe({
      next: (res) => {
        this.versions = res.versions;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  download(version: number, fallbackName: string): void {
    if (this.downloadingVersion !== null) return;
    this.downloadingVersion = version;

    this.documentService.downloadVersion(this.docId, version).subscribe({
      next: (response) => {
        this.saveBlob(response, fallbackName);
        this.downloadingVersion = null;
      },
      error: async (err) => {
        this.downloadingVersion = null;
        const message = await this.extractErrorMessage(err?.error);
        this.toastr.error(message || 'Download failed');
      },
    });
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
