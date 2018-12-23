import { Component, OnInit } from '@angular/core';
import { Metabolite } from '../models/metabolite';
import { Utility } from '../common/utility';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { MetaboliteService } from '../services/metabolite.service';
import {
  FileUploader,
  FileSelectDirective
} from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://fe-assignment.herokuapp.com/metabolite_info/';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message: string;

  constructor(private metaboliteService: MetaboliteService) {}

  card = { cols: 2, rows: 1 };

  metaboliteData: Metabolite = {};

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'file'
  });

  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.metaboliteService
        .getMetabolites(JSON.parse(response).metabolite_info)
        .subscribe(metaboiltes => {
          this.metaboliteData = metaboiltes[0];
        });
    };
  }

  exportToCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      noDownload: false,
      headers: [
        'Metabolite',
        'Concentration',
        'Area_1',
        'Area_2',
        'Average Area'
      ]
    };

    const metaboliteDataArray = Utility.convertJSONToArray(this.metaboliteData);
    return new Angular5Csv(metaboliteDataArray, 'Metabolite', options);
  }
}
