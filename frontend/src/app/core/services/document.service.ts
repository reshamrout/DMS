import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentModel, DocumentQuery, DocumentVersion } from '../../models/document.model';
import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  list(query: DocumentQuery): Observable<{ documents: DocumentModel[]; pagination: any }> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<{ documents: DocumentModel[]; pagination: any }>(`${this.appConfig.apiUrl}/documents`, {
      params,
    });
  }

  getById(id: string): Observable<{ document: DocumentModel }> {
    return this.http.get<{ document: DocumentModel }>(`${this.appConfig.apiUrl}/documents/${id}`);
  }

  upload(payload: FormData): Observable<{ document: DocumentModel }> {
    return this.http.post<{ document: DocumentModel }>(`${this.appConfig.apiUrl}/documents`, payload);
  }

  update(id: string, payload: FormData): Observable<{ document: DocumentModel }> {
    return this.http.put<{ document: DocumentModel }>(`${this.appConfig.apiUrl}/documents/${id}`, payload);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.appConfig.apiUrl}/documents/${id}`);
  }

  versions(id: string): Observable<{ versions: DocumentVersion[] }> {
    return this.http.get<{ versions: DocumentVersion[] }>(`${this.appConfig.apiUrl}/documents/${id}/versions`);
  }

  downloadUrl(id: string): string {
    return `${this.appConfig.apiUrl}/documents/${id}/download`;
  }

  viewUrl(id: string): string {
    return `${this.appConfig.apiUrl}/documents/${id}/view`;
  }

  versionDownloadUrl(id: string, version: number): string {
    return `${this.appConfig.apiUrl}/documents/${id}/versions/${version}/download`;
  }

  download(id: string): Observable<HttpResponse<Blob>> {
    return this.http.get(this.downloadUrl(id), {
      observe: 'response',
      responseType: 'blob',
    });
  }

  downloadVersion(id: string, version: number): Observable<HttpResponse<Blob>> {
    return this.http.get(this.versionDownloadUrl(id, version), {
      observe: 'response',
      responseType: 'blob',
    });
  }
}
