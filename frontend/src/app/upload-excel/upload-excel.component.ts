import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css'],
})
export class UploadExcelComponent {
  constructor(private readonly http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.http
      .post('http://localhost:3000/api/upload', formData)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
