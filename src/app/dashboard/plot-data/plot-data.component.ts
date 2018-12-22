import { Component, OnInit, Input } from '@angular/core';
import { Metabolite } from '../../models/metabolite';

interface MetaboliteData {
  key: string;
  value: any[];
}

@Component({
  selector: 'app-plot-data',
  templateUrl: './plot-data.component.html',
  styleUrls: ['./plot-data.component.scss']
})
export class PlotDataComponent implements OnInit {
  @Input() JSONData: Metabolite;
  metabolites: MetaboliteData[] = [];
  graphData: any = {};
  lineChartLegend = false;
  lineChartData: Array<any> = [];
  lineChartLabels: Array<any> = [];
  lineChartType = 'line';
  lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
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
          this.metabolites.push({key: metabolite, value: value});
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

      metabolite.value.forEach(data => {
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
}
