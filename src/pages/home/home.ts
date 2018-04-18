import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notifications: number = 0;
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  today = Date.now()
  products: any[] = [];
  values: number[] = [];
  selectOptions: any = {
    title: 'Choose Account'
  }

  constructor(public navCtrl: NavController,  private toaster: ToastController, ) {
    this.products = [
      {
        product_name: 'EQUITY HOLDINGS LTD',
        price: 114900
      },
      {
        product_name: 'EABL',
        price: 85400
      },
      {
        product_name: 'CITI BANK',
        price: 65000
      },
      {
        product_name: 'SAFARICOM LIMITED',
        price: 83250
      },
      {
        product_name: 'BARCLAYS BANK PLC',
        price: 70000
      },
      {
        product_name: 'I&M BANK LLC',
        price: 55125
      },
      {
        product_name: 'NATION MEDIA GROUP',
        price: 36589
      }
      ,
      {
        product_name: 'SASINI TEA',
        price: 32554
      }
    ]
    this.products.reverse()

   
  }

  ionViewWillLoad() {
    // this.barChart = new Chart(this.barCanvas.nativeElement, {
    //   type: 'line',
    //   data: {
    //     labels: ["Jul", "Aug", "Sept", "Oct", "Nov"],
    //     datasets: [{
    //       label: 'Sales',
    //       data: [12000, 19000, 30000, 50000, 54345],
    //       borderColor: 'rgb(99, 7, 136)'
    //     },
    //     {
    //       label: 'Revenue',
    //       data: [2155, 32154, 20032, 14587, 42500],
    //       borderColor: 'rgba(255, 140, 0, 0.972)'
    //     },
    //     {
    //       label: 'Profits',
    //       data: [4587, 15648, 29485, 33200, 42663],
    //       borderColor: '#00796B'
    //     }]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       xAxes: [{
    //         gridLines: { display: false },
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }],
    //       yAxes: [{
    //         gridLines: { display: false },
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }

    // });
  }
}
