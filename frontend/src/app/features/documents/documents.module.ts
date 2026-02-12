import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentListPageComponent } from './pages/document-list-page.component';
import { UploadDocumentPageComponent } from './pages/upload-document-page.component';
import { DocumentDetailsPageComponent } from './pages/document-details-page.component';
import { VersionHistoryPageComponent } from './pages/version-history-page.component';

@NgModule({
  declarations: [
    DocumentListPageComponent,
    UploadDocumentPageComponent,
    DocumentDetailsPageComponent,
    VersionHistoryPageComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DocumentsRoutingModule],
})
export class DocumentsModule {}
