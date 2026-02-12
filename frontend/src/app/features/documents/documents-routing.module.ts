import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentDetailsPageComponent } from './pages/document-details-page.component';
import { DocumentListPageComponent } from './pages/document-list-page.component';
import { UploadDocumentPageComponent } from './pages/upload-document-page.component';
import { VersionHistoryPageComponent } from './pages/version-history-page.component';

const routes: Routes = [
  { path: '', component: DocumentListPageComponent },
  { path: 'upload', component: UploadDocumentPageComponent },
  { path: ':id', component: DocumentDetailsPageComponent },
  { path: ':id/versions', component: VersionHistoryPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
