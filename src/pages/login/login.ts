import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../providers/auth.service';
import { DatabaseService } from '../../providers/db.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: User;
  constructor(public navCtrl: NavController, private dbService: DatabaseService, private auth: AuthService) {
    this.user = {} as User
  }

  login() {
    this.auth.signIn(this.user).then((res) => {
      if (res !== null) {
        this.dbService.getUserProfile(res.uid).then((info: any) => {
          console.log(info)
          if (info !== null) {
            localStorage.setItem('boo_profile', JSON.stringify(info))
            this.navCtrl.popToRoot()
          }
        })
      }
    })
  }

  register(){
    this.navCtrl.push('RegisterPage')
  }

}
