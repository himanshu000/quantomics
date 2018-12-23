import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Metabolite } from '../../models/metabolite';
import { Utility } from 'src/app/common/utility';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

interface MetaboliteData {
  key: string;
  value: any[];
}

@Component({
  selector: 'app-plot-data',
  templateUrl: './plot-data.component.html',
  styleUrls: ['./plot-data.component.scss']
})
export class PlotDataComponent implements OnInit, OnChanges {
  @Input() JSONData: Metabolite;
  metabolites: MetaboliteData[] = [];
  graphData: any = {};
  lineChartLegend = false;
  lineChartData: Array<any> = [];
  lineChartLabels: Array<any> = [];
  lineChartType = 'line';
  lineChartColors: Array<any> = [{
    backgroundColor: 'rgba(255,255,255,0)',
    borderColor: 'rgba(0,0,0,1)',
    pointBackgroundColor: [],
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointRadius: 10,
    pointHoverRadius: 10,
    lineTension: 0
  }];
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.fillDropDown();
  }

  fillDropDown() {
    if (this.JSONData) {
      for (const metabolite in this.JSONData) {
        if (this.JSONData.hasOwnProperty(metabolite)) {
          const data = this.JSONData[metabolite];
          const value = [];
          data.forEach(val => {
            value.push({
              area_1: val.area_1,
              area_2: val.area_2,
              concentration: val.concentration,
              average_area: val.area_1 + val.area_2 / 2
            });
          });
          this.metabolites.push({ key: metabolite, value: value });
        }
      }

      if (this.metabolites.length > 0) {
        this.generateChart(this.metabolites[0]);
      }
    }
  }

  public metaboliteChanged(metabolite) {
    this.generateChart(metabolite);
  }

  private generateChart(metabolite: any) {
    if (metabolite) {
      const yAxisData = [];
      const xAxisData = [];

      this.lineChartColors[0].pointBackgroundColor.splice(0, this.lineChartColors[0].pointBackgroundColor.length);
      metabolite.value.forEach(data => {
        this.lineChartColors[0].pointBackgroundColor.push('#' + Math.random().toString(16).slice(2, 5));
        xAxisData.push(data.concentration);
        yAxisData.push(data.average_area);
      });

      const xAxis = xAxisData;
      const yAxis = [{ data: yAxisData }];

      this.lineChartData = yAxis;
      this.lineChartLabels.splice(0, this.lineChartLabels.length);
      this.lineChartLabels.push(...xAxis);
    }
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

    const metaboliteDataArray = Utility.convertJSONToArray(this.JSONData);
    return new Angular5Csv(metaboliteDataArray, 'Metabolite', options);
  }
}
