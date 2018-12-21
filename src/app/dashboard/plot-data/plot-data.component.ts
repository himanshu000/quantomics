import { Component, OnInit, Input } from '@angular/core';
import { Metabolite } from '../../models/metabolite';


interface MetaboliteDD {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-plot-data',
  templateUrl: './plot-data.component.html',
  styleUrls: ['./plot-data.component.scss']
})
export class PlotDataComponent implements OnInit {

  @Input() JSONData: Metabolite;

  scrollItems: any[] = [];
  metabolites: MetaboliteDD[] = [];

  public xAxis: Array<any> = [];
  public yAxis: Array<any> = [];
  private lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
    //   },
    //   tooltips: {
    //     // Disable the on-canvas tooltip
    //     enabled: false,

    //     custom: function(tooltipModel) {
    //         // Tooltip Element
    //         var tooltipEl = document.getElementById('chartjs-tooltip');

    //         // Create element on first render
    //         if (!tooltipEl) {
    //             tooltipEl = document.createElement('div');
    //             tooltipEl.id = 'chartjs-tooltip';
    //             tooltipEl.innerHTML = "<table></table>";
    //             document.body.appendChild(tooltipEl);
    //         }

    //         // Hide if no tooltip
    //         if (tooltipModel.opacity === 0) {
    //             tooltipEl.style.opacity = '0';
    //             return;
    //         }

    //         // Set caret Position
    //         tooltipEl.classList.remove('above', 'below', 'no-transform');
    //         if (tooltipModel.yAlign) {
    //             tooltipEl.classList.add(tooltipModel.yAlign);
    //         } else {
    //             tooltipEl.classList.add('no-transform');
    //         }

    //         function getBody(bodyItem) {
    //             return bodyItem.lines;
    //         }

    //         // Set Text
    //         if (tooltipModel.body) {
    //             var titleLines = tooltipModel.title || [];
    //             var bodyLines = tooltipModel.body.map(getBody);

    //             var innerHtml = '<thead>';

    //             titleLines.forEach(function(title) {
    //                 innerHtml += '<tr><th>' + title + '</th></tr>';
    //             });
    //             innerHtml += '</thead><tbody>';

    //             bodyLines.forEach(function(body, i) {
    //                 var colors = tooltipModel.labelColors[i];
    //                 var style = 'background:' + colors.backgroundColor;
    //                 style += '; border-color:' + colors.borderColor;
    //                 style += '; border-width: 2px';
    //                 var span = '<span style="' + style + '"></span>';
    //                 innerHtml += '<tr><td>' + span + body + '</td></tr>';
    //             });
    //             innerHtml += '</tbody>';

    //             var tableRoot = tooltipEl.querySelector('table');
    //             tableRoot.innerHTML = innerHtml;
    //         }

    //         // `this` will be the overall tooltip
    //         var position = this._chart.canvas.getBoundingClientRect();

    //         // Display, position, and set styles for font
    //         tooltipEl.style.opacity = '1';
    //         tooltipEl.style.position = 'absolute';
    //         tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
    //         tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
    //         tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
    //         tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
    //         tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
    //         tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
    //         tooltipEl.style.pointerEvents = 'none';
    //     }
    // }
  };

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  yAxisData: any = [];
  xAxisData: any = [];

  constructor() { }

  ngOnInit() {
    this.generateCharts();
  }

  generateCharts() {
    // tslint:disable-next-line:forin
    for (const metabolite in this.JSONData) {
      this.generateChart(metabolite);
      const graphData = {
        'metabolite': metabolite,
        'xAxis': this.xAxis[0],
        'yAxis': this.yAxis,
        'lineChartOptions': this.lineChartOptions,
        'lineChartColors': this.lineChartColors,
        'lineChartLegend': this.lineChartLegend,
        'lineChartType': this.lineChartType
      };
      this.scrollItems.push(graphData);
      this.xAxis = [];
      this.yAxis = [];
    }
  }

  public metaboliteChanged(value) {
    console.log(value);
  }

  private generateChart(metabolite) {
    this.yAxisData = [];
    this.xAxisData = [];
    if (this.JSONData.hasOwnProperty(metabolite)) {
      const individualMetabolite = this.JSONData[metabolite];
      console.log('generating data for : ' + metabolite);
      console.log('generating data for individual : ' + individualMetabolite);
      this.metabolites.push({ value: metabolite, viewValue: metabolite });
      individualMetabolite.forEach(element => {
        const areaAverage: number = this.getAreaAverage(element);
        this.yAxisData.push(areaAverage);
        this.xAxisData.push(element.concentration);
      });
      console.log(this.yAxisData);
      console.log(this.xAxisData);
      this.xAxis.push(this.xAxisData);
      this.yAxis.push({ data: this.yAxisData, label: 'Average of Area' });
    }
  }


  getAreaAverage(object): number {
    return (object.area_1 + object.area_2) / 2;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
