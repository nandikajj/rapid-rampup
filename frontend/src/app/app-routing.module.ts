import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';

const routes: Routes = [
  { path: 'student-table', component: StudentTableComponent },
  { path: '', redirectTo: '/student-table', pathMatch: 'full' },
  { path: '**', component: PageNotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
