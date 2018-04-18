import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { tap } from 'rxjs/operators';
import { TabsPage } from '../pages/tabs/tabs';
import { LocalService } from '../providers/local.service';
import { AuthService } from '../providers/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Firebase } from '@ionic-native/firebase';

@Component({
  templateUrl: 'app.html'
})
export class Patna {
  rootPage: any = TabsPage;
  notifications: number = 0
  authenticated: boolean;

  constructor(statusBar: StatusBar,
    private platform: Platform,
    private firebase:Firebase,
    private dbRef: AngularFireDatabase,
    private authService: AuthService,
    private local: LocalService,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.authenticated = this.authService.authenticated;

      this.firebase.getToken()
        // save the token server-side and use it to push notifications to this device
        .then(token => {
          console.log(`The token is ${token}`)
          this.authService.saveTokenToDB(token).then(res => {
            if (res)
              this.local.presentToast('FCM token saved', 'top', false, 3000)
            else {
              console.log('FCM token not updated.')
            }
          })
        })
        .catch(error => console.error('Error getting token', error));

      //if the token refreshes, resave it
      this.firebase.onTokenRefresh()
        .subscribe((token: string) => {
          console.log(`Got a new token ${token}`);
          this.authService.saveTokenToDB(token).then(res => {
            if (res)
              this.local.presentToast('FCM token saved', 'top', false, 3000)
            else {
              console.log('FCM token not updated.')
            }
          })
        })

      //configure the status bar
      statusBar.overlaysWebView(true)

      statusBar.backgroundColorByHexString('#f4f4f4');
      statusBar.styleDefault()
      splashScreen.hide();

      //listen for incoming FCM notifications
      this.firebase.onNotificationOpen().pipe(
        tap(msg => {
          this.notifications++;
          this.local.presentToast(msg.title, 'top', false, 3000)
        })
      )
    });
  }



}
