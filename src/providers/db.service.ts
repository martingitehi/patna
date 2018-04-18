import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import * as  _ from 'lodash';

@Injectable()

export class DatabaseService {
    ref: any
    constructor(private afDatabase: AngularFireDatabase) {
        this.ref = this.afDatabase.database.ref()
    }

    saveProfile(profile: Profile): Promise<any> {
        return new Promise(resolve => {
            this.afDatabase.database.ref(`users`).once('value', (snap) => {
                if (snap) {
                    this.afDatabase.object(`users`)
                        .valueChanges()
                        .subscribe((users: Profile[]) => {
                            _.each(users, (user: Profile) => {
                                if (user.username === profile.username) {
                                    console.log(`Username ${profile.username} is already taken`)
                                    resolve({ success: false, message: `Username ${profile.username} is already taken` })
                                }
                                else {
                                    this.afDatabase.list('users').push(profile).then(() => {
                                        console.log('profile saved successfully!')
                                        resolve({ success: true, message: `${profile.username} has been added.` })
                                    })
                                }
                            })
                        })
                }
                else {
                    resolve(null)
                }
            })
        })
    }

    getUserProfile(key: string): Promise<any> {
        return new Promise(resolve => {
            this.afDatabase.database.ref(`users/${key}`).once('value', (snap) => {
                if (snap) {
                    this.afDatabase.object(`users/${key}`)
                        .valueChanges()
                        .subscribe(user => {
                            resolve(user)
                        })
                }
                else {
                    resolve(null)
                }
            })
        })
    }

    getUsers(): Promise<any> {
        return new Promise(resolve => {
            this.afDatabase.list('users')
                .snapshotChanges()
                .map(changes => {
                    return changes.map(
                        change => ({
                            key: change.key, ...change.payload.val()
                        }))
                }).subscribe(users => {
                    resolve(users)
                })
        })
    }

    getNotifications(key: string): Promise<any> {
        return new Promise(resolve => {
            this.afDatabase.database.ref(`users/${key}/notifications`).once('value', snap => {
                if (snap) {
                    this.afDatabase.list(`users/${key}/notifications`)
                        .snapshotChanges()
                        .map(changes => {
                            return changes.map(
                                change => ({
                                    key: change.key, ...change.payload.val()
                                }))
                        }).subscribe(notifications => {
                            resolve(notifications)
                        })
                }
                else {
                    resolve([])
                }
            })
        })
    }

    getUserAvatar(key: string) {
        firebase.storage().ref(`users/${key}/avatar.jpg`).getDownloadURL().then(url => {
            return url
        })
    }
}