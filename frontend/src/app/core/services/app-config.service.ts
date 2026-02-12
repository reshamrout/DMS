import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  apiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config: AppConfig = {
    apiUrl: '/api',
  };

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<Partial<AppConfig>>('assets/app-config.json')
      );
      const apiUrl = response.apiUrl?.trim();
      if (apiUrl) {
        this.config.apiUrl = this.normalizeApiUrl(apiUrl);
      }
    } catch {
      this.config.apiUrl = '/api';
    }
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  private normalizeApiUrl(apiUrl: string): string {
    return apiUrl.replace(/\/+$/, '');
  }
}
