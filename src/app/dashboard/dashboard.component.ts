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
          if (typeof (res) === 'string') {
            this.message = res;
          } else {
            this.message = res.msg;
          }
        }
      );
    }
  }
}

const data = {
  'metabolite_1': [
    {
      'concentration': 15,
      'area_1': 20,
      'area_2': 40
    },
    {
      'concentration': 20,
      'area_1': 20,
      'area_2': 40
    },
    {
      'concentration': 40,
      'area_1': 20,
      'area_2': 40
    }
  ],
  'metabolite_2': [
    {
      'concentration': 15,
      'area_1': 20,
      'area_2': 40
    },
    {
      'concentration': 20,
      'area_1': 20,
      'area_2': 40
    },
    {
      'concentration': 40,
      'area_1': 20,
      'area_2': 40
    }
  ],
  'metabolite_3': [
    {
      'concentration': 15,
      'area_1': 20,
      'area_2': 40
    },
    {
      'concentration': 20,
      'area_1': 20,
      'area_2': 40
    },
    {
      'concentration': 40,
      'area_1': 20,
      'area_2': 40
    }
  ]
};
