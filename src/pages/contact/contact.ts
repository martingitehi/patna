import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseService } from '../../providers/db.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  orders: any[] = [];
  users: any[] = []
  mode = 'list';

  constructor(public navCtrl: NavController, private dbService: DatabaseService) {
    for (let x = 0; x <= 51; x++) {
      this.orders.push({
        no: x,
        amount: Math.round(Math.floor(Math.random() * (10000 - 1000) + 1000))
      })
    }
  }

  ionViewWillLoad() {
    this.dbService.getUsers().then(users => {
      console.log(users)
      this.users = users
    })
  }

  viewProfile(profile: any) {
    this.navCtrl.push('ProfilePage', { profile: profile, mode: true })
  }

  toggle() {
    if (this.mode == 'list') {
      this.mode = 'grid'
    }
    else {
      this.mode = 'list';
    }
  }

}
