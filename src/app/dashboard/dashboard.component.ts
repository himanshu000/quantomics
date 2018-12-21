import { Component } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { Metabolite } from '../models/metabolite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UploadService]
})
export class DashboardComponent {
  message: string;

  constructor(private uploadService: UploadService) { }
  card = { cols: 2, rows: 1 };

  metaboliteData: Metabolite = {
    metabolite_1: [
      {
        concentration: 15,
        area_1: 20,
        area_2: 1
      },
      {
        concentration: 20,
        area_1: 20,
        area_2: 80
      },
      {
        concentration: 40,
        area_1: 20,
        area_2: 10
      }
    ],
    metabolite_2: [
      {
        concentration: 15,
        area_1: 20,
        area_2: 40
      },
      {
        concentration: 20,
        area_1: 20,
        area_2: 40
      },
      {
        concentration: 40,
        area_1: 30,
        area_2: 10
      }
    ],
    metabolite_3: [
      {
        concentration: 15,
        area_1: 5,
        area_2: 40
      },
      {
        concentration: 20,
        area_1: 0,
        area_2: 30
      },
      {
        concentration: 40,
        area_1: 10,
        area_2: 40
      }
    ],
    metabolite_4: [
      {
        concentration: 15,
        area_1: 20,
        area_2: 1
      },
      {
        concentration: 20,
        area_1: 20,
        area_2: 80
      },
      {
        concentration: 40,
        area_1: 20,
        area_2: 10
      }
    ],
    metabolite_5: [
      {
        concentration: 15,
        area_1: 20,
        area_2: 40
      },
      {
        concentration: 20,
        area_1: 20,
        area_2: 40
      },
      {
        concentration: 40,
        area_1: 30,
        area_2: 10
      }
    ],
    metabolite_6: [
      {
        concentration: 15,
        area_1: 5,
        area_2: 40
      },
      {
        concentration: 20,
        area_1: 0,
        area_2: 30
      },
      {
        concentration: 40,
        area_1: 10,
        area_2: 40
      }
    ]
  };


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
