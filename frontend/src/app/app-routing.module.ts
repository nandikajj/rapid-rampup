import { StudentFormComponent } from './components/student-form/student-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';
import { UploadExcelComponent } from './components/upload-excel/upload-excel.component';

const routes: Routes = [
  { path: 'student-table', component: StudentTableComponent },
  { path: 'add-student', component: StudentFormComponent },
  { path: 'upload-excel', component: UploadExcelComponent },
  { path: '', redirectTo: '/student-table', pathMatch: 'full' },
  { path: '**', component: PageNotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
