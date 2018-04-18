import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { AngularFireAuth } from 'angularfire2/auth';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { DatabaseService } from '../../providers/db.service';
import { ad_unit } from '../../config/ADMOB_CONFIG';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  orders: any[] = [];
  users: any[] = []
  profile: any;

  constructor(private loadCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private auth: AuthService,
    private navCtrl: NavController,
    private dbService: DatabaseService,
    private admobFree: AdMobFree) {
    for (let x = 1; x <= 24; x++) {
      this.users.push({
        name: x
      })
    }

    this.auth.getAuth().then(info => {
      if (info == true) {
        console.log(this.afAuth.auth.currentUser.email + ' logged in.')
      }
    })
  }

  async showAd() {
    const bannerConfig: AdMobFreeBannerConfig = {
      id: ad_unit.id,
      isTesting: true,
      autoShow: true
    };
    
    this.admobFree.banner.config(bannerConfig);

    const result = await this.admobFree.banner.prepare();

    console.log(result)
  }

  viewProfile(profile: any) {
    this.navCtrl.push('ProfilePage', { profile: profile, mode: true })
  }

  ionViewWillLoad() {
    this.dbService.getUsers().then(users => {
      this.users = users;
      this.getUser();
    })
    this.showAd()
  }

  getUser() {
    this.auth.getAuth().then((res: any) => {
      if (res == true) {
        this.dbService.getUserProfile(this.afAuth.auth.currentUser.uid)
          .then((info: any) => {
            if (info !== null) {
              this.profile = info
            }
          })
      }
    })
  }
}
