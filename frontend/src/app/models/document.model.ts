import { User } from './user.model';

export interface DocumentVersion {
  version: number;
  title: string;
  description: string;
  tags: string[];
  filePath: string;
  fileUrl?: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  updatedBy: User;
  updatedAt: string;
}

export interface DocumentModel {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  filePath: string;
  fileUrl?: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  uploadedBy: User;
  uploadDate: string;
  version: number;
  viewEmails: string[];
  editEmails: string[];
  versions: DocumentVersion[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentQuery {
  q?: string;
  tag?: string;
  uploadedBy?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
