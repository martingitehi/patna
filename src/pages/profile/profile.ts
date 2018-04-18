import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { DatabaseService } from '../../providers/db.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile: any;
  authState: boolean;
  images: any[] = [];
  mode: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private auth: AuthService,
    private dbService: DatabaseService) {
    for (let x = 1; x <= 24; x++) {
      this.images.push({
        name: x
      })
    }
  }

  async ionViewWillLoad() {
    await this.auth.getAuth().then((state: boolean) => {
      this.authState = state

      if (state == true && this.mode == true) {
        this.profile = this.navParams.get('profile')
        console.log('profile from nav loaded')
      }
      else if (state == true && this.mode == false) {
        this.dbService.getUserProfile(this.afAuth.auth.currentUser.uid)
          .then((info: any) => {
            if (info !== null) {
              console.log('profile from api loaded')
              this.profile = info
            }
          })
      }
      else if(state==false){
        this.navCtrl.push('LoginPage')
      }
    }).catch(e => console.error(e))
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.navCtrl.setRoot('LoginPage')
    })
  }
}
