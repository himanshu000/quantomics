import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { Metabolite } from '../models/metabolite';
import { Utility } from '../common/utility';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { MetaboliteService } from '../services/metabolite.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UploadService]
})
export class DashboardComponent implements OnInit {
  message: string;

  constructor(private uploadService: UploadService, private metaboliteService: MetaboliteService) {}

  card = { cols: 2, rows: 1 };

  metaboliteData: Metabolite = {};

  ngOnInit() {
    this.metaboliteService.getMetabolites()
      .subscribe(metaboiltes => {
          this.metaboliteData = metaboiltes[0];
        });
  }

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

  exportToCSV() {
    const  options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      noDownload: false,
      headers: ['Metabolite', 'Concentration', 'Area_1', 'Area_2', 'Average Area']
    };

    const metaboliteDataArray = Utility.convertJSONToArray(this.metaboliteData);
    return new Angular5Csv(metaboliteDataArray, 'Metabolite', options);
  }
}
