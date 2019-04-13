import { Component, OnInit, ViewChild } from '@angular/core';

import { DatabaseService } from '../services/database.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  bookCount = 0;
  percentFinished = 0;
  
  doughnutChart: any;
  barChart: any;
  
  formatsCount = [];
  yearlyCount = [];


  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;

  constructor(public dbService: DatabaseService) { }

  ngOnInit() {
    this.dbService.getNumBooks().then((val) => {
      console.log(val);
      this.bookCount = val;
    });

    this.dbService.getPercentFinished().then((val) => {
      this.percentFinished = val;
    });


    this.dbService.getFormatsCount().then((val) => {
      this.formatsCount = val;

      this.createFormatChart();
    });

    this.dbService.getYearlyCount().then((val) => {
      let years = Array.from(val.keys());
      let yearCounts = Array.from(val.values());
      this.createYearlyChart(years, yearCounts);
    });
  }

  createFormatChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
          labels: ["Physical", "E-Book", "AudioBook"],
          datasets: [{
              label: 'Book Format',
              data: this.formatsCount,
              backgroundColor: [
                  'rgba(255, 99, 132)',
                  'rgba(54, 162, 235)',
                  'rgba(255, 206, 86)'
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
      }

    });
  }

  createYearlyChart(years, yearCounts) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: years,
          datasets: [{
              label: 'Books Read (Yearly)',
              data: yearCounts,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }

    });
  }


}
