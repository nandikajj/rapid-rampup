import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { HttpClientModule } from '@angular/common/http';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';

@NgModule({
  declarations: [
    AppComponent,
    UploadExcelComponent,
    LandingPageComponent,
    StudentTableComponent,
    PageNotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DateInputsModule,
    BrowserAnimationsModule,
    NavigationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
