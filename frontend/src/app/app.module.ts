import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadExcelComponent } from './components/upload-excel/upload-excel.component';
import { HttpClientModule } from '@angular/common/http';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { GridModule } from '@progress/kendo-angular-grid';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';





@NgModule({
  declarations: [
    AppComponent,
    UploadExcelComponent,
    LandingPageComponent,
    StudentTableComponent,
    PageNotfoundComponent,
    StudentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DateInputsModule,
    BrowserAnimationsModule,
    NavigationModule,
    GridModule,
    UploadsModule,
    InputsModule,
    LabelModule,
    ButtonsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
