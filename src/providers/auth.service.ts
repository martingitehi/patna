import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../interfaces/user.interface';
import { LocalService } from './local.service';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()

export class AuthService {
    public authenticated: any;
    constructor(private afAuth: AngularFireAuth,
        private local: LocalService,
        private dbRef:AngularFireDatabase,
        private firebase: Firebase) {
         this.getAuth().then(res => {
            if (res == true) {
                this.authenticated = true
            }
            else {
                this.authenticated = false
            }
        })
    }

    getAuth(): Promise<boolean> {
        return new Promise(resolve => {
            this.afAuth.authState.subscribe((auth) => {
                if (!auth) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            })
        })
    }

    signIn(user: User): Promise<any> {
        return new Promise(resolve => {
            this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email, user.password).then(data => {
                if (data) {
                    this.local.presentToast(`${data.user.email} has been logged in.`, 'top', false, 3000)
                    resolve(data.user)
                }
                else {
                    this.local.presentToast(`${user.email} couldn\'t be logged in, an error occured.`, 'top', false, 3000)
                    resolve(null)
                }
            },
                (error => {
                    this.local.presentToast(error.message, 'top', false, 3000)
                    resolve(null)
                }))
        }).catch(error => {
            console.log(error.message)
            this.local.presentToast(error.message, 'top', false, 3000)
        })
    }

    signOut(): Promise<any> {
        return new Promise(resolve => {
            return this.afAuth.auth.signOut().then(() => {
                localStorage.removeItem('boo_profile');
                this.firebase.unregister();
                resolve('OK')
            },
                (error => {
                    this.local.presentToast(error.message, 'top', false, 3000);
                    resolve('ERROR')
                }))
        })
    }

    get currentUserId() {
        return this.getAuth().then(res => {
            if (res) {
                return this.afAuth.auth.currentUser.uid
            }
            else {
                return null
            }
        })
    }

    
    saveTokenToDB(token): Promise<boolean> {
        return new Promise(resolve => {
            if (this.authenticated && this.currentUserId !== null) {
                this.dbRef.object(`users/${this.currentUserId}`)
                    .update({ fcm_token: token })
                    .then(() => console.log('FCM token updated.'))
                    .catch(e => console.error(e))
                resolve(true)
            }
            else {
                resolve(false)
            }
        })
    }

}