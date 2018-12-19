import { Component } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UploadService]
})
export class DashboardComponent {
  message: string;

  constructor(private uploadService: UploadService) { }
  cards = [
    { title: 'Card 1', cols: 2, rows: 1 }
  ];

  onPicked(input: HTMLInputElement) {
    const file = input.files[0];
    if (file) {
      this.uploadService.upload(file).subscribe(
        res => {
          input.value = null;
          if (typeof(res) === typeof(String)) {
            this.message = res;
          } else {
            this.message = res.msg;
          }
        }
      );
    }
  }
}
